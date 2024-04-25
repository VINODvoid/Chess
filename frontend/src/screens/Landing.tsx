

const Landing = () => {
  return (
    <div className="pt-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex justify-center ">
                <img src={"/chess.jpg"} alt="chess board" className="max-w-xl"/>
            </div>
            <div>
                <h1 className="text-4xl font-bold text-white">Welcome to Chess Online</h1>
                <p className="text-lg mt-2 text-white">Play Chess with your friends</p>
                <div className="mt-4">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl " type="button">Play Online</button>
                </div>
            </div>
        </div>

    </div>
  )
}

export default Landing
