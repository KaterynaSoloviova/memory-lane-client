import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../config/config";
import EmojiPicker from "emoji-picker-react";
import { MessageSquare, Smile, Send } from "lucide-react";

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
    <div className="bg-[#f9f5e8] p-4 rounded-lg border border-[#d4c5a3]">
      <h4 className="flex items-center gap-2 font-semibold mb-4 text-[#4a3f35]">
        <MessageSquare size={18} />
        Comments
      </h4>
      {comments.length === 0 && (
        <p className="text-sm text-[#7a6a57] mb-4">No comments yet.</p>
      )}
      <ul className="space-y-3 mb-4">
        {comments.map((c) => (
          <li key={c._id} className="bg-[#e8e0d0] p-3 rounded border border-[#d4c5a3]">
            <strong className="text-[#4a3f35]">{c.author?.username || "Anonymous"}:</strong> 
            <span className="text-[#4a3f35] ml-2">{c.content}</span>
            <div className="text-xs text-[#7a6a57] mt-1">
              {new Date(c.createdAt).toLocaleString()}
            </div>
          </li>
        ))}
      </ul>

      <div className="relative flex items-center gap-2 mb-3">
        <button
          type="button"
          onClick={() => setShowPicker((val) => !val)}
          className="flex items-center gap-2 bg-[#d4c5a3] text-[#4a3f35] px-3 py-1 rounded-full hover:bg-[#c0af8f] transition-colors"
          aria-label="Toggle emoji picker"
        >
          <Smile size={16} />
          Emoji
        </button>
        {showPicker && (
          <div className="absolute bottom-full mb-2 z-10">
            <EmojiPicker onEmojiClick={onEmojiClick} />
          </div>
        )}
      </div>

      <form onSubmit={handleAddComment} className="flex gap-3">
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write a comment..."
          className="border border-[#d4c5a3] rounded-lg flex-1 px-3 py-2 bg-white text-[#4a3f35] placeholder-[#7a6a57] focus:outline-none focus:border-[#c0af8f]"
          required
        />
        <button
          type="submit"
          className="flex items-center gap-2 bg-[#d4c5a3] text-[#4a3f35] px-4 py-2 rounded-full hover:bg-[#c0af8f] transition-colors"
        >
          <Send size={16} />
          Post
        </button>
      </form>
    </div>
  );
}
