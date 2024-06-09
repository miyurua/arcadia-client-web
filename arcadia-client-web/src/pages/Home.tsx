import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import GameCardOne from "../components/common/GameCardOne";

const Home = () => {
  SwiperCore.use([Navigation]);
  const [dlcIncludedListings, setDlcIncludedListings] = useState([]);
  const [recentListings, setRecentListings] = useState([]);

  useEffect(() => {
    const fetchRecentListings = async () => {
      try {
        const res = await fetch(
          `api/listing/get?dlcIncluded=false&limit=4&sort=createdAt&order=desc`
        );
        const data = await res.json();
        setRecentListings(data);
        fetchDlcListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchDlcListings = async () => {
      try {
        const res = await fetch(`/api/listing/get?dlcIncluded=true&limit=4`);
        const data = await res.json();
        setDlcIncludedListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRecentListings();
  }, []);

  return (
    <main className="font-spacemono mx-auto">
      {/* top */}
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className="font-bold text-5xl sm:text-6xl">
          Your Ultimate<span className="text-[#EA4C89]"> Gaming </span>
          <br />
          Destination
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 gap-6 max-w-4xl">
          Welcome to Arcadia, the best place to discover, buy, and enjoy the
          latest video games. Experience exclusive deals and join a passionate
          gaming community.
          <br />
          <br />
          Level up your gaming today!
        </p>
        <Link
          to={`/search?searchTerm=&dlcIncluded=false&sort=createdAt&order=desc`}
        >
          <p className="text-xs sm:text-sm text-blue-700 font-bold ">
            Checkout our wide range of video games...
          </p>
        </Link>
      </div>
      {/* swiper */}
      <Swiper navigation>
        {recentListings &&
          recentListings.length > 1 &&
          recentListings.map((item) => (
            <SwiperSlide key={item._id}>
              <div
                style={{
                  background: `url(${item.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="h-[640px]"
                key={item._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      {recentListings && recentListings.length > 1 && (
        <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 mt-10">
          <div className="flex flex-col gap-2 p-3">
            <p className="text-2xl font-semibold">Recently added titles</p>
            <Link
              to={`/search?searchTerm=&dlcIncluded=false&sort=createdAt&order=desc`}
            >
              <p className="text-xs sm:text-sm text-blue-700 font-bold ">
                Checkout more recently added titles...
              </p>
            </Link>
          </div>
          <div className="flex overflow-visible gap-6 p-3">
            {recentListings.map((gameListing) => (
              <GameCardOne gameData={gameListing} key={gameListing._id} />
            ))}
          </div>
        </div>
      )}

      {dlcIncludedListings && dlcIncludedListings.length > 1 && (
        <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 ">
          <div className="flex flex-col gap-2 p-3">
            <p className="text-2xl font-semibold">DLC included titles</p>
            <Link
              to={`/search?searchTerm=&dlcIncluded=true&sort=createdAt&order=desc`}
            >
              <p className="text-xs sm:text-sm text-blue-700 font-bold ">
                Checkout more DLC included titles...
              </p>
            </Link>
          </div>
          <div className="flex overflow-visible gap-6 p-3">
            {dlcIncludedListings.map((gameListing) => (
              <GameCardOne gameData={gameListing} key={gameListing._id} />
            ))}
          </div>
        </div>
      )}
    </main>
  );
};

export default Home;
