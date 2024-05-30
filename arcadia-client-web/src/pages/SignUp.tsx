import React from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="p-3 max-w-lg mx-auto font-spacemono">
      <h1 className="text-3xl text-center font-semibold my-7 ">Sign Up</h1>
      <form className="flex flex-col gap-4">
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
        <div className="flex justify-end">
          <button className="border rounded-lg px-7 py-4 hover:bg-[#91A8ED] hover:text-white hover:font-semibold">
            Sign Up
          </button>
        </div>
      </form>
      <div className="flex flex-row gap-4">
        <p>Have an account?</p>
        <Link to="/signin">
          <span className="text-[#91A8ED]">Sign in</span>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
