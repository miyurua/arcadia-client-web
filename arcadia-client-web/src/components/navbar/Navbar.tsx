import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="bg-[#3B0A45]">
      <div className="flex flex-row justify-between max-w-6xl mx-auto p-3 items-center">
        <Link to="/">
          <span className="text-[#FF6EC7] font-bold text-sm sm:text-xl">
            Arcadia
          </span>
        </Link>
        <form className="bg-[#FFC1E3] p-3 rounded-md flex flex-row items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-[#3B0A45]" />
        </form>
        <ul className="flex flex-row gap-4">
          <Link to="/">
            <li className="hidden sm:inline text-[#FFC1E3] hover:text-[#B2FFFF] hover:cursor-pointer">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-[#FFC1E3] hover:text-[#B2FFFF] hover:cursor-pointer">
              About
            </li>
          </Link>
          <Link to="/signin">
            <li className="text-[#FFC1E3] hover:text-[#B2FFFF] hover:cursor-pointer">
              Sign in
            </li>
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
