import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { BASE_URL } from "../config/config";
import { isDraft, isLocked, isOwner } from "../utils/validators";
import Countdown from "../components/Countdown";

import SlideShow from "../components/SlideShow";
import CommentSection from "../components/CommentSection";


function ViewCapsulePage() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [capsule, setCapsule] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    axios
      .get(`${BASE_URL}/api/capsules/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setCapsule(res.data))
      .catch((err) => console.error("Error fetching capsule:", err));
  }, [id]);

  const editMode =
    capsule && user && isDraft(capsule) && isOwner(capsule, user._id);

  if (!capsule) {
    return <p className="p-6">Loading...</p>;
  }

  if (isLocked(capsule)) {
    return (
      <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-4">{capsule.title}</h2>
        <p className="mb-4">This capsule is locked until:</p>
        <Countdown unlockDate={capsule.unlockedDate} />
      </div>
    );
  }

  const items = capsule.items || [];
  const backgroundMusic =
    capsule.backgroundMusic || "/music/presentation-music-1.mp3";

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{capsule.title}</h1>
      <p className="text-gray-600 mb-8">{capsule.description}</p>

      {items.length > 0 ? (
        <SlideShow
          items={items}
          autoplay
          interval={4000}
          backgroundMusic={`/music/${backgroundMusic}`}
        />
      ) : (
        <p className="text-center text-gray-500">No items to display.</p>
      )}

      <CommentSection capsuleId={capsule._id}/>

      {editMode && (
        <div className="mt-8 flex gap-4 justify-center">
          <button
            onClick={() => {
              const token = localStorage.getItem("authToken");
              axios
                .delete(`${BASE_URL}/api/capsules/${id}`, {
                  headers: { Authorization: `Bearer ${token}` },
                })
                .then(() => navigate("/capsules"))
                .catch((err) => console.error("Error deleting capsule:", err));
            }}
            className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
          >
            Delete
          </button>
          <button
            onClick={() => {
              const token = localStorage.getItem("authToken");
              axios
                .post(
                  `${BASE_URL}/api/capsules/${id}/lock`,
                  {},
                  {
                    headers: { Authorization: `Bearer ${token}` },
                  }
                )
                .then(() => {
                  // Send invitations after locking
                  capsule.emails.forEach((email) => {
                    axios.post(
                      `${BASE_URL}/api/invitations`,
                      { email, capsule: id },
                      {
                        headers: { Authorization: `Bearer ${token}` },
                      }
                    );
                  });
                  navigate("/capsules");
                })
                .catch((err) => console.error("Error locking capsule:", err));
            }}
            className="bg-yellow-600 text-white px-6 py-2 rounded hover:bg-yellow-700"
          >
            Lock
          </button>
        </div>
      )}
    </div>
  );
}

export default ViewCapsulePage;
