import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { RiLogoutBoxLine } from "react-icons/ri";
import { AiOutlineDelete } from "react-icons/ai";

const Profile = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);

  return (
    <div className="font-spacemono p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <img
          src={currentUser?.avatar}
          alt="profile"
          className="rounded-md w-20 h-20 object-cover cursor-pointer self-center m-2"
        />

        <input
          type="text"
          placeholder="Username"
          className="border p-3 rounded-md"
          id="username"
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-md"
          id="email"
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-md"
          id="password"
        />
        <button
          className="border rounded-md px-7 py-4 hover:drop-shadow-xl	 hover:bg-[#21A193] hover:text-white hover:font-semibold disabled:bg-red-300
        hover:shadow-[5px_5px_0px_0px_rgba(0,0,0)]"
        >
          Update
        </button>
      </form>
      <div className="flex justify-between mt-6">
        <span className="cursor-pointer text-[#EA4335] flex items-center gap-1">
          Delete account <AiOutlineDelete />
        </span>
        <span className="cursor-pointer text-[#EA4335] flex items-center gap-1">
          <RiLogoutBoxLine />
          Sign out
        </span>
      </div>
    </div>
  );
};

export default Profile;
