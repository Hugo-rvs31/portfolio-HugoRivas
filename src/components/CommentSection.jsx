import React, { useState } from "react";

const CommentSection = ({ comments, onAddComment }) => {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (!text.trim()) return;

    onAddComment(text);

    setText("");
  };

  return (
    <div className="comment-section">
      <textarea
        placeholder="Write a review..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={handleSubmit}>Post Review</button>

      <div className="comments-list">
        {comments.map((comment) => (
          <div className="comment" key={comment.id}>
            <div className="comment-header">
              <span>{comment.avatar}</span>

              <strong>{comment.username}</strong>

              <span>{comment.date}</span>
            </div>

            <p>{comment.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
