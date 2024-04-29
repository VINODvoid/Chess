import { WebSocketServer } from 'ws';
import { GameManager } from './GameManager';

// Created websocket server instance on port 8080
const wss = new WebSocketServer({ port: 6969 });
// create instance of the gameManager class
const gameManager = new GameManager();


wss.on('connection', function connection(ws) {
    gameManager.addUser(ws);
    ws.on("close",()=>{
        return gameManager.removeUser(ws)}
    );
});