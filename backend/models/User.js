// Backend\models\User.js

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 2,
      maxlength: 50
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"]
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 8,
      select: false
    },

    avatar: {
      type: String,
      default: "https://i.pravatar.cc/150"
    },

    bio: {
      type: String,
      maxlength: 160,
      default: ""
    },

    role: {
      type: String,
      enum: ["user", "admin", "moderator"],
      default: "user"
    },

    isActive: {
      type: Boolean,
      default: true
    },

    onlineStatus: {
      type: String,
      enum: ["online", "offline", "away"],
      default: "offline"
    },

    lastSeen: {
      type: Date
    },

    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],

    refreshToken: {
      type: String,
      select: false
    },

    passwordChangedAt: {
      type: Date
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordChangedAt = Date.now() - 1000;
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  delete user.refreshToken;
  return user;
};

export default mongoose.model("User", userSchema);
