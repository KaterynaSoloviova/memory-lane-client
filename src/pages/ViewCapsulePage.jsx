import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { BASE_URL } from "../config/config";
import { isDraft, isLocked, isOwner } from "../utils/validators";
import Countdown from "../components/Countdown";
import { memoryStyles } from "../utils/styles";

function ViewCapsulePage() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [capsule, setCapsule] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
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

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const currentItem = items[currentIndex];

  // Get the style for the current item or use default
  const style =
    currentItem && currentItem.style && memoryStyles[currentItem.style]
      ? memoryStyles[currentItem.style]
      : memoryStyles.default;

  const fixedHeight = "400px";
  // Render content for text items with applied styles and safe HTML
  const renderTextContent = (content) => (
    <div
      className="rounded-lg shadow-md p-6"
      style={{
        backgroundColor: style.backgroundColor,
        color: style.color,
        fontFamily: style.fontFamily,
        fontSize: style.fontSize,
        whiteSpace: "pre-wrap",
        height: fixedHeight,
        maxWidth: "100%",
      }}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{capsule.title}</h1>
      <p className="text-gray-600 mb-8">{capsule.description}</p>

      {items.length > 0 ? (
        <div className="relative">
          {currentItem.type === "image" && (
            <div
              className="rounded-lg shadow-md overflow-hidden"
              style={{
                backgroundColor: style.backgroundColor,
                padding: "1rem",
                height: fixedHeight,
              }}
            >
              <img
                src={currentItem.url}
                alt={currentItem.description || ""}
                className="w-full object-contain rounded"
              />
              {currentItem.description && (
                <p
                  className="mt-2 text-center italic"
                  style={{ color: style.color, fontFamily: style.fontFamily }}
                >
                  {currentItem.description}
                </p>
              )}
            </div>
          )}

          {currentItem.type === "video" && (
            <div
              className="rounded-lg shadow-md overflow-hidden"
              style={{
                backgroundColor: style.backgroundColor,
                padding: "1rem",
                height: fixedHeight,
              }}
            >
              <video controls className="w-full rounded">
                <source src={currentItem.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              {currentItem.description && (
                <p
                  className="mt-2 text-center italic"
                  style={{ color: style.color, fontFamily: style.fontFamily }}
                >
                  {currentItem.description}
                </p>
              )}
            </div>
          )}

          {currentItem.type === "text" &&
            renderTextContent(currentItem.content)}

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-700 text-white p-3 rounded-full hover:bg-gray-800 transition"
            aria-label="Previous Item"
          >
            ◀
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-700 text-white p-3 rounded-full hover:bg-gray-800 transition"
            aria-label="Next Item"
          >
            ▶
          </button>
        </div>
      ) : (
        <p className="text-center text-gray-500">No items to display.</p>
      )}

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
