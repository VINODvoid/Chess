import { Game } from './Game';
import WebSocket from "ws";
import { INIT_GAME, MOVE } from "./Messages";

interface GameProps {
    name: string; // Not used in the provided code, consider removing if unnecessary
    player1: WebSocket;
    player2: WebSocket;
}

export class GameManager {
    private games: Game[]; // Change to store Game instances directly
    private pendingUser: WebSocket | null; // Change to store a single WebSocket

    constructor() {
        this.games = [];
        this.pendingUser = null;
    }

    addUser(socket: WebSocket) {
        this.addHandler(socket);
    }

    removeUser(socket: WebSocket) {
        this.removeHandler(socket);
    }

    private addHandler(socket: WebSocket) {
        socket.on("message", (data: WebSocket.Data) => {
            const message = JSON.parse(data.toString());

            if (message.type === INIT_GAME) {
                if (this.pendingUser) {
                    // Start the Game
                    const game = new Game(this.pendingUser, socket);
                    this.games.push(game);
                    this.pendingUser = null;
                }
                else {
                    this.pendingUser = socket;
                }
            }
            else if (message.type === MOVE) {
                const game = this.games.find(game => game.player1 === socket || game.player2 === socket);
                if (game) {
                    game.makeMove(socket, message.move);
                }
            }
        });
    }

    private removeHandler(socket: WebSocket) {
        socket.removeAllListeners("message");
        this.pendingUser = null; // Remove pending user if they disconnect
        this.games = this.games.filter(game => game.player1 !== socket && game.player2 !== socket);
    }
}
