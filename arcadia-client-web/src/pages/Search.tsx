import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GameCardOne from "../components/common/GameCardOne";

export interface ISidebarData {
  searchTerm: string;
  dlcIncluded: boolean;
  sort: string;
  order: string;
}

export interface IGameListingData {
  _id: string;
  title: string;
  description: string;
  publisher: string;
  regularPrice: number;
  discountPrice: number;
  ageRating: number;
  dlcIncluded: boolean;
  genre: string;
  imageUrls: string[];
  userRef: string;
  __v: number;
}

const Search: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [sidebarData, setSidebarData] = useState<ISidebarData>({
    searchTerm: "",
    dlcIncluded: false,
    sort: "createdAt",
    order: "desc",
  });
  const [loading, setLoading] = useState(false);
  const [listData, setListData] = useState<IGameListingData[]>([]);
  const [isShowMore, setIsShowMore] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (e.target.id === "searchTerm") {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value });
    }

    if (e.target.id === "dlcIncluded") {
      setSidebarData({
        ...sidebarData,
        [e.target.id]: (e.target as HTMLInputElement).checked,
      });
    }

    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "createdAt";
      const order = e.target.value.split("_")[1] || "desc";

      setSidebarData({
        ...sidebarData,
        sort,
        order,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("dlcIncluded", sidebarData.dlcIncluded.toString());
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("order", sidebarData.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  console.log("list d", listData);

  useEffect(() => {
    setSidebarData({
      ...sidebarData,
      searchTerm: searchTerm,
    });
  }, [searchTerm]);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const dlcFromUrl = urlParams.get("dlcIncluded");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (searchTermFromUrl || dlcFromUrl || sortFromUrl || orderFromUrl) {
      setSidebarData({
        searchTerm: searchTermFromUrl || "",
        dlcIncluded: dlcFromUrl === "true" ? true : false,
        sort: sortFromUrl || "createdAt",
        order: orderFromUrl || "desc",
      });
      setSearchTerm(searchTermFromUrl || "");

      const fetchData = async () => {
        setLoading(true);
        setIsShowMore(false);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/listing/get?${searchQuery}`);
        const data = await res.json();
        if (data.length > 8) {
          setIsShowMore(true);
        } else {
          setIsShowMore(false);
        }
        setListData(data);
        setLoading(false);
      };

      fetchData();
    }
  }, [location.search]);

  const onShowMoreClick = async () => {
    const numOfGameListings = listData.length;
    const startIndex = numOfGameListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex.toString());
    const searchQuery = urlParams.toString();
    const res = await fetch(`api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setIsShowMore(false);
    }
    setListData([...listData, ...data]);
  };

  return (
    <div className="font-spacemono flex flex-col md:flex-row md:min-h-screen">
      {/* left */}
      <div className="p-7 border-b-2 md:border-r-2">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-row items-center gap-2 max-w-3lg font-inconsolata">
            <label className="whitespace-nowrap font-semibold">
              Search Term :
            </label>
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent focus:outline-none sm:w-64 bg-white p-3 rounded-md w-full"
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setSearchTerm(e.target.value);
              }}
            />
          </div>
          <div className="flex gap-2 font-inconsolata">
            <label className="whitespace-nowrap font-semibold">Filter : </label>
            <div className="flex flex-row gap-2">
              <input
                type="checkbox"
                id="dlcIncluded"
                onChange={handleChange}
                checked={sidebarData.dlcIncluded}
              />
              <span>DLC Included?</span>
            </div>
          </div>
          <div className="flex gap-2 font-inconsolata items-center">
            <label className="whitespace-nowrap font-semibold">Sort : </label>
            <select
              name=""
              id="sort_order"
              className="p-3 rounded-md"
              onChange={handleChange}
              defaultValue={"created_at_desc"}
            >
              <option value="regularPrice_desc">Price high - low</option>
              <option value="regularPrice_asc">Price low - high</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button className="border-2 border-black rounded-md py-3 px-6 text-sm hover:drop-shadow-xl bg-[#91A8ED] hover:font-semibold disabled:bg-red-300 shadow-[3px_3px_0px_0px_rgba(0,0,0)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0)] transition-all duration-500 hover:translate-y-[-3px] hover:translate-x-[-2px]">
              Search
            </button>
          </div>
        </form>
      </div>

      {/* right */}
      <div className="p-7 flex flex-col gap-4 w-full">
        <h1 className="text-3xl">Search Results: </h1>
        <div className="flex flex-wrap gap-4">
          {loading === false && listData.length === 0 && (
            <p className="text-xl">
              <span className="text-[#91A8ED]">{searchTerm} </span> returned no
              results.
            </p>
          )}
          {loading && <p className="text-xl text-center mx-auto">Loading...</p>}
          {!loading &&
            listData &&
            listData.map((item) => (
              <GameCardOne key={item._id} gameData={item} />
            ))}
        </div>
        {isShowMore && (
          <button className="hover:underline" onClick={onShowMoreClick}>
            Show more
          </button>
        )}
      </div>
    </div>
  );
};

export default Search;
