import React, { useState } from "react";

const avatars = ["😀", "😎", "🤖", "🐱", "🎨", "🔥", "🌈", "👾"];

const UserSetup = ({ onSetup }) => {
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("😀");

  const handleSubmit = () => {
    if (!username.trim()) return;

    onSetup({
      username,
      avatar,
    });
  };

  return (
    <div className="user-setup">
      <h1>CineRate</h1>

      <input
        type="text"
        placeholder="Your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <div className="avatars">
        {avatars.map((item) => (
          <button
            key={item}
            className={avatar === item ? "active" : ""}
            onClick={() => setAvatar(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <button onClick={handleSubmit}>Enter</button>
    </div>
  );
};

export default UserSetup;
