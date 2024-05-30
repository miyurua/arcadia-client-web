import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { RootState } from "../redux/store";
import OAuth from "../components/oauth/OAuth";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state: RootState) => state.user);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        dispatch(signInFailure(error.message));
      } else {
        dispatch(signInFailure("An unknown error occurred"));
      }
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto font-spacemono">
      <h1 className="text-3xl text-center font-semibold my-7 ">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-md"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-md"
          id="password"
          onChange={handleChange}
        />
        <div className="flex justify-between items-center">
          <OAuth />
          <button
            disabled={loading}
            className="border rounded-lg px-7 py-4 hover:bg-[#91A8ED] hover:text-white hover:font-semibold disabled:bg-red-300"
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
        </div>
      </form>
      <div className="flex flex-row gap-4 mt-4">
        <p>Dont have an account?</p>
        <Link to="/signup">
          <span className="text-[#91A8ED]">Sign up</span>
        </Link>
      </div>
      {error ? <p className="text-red-500 mt-4">{error}</p> : ""}
    </div>
  );
};

export default SignIn;
