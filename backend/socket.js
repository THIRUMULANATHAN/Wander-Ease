import { Server } from "socket.io";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("user-online", async (userId) => {
      try {
        const { default: User } = await import("./models/User.js");

        socket.userId = userId;

        await User.findByIdAndUpdate(userId, {
          onlineStatus: "online",
          lastSeen: Date.now()
        });

        io.emit("user-status-update", {
          userId,
          status: "online"
        });
      } catch (err) {
        console.error("user-online error:", err.message);
      }
    });

    socket.on("join-room", (roomId) => {
      socket.join(roomId);
      console.log(`Socket ${socket.id} joined room ${roomId}`);
    });

    socket.on("send-message", async (data) => {
      try {
        const { default: Message } = await import("./models/Message.js");
        const { default: Room } = await import("./models/Room.js");

        const { roomId, senderId, content, messageType } = data;

        const message = await Message.create({
          room: roomId,
          sender: senderId,
          content,
          messageType: messageType || "text"
        });

        await Room.findByIdAndUpdate(roomId, {
          lastMessage: message._id,
          lastActivityAt: Date.now()
        });

        const populatedMessage = await Message.findById(message._id)
          .populate("sender", "name avatar");

        io.to(roomId).emit("receive-message", populatedMessage);
      } catch (error) {
        console.error("send-message error:", error.message);
      }
    });

    socket.on("leave-room", (roomId) => {
      socket.leave(roomId);
    });

    socket.on("disconnect", async () => {
      console.log("User disconnected:", socket.id);

      if (socket.userId) {
        try {
          const { default: User } = await import("./models/User.js");

          await User.findByIdAndUpdate(socket.userId, {
            onlineStatus: "offline",
            lastSeen: Date.now()
          });

          io.emit("user-status-update", {
            userId: socket.userId,
            status: "offline"
          });
        } catch (err) {
          console.error("disconnect error:", err.message);
        }
      }
    });
  });

  return io;
};

export const getIO = () => io;
