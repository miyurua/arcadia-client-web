import React from "react";

const Search = () => {
  return (
    <div className="font-spacemono flex flex-col md:flex-row md:min-h-screen">
      {/* left */}
      <div className="p-7 border-b-2 md:border-r-2">
        <form action="" className="flex flex-col gap-4">
          <div className="flex flex-row items-center gap-2 max-w-3lg font-inconsolata">
            <label className="whitespace-nowrap font-semibold">
              Search Term :{" "}
            </label>
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent focus:outline-none sm:w-64 bg-white p-3 rounded-md w-full"
              // value={serachTerm}
              // onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              //   setSearchTerm(e.target.value)
              // }
            />
          </div>
          <div className="flex gap-2 font-inconsolata">
            <label className="whitespace-nowrap font-semibold">Filter : </label>
            <div className="flex flex-row gap-2">
              <input type="checkbox" id="dlcIncluded" />
              <span>DLC Included?</span>
            </div>
          </div>
          <div className="flex gap-2 font-inconsolata items-center">
            <label className="whitespace-nowrap font-semibold">Sort : </label>
            <select name="" id="sort_order" className="p-3 rounded-md">
              <option value="">Price high - low</option>
              <option value="">Price low - high</option>
              <option value="">Latest</option>
              <option value="">Oldest</option>
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
      <div>
        <h1 className="text-3xl m-5">Search Results: </h1>
      </div>
    </div>
  );
};

export default Search;
