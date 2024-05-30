import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        navigate("/signin");
        return;
      }
      setLoading(false);
      setError(null);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto font-spacemono">
      <h1 className="text-3xl text-center font-semibold my-7 ">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          className="border p-3 rounded-md"
          id="username"
          onChange={handleChange}
        />
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
        <div className="flex justify-end">
          <button
            disabled={loading}
            className="border rounded-lg px-7 py-4 hover:bg-[#91A8ED] hover:text-white hover:font-semibold disabled:bg-red-300"
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </div>
      </form>
      <div className="flex flex-row gap-4">
        <p>Have an account?</p>
        <Link to="/signin">
          <span className="text-[#91A8ED]">Sign in</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default SignUp;
