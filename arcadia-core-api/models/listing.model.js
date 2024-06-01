import { timeStamp } from "console";
import mongoose from "mongoose";
import { type } from "os";

const listingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    publisher: {
      type: String,
      required: true,
    },
    regularPrice: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
      required: true,
    },
    ageRating: {
      type: Number,
      required: true,
    },
    dlcIncluded: {
      type: Boolean,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    imageUrls: {
      type: Array,
      required: true,
    },
    userRef: {
      type: String,
      required: true,
    },
  },
  { timeStamp: true }
);

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;
