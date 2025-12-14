// Backend\models\Activity.js

import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150
    },

    content: {
      type: String,
      required: true,
      maxlength: 2000
    },

    image: {
      type: String
    }
  },
  { _id: false }
);

const activitySchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      enum: ["hiking", "yachting"]
    },

    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50
    },

    title: {
      type: String,
      required: true,
      maxlength: 120
    },

    description: {
      type: String,
      required: true,
      maxlength: 500
    },

    bannerImage: {
      type: String,
      required: true
    },

    breadcrumbLabel: {
      type: String,
      default: "Home"
    },

    sections: [sectionSchema],

    ctaText: {
      type: String,
      default: "View Packages"
    },

    ctaLink: {
      type: String,
      default: "/package"
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

activitySchema.index({ slug: 1 });
activitySchema.index({ isActive: 1 });

export default mongoose.model("Activity", activitySchema);
