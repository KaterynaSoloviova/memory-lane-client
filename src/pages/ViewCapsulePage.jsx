import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { BASE_URL } from "../config/config";
import { isDraft, isOwner } from "../utils/validators";

function ViewCapsulePage() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [capsule, setCapsule] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    axios
      .get(`${BASE_URL}/api/capsules/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setCapsule(res.data))
      .catch((err) => console.error("Error fetching capsule:", err));
  }, [id]);
  
  const editMode = capsule && isDraft(capsule) && isOwner(capsule, user._id);

  if (!capsule) return <p className="p-6">Loading...</p>;

  const items = capsule.items || [];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  // Delete and Lock handlers only if in edit mode
  const handleDelete = () => {
    // your delete logic here or call API
    alert("Delete clicked"); // replace with actual
  };

  const handleLock = () => {
    // your lock logic here or call API
    alert("Lock clicked"); // replace with actual
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2">{capsule.title}</h1>
      <p className="text-gray-600 mb-6">{capsule.description}</p>

      {items.length > 0 && (
        <div className="relative w-full max-w-2xl mx-auto">
          {items[currentIndex].type === "image" && (
            <img
              src={items[currentIndex].url}
              alt={items[currentIndex].description || ""}
              className="rounded-lg shadow-md w-full object-cover"
            />
          )}
          {items[currentIndex].type === "video" && (
            <video controls className="rounded-lg shadow-md w-full">
              <source src={items[currentIndex].url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
          {items[currentIndex].type === "text" && (
            <div className="bg-white p-4 rounded-lg shadow-md">
              <p>{items[currentIndex].content}</p>
            </div>
          )}

          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 bg-gray-700 text-white p-2 rounded-full"
          >
            ◀
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 bg-gray-700 text-white p-2 rounded-full"
          >
            ▶
          </button>
        </div>
      )}

      {editMode && (
        <div className="mt-6 flex gap-4">
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Delete
          </button>
          <button
            onClick={handleLock}
            className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
          >
            Lock
          </button>
        </div>
      )}
    </div>
  );
}

export default ViewCapsulePage;
