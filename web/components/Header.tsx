export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl h-auto mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-emerald-700 h-full">
          <img src="/LOGO_NEGRO.png" alt="" className="h-15" />
        </div>
        <nav className="hidden md:flex space-x-8 text-black w-1/3 font-medium">
          <a href="/" className="hover:text-emerald-600 transition">Inizio</a>
          <a href="/diario" className="hover:text-emerald-600 transition">Diario</a>
          <a href="/glosario" className="hover:text-emerald-600 transition">Glosario</a>
          <a href="/productos" className="hover:text-emerald-600 transition">Productos</a>
        </nav>
        <div></div>
      </div>
    </header>
  )
}