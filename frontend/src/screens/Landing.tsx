import { useNavigate } from "react-router-dom"

const Landing = () => {
    const navigate = useNavigate();
    return (
        <div className="flex justify-center">
        <div className="max-w-screen-lg pt-8">
            <div className="grid grid-cols-1 gap-4 mr-5 md:grid-cols-2">
                <div className="flex justify-center ">
                    <img src={"/chess.jpg"} alt="chess board" className="max-w-96" />
                </div>
                <div className="justify-center pt-16 before:flex">
                    <div className="">
                        <h1 className="text-4xl font-bold text-white">Play Chess Online on the #3 Site</h1>
                    </div>
                    <div className="flex justify-center mt-4">
                        <button className="px-8 py-4 font-bold text-white bg-green-500 hover:bg-green-700 rounded-x" type="button"  onClick={() => navigate('/game')} >Play Online</button>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Landing
