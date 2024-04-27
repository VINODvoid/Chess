import { useEffect, useState } from "react";
import Button from "../components/Button"
import ChessBoard from "../components/ChessBoard"
import useSocket from "../hooks/useSocket";
import { Chess } from "chess.js";
export const INIT_GAME = "init_game"
export const MOVE = "move"
export const GAME_OVER = "game_over"

const Game = () => {

  const socket = useSocket();
  const [chess, setChess] = useState(new Chess() );
  const [board , setBoard] = useState(chess.board());

  useEffect(() => {
    if(!socket) return ;
      
    socket.onmessage= (event) => {
      const  message = JSON.parse(event.data);
      console.log(message)
      switch (message.type) {
        case INIT_GAME:
          setChess(new Chess());
          setBoard(chess.board());
          console.log("Game is Initialized");
          break;
        case MOVE:{
          const move = message.payload;
          chess.move(move);
          setBoard(chess.board());
          console.log("Move Received");
          break;
        }
        case GAME_OVER:
          console.log("Game Over");
          break;
          
    }
  }
  },[chess, socket])
  if (!socket) {
    return <div>Connecting...</div>
  }
  return (
    <div className="flex justify-center ">
      <div className="w-full max-w-screen-lg pt-8">
        <div className="grid w-full gap-4 grid-col-8">
          <div className="flex justify-center w-full bg-red-300">
            <ChessBoard board={board}/>
          </div>
          <div className="w-full col-span-4 bg-green-700">
            <Button onClick={() => {
              socket.send(JSON.stringify({ type: INIT_GAME }))
            }}>
              Play Online
            </Button>
          </div>
        </div>

      </div>

    </div>
  )
}

export default Game