import User from "../models/User.js";

export const getAllUsers = async (req, res) => {
  const users = await User.find({ isActive: true }).select(
    "name email avatar role onlineStatus"
  );

  res.status(200).json({
    success: true,
    data: users
  });
};


export const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id).select(
    "-password"
  );

  if (!user || !user.isActive) {
    return res.status(404).json({
      success: false,
      message: "User not found"
    });
  }

  res.status(200).json({
    success: true,
    data: user
  });
};


export const getMe = async (req, res) => {
  const user = await User.findById(req.user._id).select(
    "-password"
  );

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found"
    });
  }

  res.status(200).json({
    success: true,
    data: user
  });
};

export const updateUserProfile = async (req, res) => {
  const allowedFields = ["name", "bio", "avatar"];
  const updates = {};

  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
  });

  const user = await User.findByIdAndUpdate(
    req.user._id,          
    updates,
    { new: true, runValidators: true }
  ).select("-password");

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found"
    });
  }

  res.status(200).json({
    success: true,
    data: user
  });
};


export const updateUserStatus = async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      onlineStatus: req.body.status,
      lastSeen: Date.now()
    },
    { new: true }
  ).select("-password");

  res.status(200).json({
    success: true,
    data: user
  });
};


export const addFriend = async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, {
    $addToSet: { friends: req.body.friendId }
  });

  res.status(200).json({
    success: true,
    message: "Friend added"
  });
};

export const removeFriend = async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, {
    $pull: { friends: req.body.friendId }
  });

  res.status(200).json({
    success: true,
    message: "Friend removed"
  });
};

export const getFriends = async (req, res) => {
  const user = await User.findById(req.user._id).populate(
    "friends",
    "name avatar onlineStatus"
  );

  res.status(200).json({
    success: true,
    data: user.friends
  });
};


export const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found"
    });
  }

  user.isActive = false;
  await user.save();

  res.status(200).json({
    success: true,
    message: "User deleted successfully"
  });
};


export const promoteUserToAdmin = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found"
    });
  }

  user.role = "admin";
  await user.save();

  res.status(200).json({
    success: true,
    data: user
  });
};
