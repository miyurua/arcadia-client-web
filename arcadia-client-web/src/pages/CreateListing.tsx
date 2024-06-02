import React from "react";

const CreateListing = () => {
  return (
    <main className="font-spacemono p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Add a new game
      </h1>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-1 flex-col gap-6">
          <input
            id="title"
            type="text"
            placeholder="Title"
            maxLength={62}
            minLength={1}
            className="border p-3 rounded-md hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition-all duration-500"
            required
          />
          <input
            id="publisher"
            type="text"
            placeholder="Publisher"
            maxLength={62}
            minLength={1}
            className="border p-3 rounded-md hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition-all duration-500"
            required
          />
          <textarea
            id="description"
            placeholder="Description"
            className="h-[200px] border p-3 rounded-md hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition-all duration-500 resize-none"
            required
          />
          <input
            id="genre"
            type="text"
            placeholder="Genre"
            maxLength={62}
            minLength={1}
            className="border p-3 rounded-md hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition-all duration-500"
            required
          />
        </div>
        <div className="flex flex-col flex-1 justify-between sm:gap-0 gap-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-row gap-4">
              <div className="flex items-center border rounded-md p-2 w-full hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition-all duration-500">
                <input type="file" id="images" accept="image/*" multiple />
              </div>
              <button className="border rounded-md text-[#21A193] p-3 hover:drop-shadow-xl hover:bg-[#21A193] hover:text-white hover:font-semibold disabled:bg-red-300 shadow-[3px_3px_0px_0px_rgba(33,161,147)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0)] transition-all duration-500">
                Upload
              </button>
            </div>
            <p className="font-semibold">
              Images:
              <span className="text-xs font-light">
                First image will be the cover image (max 6)
              </span>
            </p>
            <div className="flex flex-row gap-2 justify-between">
              <input
                id="ageRating"
                type="number"
                placeholder="Age Rating"
                min={3}
                max={18}
                className="border p-3 rounded-md hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition-all duration-500 flex-1"
                required
              />
              <div className="flex gap-2 flex-1 items-center">
                <input type="checkbox" id="dlcIncluded" className="w-5" />
                <span>DLC Included?</span>
              </div>
            </div>
            <div className="flex flex-row gap-4 flex-wrap">
              <input
                id="regPrice"
                type="number"
                placeholder="Price"
                min={1}
                className="border p-3 rounded-md hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition-all duration-500 flex-1"
                required
              />
              <input
                id="disPrice"
                type="number"
                placeholder="Discounted Price"
                min={1}
                className="border p-3 rounded-md hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition-all duration-500 flex-1"
                required
              />
            </div>
          </div>
          <button className="border rounded-md text-[#21A193] p-3 hover:drop-shadow-xl hover:bg-[#21A193] hover:text-white hover:font-semibold disabled:bg-red-300 shadow-[3px_3px_0px_0px_rgba(33,161,147)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0)] transition-all duration-500">
            Create game listing
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
