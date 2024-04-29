import { Square,Color, PieceSymbol } from "chess.js";
import { useState } from "react";
import { MOVE } from "../screens/Game";


const ChessBoard = ({board,socket}:{
  board:({
    square : Square;
    type:PieceSymbol;
    color:Color;
  } | null)[][];
  socket:WebSocket;
},) => {
  const [from,setFrom] = useState<null | Square>(null);
  const [to,setTo] = useState<null | Square>(null);

  return (
    <div className="text-white-200">
      {
        board.map((row,i) => {
          return <div key={i} className="flex">
            {
              row.map((square,j) => {
                return <div key={j} className={ ` w-16 h-16 ${((i+j)%2===0)? `bg-green-500` : `bg-white `}`} onClick={() =>{
                  if(!from)
                    {
                      setFrom(square?.square ?? null);
                    }
                  else{
                    setTo(square?.square ?? null);
                    socket.send(JSON.stringify({
                      type:MOVE,
                      payload:{
                        from,
                        to
                      }
                    }))
                    console.log(
                      {
                        from,
                        to
                      }
                    )
                  }
                }} >
                  <div className="flex justify-center w-full h-full">
                    <div className="flex flex-col justify-center h-full">
                  {square ? square.type : ""}
                  </div>
                  </div>
                </div>
                
              })}
              </div>
        })}
    </div>
  )
}

export default ChessBoard