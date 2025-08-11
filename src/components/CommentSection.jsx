import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../config/config";
import EmojiPicker from "emoji-picker-react";

export default function CommentSection({ capsuleId }) {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const token = localStorage.getItem("authToken");
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/comments/${capsuleId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setComments(res.data))
      .catch((err) => console.error("Failed to fetch comments:", err));
  }, [capsuleId, token]);

  const handleAddComment = (e) => {
    e.preventDefault();
    axios
      .post(
        `${BASE_URL}/api/comments/${capsuleId}`,
        { content },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        setComments((prev) => [...prev, res.data]);
        setContent("");
      })
      .catch((err) => console.error("Failed to post comment:", err));
  };

  const onEmojiClick = (event) => {
  setContent((prev) => prev + event.emoji);
  setShowPicker(false); 
};

  return (
    <div className="mt-4 border-t pt-3">
      <h4 className="font-semibold mb-2">💬 Comments</h4>
      {comments.length === 0 && (
        <p className="text-sm text-gray-500">No comments yet.</p>
      )}
      <ul className="space-y-2 mb-3">
        {comments.map((c) => (
          <li key={c._id} className="retro-comment p-2 rounded bg-yellow-100 border border-yellow-300">
            <strong>{c.author?.username || "Anonymous"}:</strong> {c.content}
            <div className="text-xs text-gray-500">
              {new Date(c.createdAt).toLocaleString()}
            </div>
          </li>
        ))}
      </ul>

      <div className="relative flex items-center gap-2 mb-2">
        <button
          type="button"
          onClick={() => setShowPicker((val) => !val)}
          className="text-xl"
          aria-label="Toggle emoji picker"
        >
          😊
        </button>
        {showPicker && (
          <div className="absolute bottom-full mb-2 z-10">
            <EmojiPicker onEmojiClick={onEmojiClick} />
          </div>
        )}
      </div>

      <form onSubmit={handleAddComment} className="flex gap-2">
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write a comment..."
          className="border rounded flex-1 px-2 py-1"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
        >
          Post
        </button>
      </form>
    </div>
  );
}
