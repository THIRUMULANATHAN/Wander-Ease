// src/Vrooms/Vrooms.jsx
import { useEffect, useRef, useState } from "react";
import API from "../api/api";
import { getUser } from "../utils/auth";
import "./Vrooms.css";

const Vrooms = () => {
  const user = getUser();
  const messagesEndRef = useRef(null);

  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);

  /* ---------------- FETCH ROOMS ---------------- */
  useEffect(() => {
    if (!user) return;

    const fetchRooms = async () => {
      try {
        const res = await API.get(`/rooms/user/${user._id}`);
        setRooms(res.data.data || []);
      } catch (err) {
        console.error("Room fetch error", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [user?._id]);

  /* ---------------- FETCH MESSAGES (POLLING) ---------------- */
  useEffect(() => {
    if (!selectedRoom) return;

    const fetchMessages = async () => {
      try {
        const res = await API.get(`/messages/${selectedRoom._id}`);
        setMessages(res.data || []);
      } catch (err) {
        console.error("Message fetch error", err);
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 3000); // pseudo-live
    return () => clearInterval(interval);
  }, [selectedRoom]);

  /* ---------------- AUTO SCROLL ---------------- */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* ---------------- OPEN ROOM ---------------- */
  const openRoom = (room) => {
    if (!room.isActive) {
      alert("Room inactive");
      return;
    }
    setSelectedRoom(room);
    setShowSidebar(false); // auto close on mobile
  };

  /* ---------------- SEND MESSAGE ---------------- */
  const sendMessage = async () => {
    if (!text.trim() || !selectedRoom) return;

    try {
      const res = await API.post("/messages", {
        room: selectedRoom._id,
        sender: user._id,
        content: text
      });

      setMessages((prev) => [...prev, res.data]);
      setText("");
    } catch (err) {
      console.error("Send error", err);
    }
  };

  return (
    <div className="vr-container">
      {/* MOBILE OVERLAY */}
      {showSidebar && (
        <div
          className="sidebar-overlay"
          onClick={() => setShowSidebar(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside className={`vr-sidebar ${showSidebar ? "open" : ""}`}>
        <h3>Your Rooms</h3>

        {loading && <p>Loading...</p>}
        {!loading && rooms.length === 0 && <p>No rooms yet</p>}

        {rooms.map((room) => (
          <div
            key={room._id}
            className={`room-item ${
              selectedRoom?._id === room._id ? "active-room" : ""
            }`}
            onClick={() => openRoom(room)}
          >
            <div className="room-title">{room.name}</div>
            <div className="room-meta">
              <span className={`status ${room.isActive ? "online" : "offline"}`}>
                {room.isActive ? "Active" : "Inactive"}
              </span>
              <span>{room.type}</span>
            </div>
          </div>
        ))}
      </aside>

      {/* CHAT */}
      <main className="vr-chat">
        <div className="chat-header">
          <button
            className="mobile-menu-btn"
            onClick={() => setShowSidebar(true)}
          >
            ☰
          </button>
          <h3>{selectedRoom ? selectedRoom.name : "Select a room"}</h3>
        </div>

        {!selectedRoom && (
          <div className="empty-chat">Select a room to start chatting</div>
        )}

        {selectedRoom && (
          <>
            <div className="chat-messages">
              {messages.map((msg) => (
                <div
                  key={msg._id}
                  className={`chat-message ${
                    msg.sender._id === user._id ? "own" : ""
                  }`}
                >
                  <strong>{msg.sender.name}</strong>
                  <p>{msg.content}</p>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="chat-input">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type a message..."
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button onClick={sendMessage}>Send</button>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Vrooms;
