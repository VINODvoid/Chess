const Button = ({onClick ,  children}:{onClick:()=> void, children: React.ReactNode}) => {
  return (
    <button onClick={onClick} className="px-8 py-4 text-2xl font-bold text-white bg-green-500 rounded hover:bg-green-700">
    {children}
    </button>
  )
}

export default Button