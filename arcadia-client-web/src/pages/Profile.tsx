import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { RiLogoutBoxLine } from "react-icons/ri";
import { AiOutlineDelete } from "react-icons/ai";
import { useRef, useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signoutFailure,
  signoutStart,
  signoutSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../redux/user/userSlice";
import { BiSolidGame } from "react-icons/bi";
import { Link } from "react-router-dom";

export interface IProfileData {
  username: string;
  email: string;
  password: string;
  avatar: string;
}

const Profile: React.FC = () => {
  const fileRef = useRef<HTMLInputElement>();
  const { currentUser, loading, error } = useSelector(
    (state: RootState) => state.user
  );
  const [file, setFile] = useState(undefined);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [uploadError, setUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuceesful, setUpdateSuccessful] = useState(false);

  const dispatch = useDispatch();
  // firebase Storage

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file: File) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadPercentage(Math.round(progress));
      },
      (error) => {
        if (error instanceof Error) {
          setUploadError(true);
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  console.log("formData", formData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(
        `/api/user/update/${currentUser && currentUser._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccessful(true);
    } catch (error) {
      if (error instanceof Error) {
        dispatch(updateUserFailure(error.message));
      } else {
        dispatch(
          updateUserFailure("An unknown error occurred during user update")
        );
      }
    }
  };

  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(
        `/api/user/delete/${currentUser && currentUser._id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      if (error instanceof Error) {
        dispatch(deleteUserFailure(error.message));
      } else {
        dispatch(
          deleteUserFailure("An unknown error occurred during account deletion")
        );
      }
    }
  };

  const handleSignout = async () => {
    try {
      dispatch(signoutStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signoutFailure(data.message));
        return;
      }
      dispatch(signoutSuccess(data));
    } catch (error) {
      if (error instanceof Error) {
        dispatch(signoutFailure(error.message));
      }
    }
  };

  return (
    <div className="font-spacemono p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-start my-7">Profile</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-w-lg mx-auto"
      >
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          src={formData.avatar || currentUser?.avatar}
          onClick={() => fileRef.current.click()}
          alt="profile"
          className="rounded-md w-20 h-20 object-cover cursor-pointer self-center m-2 border hover:hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition-all duration-500"
        />
        <p className="mx-auto text-sm">
          {uploadError ? (
            <span className="text-red-500">
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : uploadPercentage > 0 && uploadPercentage < 100 ? (
            <span className="text-slate-700">{`Uploading ${uploadPercentage}%`}</span>
          ) : uploadPercentage === 100 ? (
            <span className="text-green-700">Image successfully uploaded!</span>
          ) : (
            " "
          )}
          {error ? <span className="text-red-500">{error}</span> : ""}
          {updateSuceesful ? (
            <span className="text-[#21A193]">Profile Updated Successfully</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          defaultValue={currentUser.username}
          placeholder="Username"
          className="border p-3 rounded-md hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition-all duration-500"
          id="username"
          onChange={handleChange}
        />
        <input
          type="email"
          defaultValue={currentUser.email}
          placeholder="Email"
          className="border p-3 rounded-md hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition-all duration-500"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-md hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition-all duration-500"
          id="password"
          onChange={handleChange}
        />
        <div className="flex justify-between items-center">
          <Link to="/add-new-game">
            <button
              type="button"
              className="flex flex-row items-center gap-2 border rounded-lg px-16 py-4 text-[#4285F4] hover:bg-[#4285F4] hover:text-white hover:font-semibold disabled:bg-slate-300 shadow-[3px_3px_0px_0px_rgba(66,133,244)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0)] transition-all duration-500"
            >
              <BiSolidGame />
              Create a Game Listing
            </button>
          </Link>
          <button
            disabled={loading}
            className="border rounded-md px-7 py-4 hover:drop-shadow-xl	 hover:bg-[#21A193] hover:text-white hover:font-semibold disabled:bg-red-300 shadow-[3px_3px_0px_0px_rgba(0,0,0)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0)] transition-all duration-500"
          >
            {loading ? "Loading..." : "Update"}
          </button>
        </div>
      </form>
      <div className="flex justify-between mt-6 max-w-lg mx-auto">
        <span
          onClick={handleDeleteAccount}
          className="cursor-pointer text-[#EA4335] flex items-center gap-1"
        >
          Delete account <AiOutlineDelete />
        </span>
        <span
          onClick={handleSignout}
          className="cursor-pointer text-[#EA4335] flex items-center gap-1"
        >
          <RiLogoutBoxLine />
          Sign out
        </span>
      </div>
    </div>
  );
};

export default Profile;
