import { useSelector } from "react-redux";
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

const Profile = () => {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [file, setFile] = useState(undefined);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [uploadError, setUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  // firebase Storage

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    console.log(uploadError);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadPercentage(Math.round(progress));
      },
      (error) => {
        setUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  return (
    <div className="font-spacemono p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
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
          className="rounded-md w-20 h-20 object-cover cursor-pointer self-center m-2"
        />
        <p className="mx-auto text-sm">
          {uploadError ? (
            <span className="text-red-700">
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : uploadPercentage > 0 && uploadPercentage < 100 ? (
            <span className="text-slate-700">{`Uploading ${uploadPercentage}%`}</span>
          ) : uploadPercentage === 100 ? (
            <span className="text-green-700">Image successfully uploaded!</span>
          ) : (
            " "
          )}
        </p>
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
