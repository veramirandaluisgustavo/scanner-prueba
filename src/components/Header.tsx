export default function Header() {
  return (
    <header className="lg:w-2/5">
        <h1 className="lg:text-[150px] text-9xl text-white font-display text-center lg:text-left" >
          Scanner<span className='text-yellow-300'>.</span>
        </h1>
        <p className="text-yellow-300 text-4xl font-secondary text-center lg:text-left">
          scanear el rostro.
        </p>
        <h1 className="lg:text-[40px] text-2xl lg:text-3xl text-white font-display mt-4">
          Gira el rostro lentamente de izquierda a derecha
        </h1>
    </header>
  )
}