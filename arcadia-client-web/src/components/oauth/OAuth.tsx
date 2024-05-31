import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import React from "react";
import { app } from "../../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });

      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="font-spacemono">
      <button
        type="button"
        onClick={handleGoogleClick}
        className="border rounded-lg px-16 py-4 hover:bg-[#EA4335] hover:text-white hover:font-semibold disabled:bg-slate-300 hover:shadow-[5px_5px_0px_0px_rgba(0,0,0)]"
      >
        Continue with Google
      </button>
    </div>
  );
};

export default OAuth;
