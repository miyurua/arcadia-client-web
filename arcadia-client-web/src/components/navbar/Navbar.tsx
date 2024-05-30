import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="bg-[#F5E6CC]">
      <div className="flex flex-row justify-between max-w-6xl mx-auto p-3 items-center">
        <Link to="/">
          <span className="text-[#91A8ED] font-bold text-sm sm:text-xl font-spacemono">
            Arcadia
          </span>
        </Link>
        <form className="bg-[#FFF4E1] p-3 rounded-md flex flex-row items-center font-inconsolata">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-[#3B0A45]" />
        </form>
        <ul className="flex flex-row gap-4 font-spacemono font-semibold">
          <Link to="/">
            <li className="hidden sm:inline">Home</li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline">About</li>
          </Link>
          <Link to="/signin">
            <li className="text-[#3B0A45] hover:text-[#91A8ED] hover:cursor-pointer">
              Sign in
            </li>
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
