import ChessBoard from "../components/ChessBoard"


const Game = () => {
  return (
    <div className="flex justify-center ">
      <div className="w-full max-w-screen-lg pt-8">
        <div className="grid w-full gap-4 grid-col-6">
          <div className="w-full col-span-4 bg-red-300">
            <ChessBoard/>
          </div>
          <div className="w-full col-span-2 bg-green-700">
            <button className="text-white">PLay</button>
          </div>
        </div>
        
      </div>

    </div>
  )
}

export default Game