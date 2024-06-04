import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";
import { BiSolidGame } from "react-icons/bi";
import { app } from "../firebase";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";

const CreateListing = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [imageFiles, setImageFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    title: "",
    description: "",
    publisher: "",
    regularPrice: 1,
    discountPrice: 1,
    ageRating: 3,
    dlcIncluded: false,
    genre: "",
  });
  const [imageUploadError, setImageUploadError] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const navigate = useNavigate();

  console.log(formData);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1) return setError(true);
      if (+formData.regularPrice < +formData.discountPrice)
        return setError(true);
      setLoading(true);
      setError(false);
      const res = await fetch("/api/listing/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, userRef: currentUser._id }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(true);
        setLoading(false);
      }
      navigate(`/listings`);
    } catch (error) {
      if (error instanceof Error) {
        setError(true);
        setLoading(false);
      } else {
        setError(true);
        setLoading(false);
      }
    }
  };

  const handleImageSubmit = () => {
    if (
      imageFiles.length > 0 &&
      imageFiles.length + formData.imageUrls.length < 7
    ) {
      setUploadingImage(true);
      const promises = [];

      for (let i = 0; i < imageFiles.length; i++) {
        promises.push(storeImage(imageFiles[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError("");
          setUploadingImage(false);
        })
        .catch((err) => {
          setImageUploadError("Image upload failed (2 MB max per image)");
          setUploadingImage(false);
        });
    } else {
      setImageUploadError("You can only upload 6 images per listing");
      setUploadingImage(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.id === "dlcIncluded") {
      setFormData({
        ...formData,
        [e.target.id]: (e.target as HTMLInputElement).checked,
      });
    }
    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  return (
    <main className="font-spacemono p-3 max-w-5xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Add a new game
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-1 flex-col gap-6">
          <input
            id="title"
            type="text"
            placeholder="Title"
            onChange={handleChange}
            value={formData.title}
            maxLength={62}
            minLength={1}
            className="border p-3 rounded-md hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition-all duration-500"
            required
          />
          <input
            id="publisher"
            type="text"
            placeholder="Publisher"
            onChange={handleChange}
            value={formData.publisher}
            maxLength={62}
            minLength={1}
            className="border p-3 rounded-md hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition-all duration-500"
            required
          />
          <textarea
            id="description"
            placeholder="Description"
            onChange={handleChange}
            value={formData.description}
            className=" h-36 border p-3 rounded-md hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition-all duration-500 resize-none"
            required
          />
          <input
            id="genre"
            type="text"
            placeholder="Genre"
            onChange={handleChange}
            value={formData.genre}
            maxLength={62}
            minLength={1}
            className="border p-3 rounded-md hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition-all duration-500"
            required
          />
        </div>
        <div className="flex flex-col flex-1 justify-between sm:gap-0 gap-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-row gap-4">
              <div className="flex bg-white items-center border rounded-md p-2 w-full hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition-all duration-500">
                <input
                  onChange={(e) => setImageFiles(e.target.files)}
                  type="file"
                  id="images"
                  accept="image/*"
                  multiple
                />
              </div>
              <button
                type="button"
                disabled={uploadingImage}
                onClick={handleImageSubmit}
                className="border rounded-md text-[#21A193] p-3 hover:drop-shadow-xl hover:bg-[#21A193] hover:text-white hover:font-semibold disabled:bg-red-300 shadow-[3px_3px_0px_0px_rgba(33,161,147)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0)] transition-all duration-500 hover:translate-y-[-5px] hover:translate-x-[-2px]"
              >
                {uploadingImage ? "Uploading..." : "Upload"}
              </button>
            </div>
            <p className="font-semibold">
              Images:
              <span className="text-xs font-light">
                First image will be the cover image (max 6)
              </span>
              <p className="text-red-500 text-xs">
                {imageUploadError && imageUploadError}
              </p>
            </p>
            <div className="flex flex-row gap-2 justify-between">
              <div className="flex gap-2 flex-1 items-center">
                <input
                  type="checkbox"
                  id="dlcIncluded"
                  className="w-5"
                  onChange={handleChange}
                  checked={formData.dlcIncluded}
                />
                <span>DLC Included?</span>
              </div>
              <div className="flex flex-col flex-1">
                <input
                  id="ageRating"
                  type="number"
                  placeholder="Age Rating"
                  onChange={handleChange}
                  value={formData.ageRating}
                  min={3}
                  max={18}
                  className="border p-3 rounded-md hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition-all duration-500"
                  required
                />
                <p className="flex justify-end text-xs pr-2 -mt-4 z-10">
                  Age Rating
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-4 w-full">
              <div className="flex flex-col flex-1">
                <input
                  id="regularPrice"
                  type="number"
                  placeholder="Price"
                  onChange={handleChange}
                  value={formData.regularPrice}
                  min={1}
                  className="border p-3 rounded-md hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition-all duration-500 flex-1"
                  required
                />
                <p className="flex justify-end text-xs pr-2 -mt-4 z-10">
                  Regular Price
                </p>
              </div>
              <div className="flex flex-col flex-1">
                <input
                  id="discountPrice"
                  type="number"
                  placeholder="Discounted Price"
                  onChange={handleChange}
                  value={formData.discountPrice}
                  min={1}
                  className="border p-3 rounded-md hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition-all duration-500"
                  required
                />
                <p className="flex justify-end text-xs pr-2 -mt-4 z-10">
                  Discounted Price
                </p>
              </div>
            </div>
          </div>
          <button
            disabled={loading || uploadingImage}
            className="flex flex-row justify-center items-center gap-2 border rounded-lg px-16 py-4 text-[#4285F4] hover:bg-[#4285F4] hover:text-white hover:font-semibold disabled:bg-slate-300  shadow-[3px_3px_0px_0px_rgba(0,0,0)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0)] transition-all duration-500 hover:translate-y-[-5px] hover:translate-x-[-2px]"
          >
            {loading ? (
              "Creating a game listing..."
            ) : (
              <>
                <BiSolidGame />
                Create game listing
              </>
            )}
          </button>
          {error && <p className="text-red-500 text-xs">An Error Occured</p>}
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
