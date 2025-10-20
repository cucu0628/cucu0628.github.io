import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="fixed top-0 left-0 w-full bg-black shadow-md p-4 text-white border-4 border-black border-b-indigo-500 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold text-white text-5xl font-extrabold text-transparent select-none">Asked</div>

        {/* Hamburger menu button (mobile) */}
        <button className="md:hidden" onClick={toggleMenu}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Navigation links */}
        <ul className={`
          md:flex md:space-x-6
          absolute md:static top-16 left-0 w-full md:w-auto
          bg-black md:bg-transparent
          px-4 md:px-0 py-2 md:py-0
          shadow-md md:shadow-none
          transition-all duration-300 ease-in-out
          z-40

          // Mobilos megjelenítés (alapértelmezett)
          ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}

          // Asztali nézet felülírása (md breakpoint felett)
          md:max-h-full md:opacity-100 md:overflow-visible
        `}>
          <li><a href="#home" onClick={toggleMenu} className="block py-2 md:py-0 hover:text-pink-500">Home</a></li>
          <li><a href="#" onClick={toggleMenu} className="block py-2 md:py-0 hover:text-pink-500">About</a></li>
          <li><a href="#pro" onClick={toggleMenu} className="block py-2 md:py-0 hover:text-pink-500">Project</a></li>
          <li><a href="#" onClick={toggleMenu} className="block py-2 md:py-0 hover:text-pink-500">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;