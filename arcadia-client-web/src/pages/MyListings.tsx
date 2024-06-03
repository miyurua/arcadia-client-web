import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Link } from "react-router-dom";

const MyListings = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listing/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }
      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };

  const handleListingDelete = async (id) => {
    try {
      const res = await fetch(`/api/listing/delete/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setUserListings((prev) => prev.filter((listing) => listing._id !== id));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    handleShowListings();
  }, []);

  return (
    <main className="font-spacemono p-3 max-w-2xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">My listings</h1>
      {showListingsError && <p>An Error Occured</p>}
      {userListings && userListings.length > 0 ? (
        <div className="flex flex-col gap-4">
          {userListings.map((listing) => (
            <Link to={`/listing/${listing._id}`}>
              <div
                key={listing._id}
                className="flex flex-row border bg-white border-black rounded-md p-4 justify-between cursor-pointer shadow-[3px_3px_0px_0px_rgba(0,0,0)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0)] transition-all duration-500 hover:translate-y-[-4px] hover:translate-x-[-2px]"
              >
                <div className="flex gap-4 flex-row">
                  <img
                    src={listing.imageUrls[0]}
                    alt=""
                    className="h-24 w-24 border rounded-md"
                  />
                  <div className="flex flex-col">
                    <div className="flex flex-row gap-2">
                      <p className="inline-block px-2 py-1 bg-blue-500 text-white rounded-md font-semibold text-xs">
                        {listing.genre}
                      </p>
                      {listing.dlcIncluded && (
                        <p className="inline-block px-2 py-1 bg-green-500 text-white rounded-md font-semibold text-xs">
                          DLC
                        </p>
                      )}
                      <p className="inline-block px-2 py-1 bg-red-400 text-white rounded-md font-semibold text-xs">
                        {listing.ageRating}+
                      </p>
                    </div>
                    <h1 className="text-2xl font-semibold">{listing.title}</h1>
                    <h1 className="">{listing.publisher}</h1>
                  </div>
                </div>
                <div className="flex flex-col justify-between items-end">
                  <div className="flex flex-col items-center">
                    <p className="inline-block px-2 py-1 bg-green-500 text-white rounded-md font-semibold text-md">
                      {listing.discountPrice} LKR
                    </p>
                    <p className="line-through">{listing.regularPrice} LKR</p>
                  </div>
                  <div className="flex flex-row gap-2 z-10">
                    <Link to="/profile">
                      <button className="hover:underline">Edit</button>
                    </Link>
                    <p>/</p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleListingDelete(listing._id);
                      }}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        "You have no listings"
      )}
    </main>
  );
};

export default MyListings;
