import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { MdGames } from "react-icons/md";
import { IoMdDownload } from "react-icons/io";
import { PiStrategyBold } from "react-icons/pi";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { IGameListingData } from "./Search";

const Listing: React.FC = () => {
  SwiperCore.use([Navigation]);

  const { currentUser } = useSelector((state: RootState) => state.user);
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [listing, setListing] = useState<IGameListingData>();
  const [, setUserListings] = useState<IGameListingData[]>([]);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.id}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, []);

  const handleListingDelete = async (id: IGameListingData["_id"]) => {
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
      navigate("/listings");
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  return (
    <main className="font-spacemono mx-auto">
      {loading && (
        <p className="text-center my-7 text-xl font-spacemono p-3 max-w-2xl mx-auto">
          Loading...
        </p>
      )}
      {error && (
        <p className="text-center my-7 text-xl font-spacemono p-3 max-w-2xl mx-auto">
          An unknown error ocurred...
          <br />
          Go back to{" "}
          <Link to="/" className="font-semibold text-[#91A8ED] underline">
            Home
          </Link>{" "}
          page
        </p>
      )}
      {listing && (
        <div>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[640px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="flex flex-col p-6 gap-4 max-w-6xl mx-auto">
            <div className="flex">
              <div className="flex flex-row gap-4">
                <p className="text-3xl">{listing.title} -</p>
                <p className="inline-block px-4 py-1 bg-green-500 text-white rounded-md font-semibold text-md text-lg">
                  {listing.discountPrice} LKR
                </p>
              </div>
            </div>
            <p className="text-xl">{listing.publisher}</p>
            {listing.discountPrice !== listing.regularPrice && (
              <div>
                <p className="inline-block py-3 px-8 bg-green-500 text-white rounded-md">
                  On Discount -{" "}
                  {Math.round(
                    100 - (listing.discountPrice / listing.regularPrice) * 100
                  )}
                  %
                </p>
              </div>
            )}
            <div>
              <p>
                <span className="font-semibold">Description - </span>{" "}
                {listing.description}
              </p>
            </div>
            <div className="flex flex-row gap-4">
              <p className="flex items-center gap-2">
                <MdGames /> {listing.genre}
              </p>
              {listing.dlcIncluded && (
                <p className="flex items-center gap-2">
                  <IoMdDownload /> DLC Included
                </p>
              )}
              <p className="flex items-center gap-2">
                <PiStrategyBold />
                {listing.ageRating + "+"}
              </p>
            </div>
            {currentUser && listing.userRef !== currentUser._id && (
              <div>
                <button className="border rounded-md py-3 px-4 text-sm hover:drop-shadow-xl	 bg-[#F7CB45] hover:font-semibold disabled:bg-red-300 shadow-[3px_3px_0px_0px_rgba(0,0,0)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0)] transition-all duration-500 hover:translate-y-[-3px] hover:translate-x-[-2px]">
                  Contact Seller
                </button>
              </div>
            )}
            {currentUser && listing.userRef === currentUser._id && (
              <div className="flex flex-row justify-end gap-4">
                <Link to={`/edit-listing/${listing._id}`}>
                  <button className="hover:underline">Edit</button>
                </Link>
                <p>/</p>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleListingDelete(listing._id);
                  }}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default Listing;
