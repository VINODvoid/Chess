import { Chess } from "chess.js";
import WebSocket from "ws";
import { GAME_OVER, INIT_GAME, MOVE } from "./Messages";

export class Game {
    public player1: WebSocket;
    public player2: WebSocket;
    public board: Chess;
    private startDate: Date;

    constructor(player1: WebSocket, player2: WebSocket) {
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Chess();
        this.startDate = new Date();
        this.player1.send(
            JSON.stringify({
                type: INIT_GAME,
                payload: {
                    color: "white",
                },
            })
        );
        this.player2.send(
            JSON.stringify({
                type: INIT_GAME,
                payload: {
                    color: "black",
                },
            })
        );
    }

    makeMove(socket: WebSocket, move: { from: string; to: string; }) {
        // Check if the move is valid for the current player
        if ((this.board.moves.length % 2 === 0 && socket === this.player1) ||
            (this.board.moves.length % 2 !== 0 && socket === this.player2)) {
            try {
                this.board.move(move);
                const moveMessage = JSON.stringify({ type: MOVE, payload: move });
    
                // Send the move to both players
                this.player1.send(moveMessage);
                this.player2.send(moveMessage);
    
                // Check for game over
                if (this.board.isGameOver()) {
                    const winner = this.board.turn() === 'w' ? 'black' : 'white';
                    const gameOverMessage = JSON.stringify({ type: GAME_OVER, payload: { winner } });
                    this.player1.send(gameOverMessage);
                    this.player2.send(gameOverMessage);
                }
            } catch (error) {
                console.error("Invalid move:", error);
            }
        } else {
            console.error("Not your turn or invalid move!");
        }
    }
    
}
