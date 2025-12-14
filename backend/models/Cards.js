// Backend\models\Cards.js

import mongoose from "mongoose";

const cardSchema = new mongoose.Schema(
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
      maxlength: 250
    },

    image: {
      type: String,
      required: true
    },

    location: {
      type: String,
      required: true,
      trim: true
    },

    duration: {
      type: String,
      required: true
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

    packageRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Package",
      required: true
    },

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

cardSchema.index({ category: 1 });
cardSchema.index({ isFeatured: 1 });
cardSchema.index({ title: "text", location: "text" });

export default mongoose.model("Card", cardSchema);
