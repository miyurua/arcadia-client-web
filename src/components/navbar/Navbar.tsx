import React, { useState } from "react";
import logo from "../assets/logo.jpeg";
import cart_icon from "../assets/cart_icon.png";

const Navbar = () => {
  const [menu, setMenu] = useState("Games");

  return (
    <>
      <div className="flex justify-around p-16">
        <div className="flex items-center gap-[10px]">
          <img className="h-15 w-10" src={logo} alt="arcadia" />
          <p className="text-[#9F2B68] text-xl font-bold font-poppins">
            Arcadia
          </p>
        </div>
        <ul className="flex items-center gap-[50px] text-lg font-semibold font-poppins">
          <li
            className="flex flex-col items-center justify-center cursor-pointer"
            onClick={() => setMenu("Games")}
          >
            Games
            {menu == "Games" ? (
              <hr className="w-4/5 border border-r-4 bg-[#0ff0fc]" />
            ) : (
              ""
            )}
          </li>
          <li
            className="flex flex-col items-center justify-center cursor-pointer"
            onClick={() => setMenu("PS4")}
          >
            PS4
            {menu == "PS4" ? (
              <hr className="w-4/5 border border-r-4 bg-[#0ff0fc]" />
            ) : (
              ""
            )}
          </li>
          <li
            className="flex flex-col items-center justify-center cursor-pointer"
            onClick={() => setMenu("PS5")}
          >
            PS5
            {menu == "PS5" ? (
              <hr className="w-4/5 border border-r-4 bg-[#0ff0fc]" />
            ) : (
              ""
            )}
          </li>
        </ul>
        <div className="flex flex-row items-center gap-[45px]">
          <button className=" w-[157px] h-[58px] border border-[#0ff0fc] text-xl font-light rounded-full active:bg-[#0ff0fc] active:text-white font-poppins">
            Login
          </button>
          <img src={cart_icon} alt="" />
          <div className="flex w-[22px] h-[22px] items-center justify-center mt-[-35px] ml-[-55px] rounded-full text-sm bg-[red] text-white font-poppins">
            0
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
