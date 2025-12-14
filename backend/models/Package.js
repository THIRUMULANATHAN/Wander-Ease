// Backend\models\Package.js

import mongoose from "mongoose";

const itinerarySchema = new mongoose.Schema(
  {
    day: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    details: {
      type: String,
      required: true
    }
  },
  { _id: false }
);

const packageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120
    },

    description: {
      type: String,
      required: true,
      maxlength: 1000
    },

    shortDescription: {
      type: String,
      maxlength: 250
    },

    coverImage: {
      type: String,
      required: true
    },

    gallery: [
      {
        type: String
      }
    ],

    location: {
      type: String,
      required: true
    },

    duration: {
      type: String,
      required: true
    },

    tourType: {
      type: String,
      enum: ["Hiking", "Yachting", "Cultural", "Adventure"],
      required: true
    },

    groupSize: {
      type: String
    },

    languages: {
      type: String
    },

    price: {
      type: Number,
      required: true
    },

    category: {
      type: String,
      enum: ["hiking", "yachting", "india"],
      required: true
    },

    itinerary: [itinerarySchema],

    isActive: {
      type: Boolean,
      default: true
    },

    isFeatured: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

packageSchema.index({ title: "text", location: "text" });
packageSchema.index({ category: 1 });
packageSchema.index({ isFeatured: 1 });

export default mongoose.model("Package", packageSchema);
