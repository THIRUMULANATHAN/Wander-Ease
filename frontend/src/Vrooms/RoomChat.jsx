// src/Vrooms/RoomChat.jsx
import { useEffect, useState } from "react";
import API from "../api/api";

function RoomChat({ room, user }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!room?._id) return;

    API.get(`/messages/${room._id}`)
      .then((res) => setMessages(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [room._id]);

  const sendMessage = async () => {
    if (!text.trim()) return;

    const payload = {
      room: room._id,
      sender: user._id,
      content: text
    };

    try {
      const res = await API.post("/messages", payload);
      setMessages((prev) => [...prev, res.data]);
      setText("");
    } catch (err) {
      console.error(err);
      alert("Message failed");
    }
  };

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* HEADER */}
      <div style={{ padding: 16, borderBottom: "1px solid #ddd" }}>
        <strong>{room.name}</strong>
      </div>

      {/* MESSAGES */}
      <div style={{ flex: 1, padding: 16, overflowY: "auto" }}>
        {loading && <p>Loading messages...</p>}

        {messages.map((msg) => (
          <div
            key={msg._id}
            style={{
              marginBottom: 10,
              textAlign: msg.sender._id === user._id ? "right" : "left"
            }}
          >
            <small>{msg.sender.name}</small>
            <div
              style={{
                display: "inline-block",
                padding: "8px 12px",
                borderRadius: 10,
                background:
                  msg.sender._id === user._id ? "#4caf50" : "#eee",
                color: msg.sender._id === user._id ? "#fff" : "#000"
              }}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      {/* INPUT */}
      <div style={{ display: "flex", padding: 16, borderTop: "1px solid #ddd" }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          style={{ flex: 1, padding: 10 }}
        />
        <button onClick={sendMessage} style={{ marginLeft: 10 }}>
          Send
        </button>
      </div>
    </div>
  );
}

export default RoomChat;
