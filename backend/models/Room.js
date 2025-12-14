import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      maxlength: 100
    },

    type: {
      type: String,
      enum: ["private", "group", "virtual"],
      default: "private"
    },

    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
      }
    ],

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message"
    },

    isActive: {
      type: Boolean,
      default: true
    },

    description: {
      type: String,
      maxlength: 250
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

roomSchema.index({ members: 1 });

roomSchema.pre("save", function () {
  if (this.type === "private" && this.members.length !== 2) {
    throw new Error("Private rooms must have exactly 2 members");
  }
});

export default mongoose.model("Room", roomSchema);
