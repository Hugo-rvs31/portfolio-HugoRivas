import React, { useEffect, useState } from "react";
import BackButton from "../components/BackButton";

const avatars = ["😀", "😎", "🤖", "🐱", "🎨", "🔥", "🌈", "👾"];

const Guestbook = () => {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("😀");
  const [message, setMessage] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const savedPosts = localStorage.getItem("guestbook-posts");
    const savedUser = localStorage.getItem("guestbook-user");

    if (savedPosts) setPosts(JSON.parse(savedPosts));

    if (savedUser) {
      const user = JSON.parse(savedUser);
      setUsername(user.username);
      setSelectedAvatar(user.avatar);
      setStep(2);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("guestbook-posts", JSON.stringify(posts));
  }, [posts]);

  const handleStart = () => {
    if (!username) return;

    localStorage.setItem(
      "guestbook-user",
      JSON.stringify({
        username,
        avatar: selectedAvatar,
      }),
    );

    setStep(2);
  };

  const handleSubmit = () => {
    if (!message || !username) return;

    const newPost = {
      id: Date.now(),
      username,
      avatar: selectedAvatar,
      message,
      date: new Date().toLocaleString(),
      likes: 0,
    };

    setPosts([newPost, ...posts]);
    setMessage("");
  };

  const handleLike = (id) => {
    const updated = posts.map((post) =>
      post.id === id ? { ...post, likes: post.likes + 1 } : post,
    );

    setPosts(updated);
  };

  const handleReset = () => {
    localStorage.removeItem("guestbook-posts");
    localStorage.removeItem("guestbook-user");
    setPosts([]);
    setUsername("");
    setSelectedAvatar("😀");
    setStep(1);
  };

  return (
    <div className="guestbook">
      <BackButton />

      <div className="guestbook-inner">
        {step === 1 && (
          <div className="guestbook-setup">
            <h1>Guestbook</h1>

            <input
              type="text"
              placeholder="Your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <div className="avatar-selector">
              {avatars.map((a) => (
                <button
                  key={a}
                  className={`avatar-btn ${
                    selectedAvatar === a ? "active" : ""
                  }`}
                  onClick={() => setSelectedAvatar(a)}
                >
                  {a}
                </button>
              ))}
            </div>

            <button className="start-btn" onClick={handleStart}>
              Enter
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="guestbook-board">
            <h2>
              Welcome {selectedAvatar} {username}
            </h2>

            <textarea
              placeholder="Leave a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <div className="actions">
              <button className="post-btn" onClick={handleSubmit}>
                Post
              </button>

              <button className="reset-btn" onClick={handleReset}>
                Reset
              </button>
            </div>

            <div className="posts">
              {posts.map((post) => (
                <div className="post" key={post.id}>
                  <div className="post-header">
                    <span className="avatar">{post.avatar}</span>
                    <span className="name">{post.username}</span>
                    <span className="date">{post.date}</span>
                  </div>

                  <p className="text">{post.message}</p>

                  <div className="post-footer">
                    <button
                      className="like-btn"
                      onClick={() => handleLike(post.id)}
                    >
                      ❤️ {post.likes}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Guestbook;
