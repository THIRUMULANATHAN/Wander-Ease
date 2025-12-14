import Room from "../models/Room.js";

/* GET user rooms */
export const getUserRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find({
      members: req.params.userId,
      isActive: true
    }).populate("members", "name avatar");

    res.status(200).json({ success: true, data: rooms });
  } catch (error) {
    next(error);
  }
};

/* GET room by id */
export const getRoomById = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id).populate("members");
    res.status(200).json({ success: true, data: room });
  } catch (error) {
    next(error);
  }
};

/* CREATE room */
export const createRoom = async (req, res, next) => {
  try {
    const room = await Room.create(req.body);
    res.status(201).json({ success: true, data: room });
  } catch (error) {
    next(error);
  }
};

/* ADD member */
export const addMemberToRoom = async (req, res, next) => {
  try {
    const room = await Room.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { members: req.body.userId } },
      { new: true }
    );
    res.status(200).json({ success: true, data: room });
  } catch (error) {
    next(error);
  }
};

/* REMOVE member */
export const removeMemberFromRoom = async (req, res, next) => {
  try {
    const room = await Room.findByIdAndUpdate(
      req.params.id,
      { $pull: { members: req.body.userId } },
      { new: true }
    );
    res.status(200).json({ success: true, data: room });
  } catch (error) {
    next(error);
  }
};

/* DELETE room */
export const deleteRoom = async (req, res, next) => {
  try {
    await Room.findByIdAndUpdate(req.params.id, { isActive: false });
    res.status(200).json({ success: true, message: "Room deleted" });
  } catch (error) {
    next(error);
  }
};
