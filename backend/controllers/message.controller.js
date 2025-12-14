import Message from "../models/Message.js";
import Room from "../models/Room.js";

// GET /api/messages/:roomId
export const getMessagesByRoom = async (req, res) => {
  try {
    const messages = await Message.find({
      room: req.params.roomId,
      isDeleted: false
    })
      .populate("sender", "name avatar")
      .sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/messages
export const createMessage = async (req, res) => {
  try {
    const message = await Message.create(req.body);

    await Room.findByIdAndUpdate(req.body.room, {
      lastMessage: message._id
    });

    res.status(201).json(message);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT /api/messages/:id
export const updateMessage = async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { content: req.body.content },
      { new: true }
    );
    res.status(200).json(message);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE /api/messages/:id
export const deleteMessage = async (req, res) => {
  try {
    await Message.findByIdAndUpdate(req.params.id, {
      isDeleted: true
    });
    res.status(200).json({ message: "Message deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PATCH /api/messages/read/:roomId
export const markMessagesAsRead = async (req, res) => {
  try {
    await Message.updateMany(
      {
        room: req.params.roomId,
        "readBy.user": { $ne: req.user._id }
      },
      {
        $push: {
          readBy: {
            user: req.user._id,
            readAt: new Date()
          }
        }
      }
    );

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

