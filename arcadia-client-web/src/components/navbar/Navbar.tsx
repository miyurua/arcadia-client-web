import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);

  return (
    <header className="bg-[#F9F5F2] border-b">
      <div className="flex flex-row justify-between max-w-6xl mx-auto p-3 items-center">
        <Link to="/">
          <span className="text-[#91A8ED] font-bold text-sm sm:text-xl font-spacemono">
            Arcadia
          </span>
        </Link>
        <form className="bg-white p-3 rounded-md flex flex-row items-center font-inconsolata">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-[#3B0A45]" />
        </form>
        <ul className="flex flex-row gap-4 font-spacemono font-semibold items-center">
          <Link to="/">
            <li className="hidden sm:inline">Home</li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline">About</li>
          </Link>
          {currentUser && (
            <Link to="/listings">
              <button className="border rounded-md p-2 text-sm hover:drop-shadow-xl	 bg-[#F7CB45] hover:font-semibold disabled:bg-red-300 shadow-[3px_3px_0px_0px_rgba(0,0,0)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0)] transition-all duration-500 hover:translate-y-[-3px] hover:translate-x-[-2px]">
                My listings
              </button>
            </Link>
          )}
          <Link to="/profile">
            {currentUser ? (
              <img className="rounded-md h-10 w-10" src={currentUser.avatar} />
            ) : (
              <li className="text-[#3B0A45] hover:text-[#91A8ED] hover:cursor-pointer">
                Sign in
              </li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
