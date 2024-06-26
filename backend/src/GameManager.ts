import { Game } from './Game';
import WebSocket from "ws";
import { INIT_GAME, MOVE } from "./Messages";


export class GameManager {
    public games: Game[];
    private pendingUser: WebSocket | null;
    private users: WebSocket[];

    constructor() {
        this.games = [];
        this.pendingUser = null;
        this.users = [];
    }

    addUser(socket: WebSocket) {
        this.users.push(socket);
        this.addHandler(socket);
    }

    removeUser(socket: WebSocket) {
        this.users = this.users.filter(user => user !== socket);
        this.removeHandler(socket);
    }

    private addHandler(socket: WebSocket) {
        socket.on("message", (data: WebSocket.Data) => {
            try {
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
                if (message.type === MOVE) {
                    console.log("Inside the move function")
                    const game = this.games.find(game => game.player1 === socket || game.player2 === socket);
                    if (game) {
                        console.log("inside the game")
                        game.makeMove(socket, message.move);
                        console.log(message.move)
                        console.log("after the game")
                    }

                }
            }
            catch (e) {
                console.log(e)
            }
    });
    }

    private removeHandler(socket: WebSocket) {
        socket.removeAllListeners("message");
        this.pendingUser = null; // Remove pending user if they disconnect
        this.games = this.games.filter(game => game.player1 !== socket && game.player2 !== socket);
    }
}