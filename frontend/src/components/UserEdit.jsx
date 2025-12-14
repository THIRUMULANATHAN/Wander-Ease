import { useState } from "react";
import API from "../api/api";
import { logout } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import "./UserEdit.css";

const DEFAULT_AVATAR = "https://i.pravatar.cc/150";

const UserEdit = ({ user, onClose }) => {
  const [name, setName] = useState(user?.name || "");
  const [avatar, setAvatar] = useState(user?.avatar || "");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUpdate = async () => {
    if (!name.trim()) {
      alert("Name cannot be empty");
      return;
    }

    try {
      setLoading(true);

      await API.put(`/users/${user._id}`, {
        name,
        avatar
      });

      alert("Profile updated successfully. Please login again.");

      // 🔐 FORCE LOGOUT (ANTI-CRASH, ANTI-DESYNC)
      logout();
      navigate("/login");

    } catch (err) {
      console.error("Profile update error:", err);
      alert(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-edit-overlay" onClick={onClose}>
      <div className="user-edit" onClick={(e) => e.stopPropagation()}>

        <button className="close-x" onClick={onClose}>×</button>

        <h3>Edit Profile</h3>

        <img
          src={avatar || DEFAULT_AVATAR}
          className="avatar-preview"
          onError={(e) => (e.target.src = DEFAULT_AVATAR)}
        />

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />

        <input
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          placeholder="Avatar image URL"
        />

        <button onClick={handleUpdate} disabled={loading}>
          {loading ? "Saving..." : "Save & Logout"}
        </button>
      </div>
    </div>
  );
};

export default UserEdit;
