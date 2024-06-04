import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";

const Listing = () => {
  SwiperCore.use([Navigation]);

  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [listing, setListing] = useState(null);

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

  return (
    <main className="font-spacemono p-3 mx-auto">
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
                  className="h-96"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </main>
  );
};

export default Listing;
