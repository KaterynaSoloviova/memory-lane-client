import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { BASE_URL } from "../config/config";

function MyCapsules() {
  const { user } = useContext(AuthContext);
  const [capsules, setCapsules] = useState([]);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCapsules = async () => {
      try {
        const storedToken = localStorage.getItem("authToken");
        const response = await axios.get(`${BASE_URL}/api/capsules`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        });
        setCapsules(response.data);
      } catch (error) {
        console.error("Error fetching user capsules", error);
      }
    };

    fetchCapsules();
  }, []);

  if (!user) {
    return (
      <p className="text-center mt-10">Please login to view your capsules.</p>
    );
  }

  const handleDelete = async (id) => {
    const storedToken = localStorage.getItem("authToken");
    try {
      await axios.delete(`${BASE_URL}/api/capsules/${id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      setCapsules((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Failed to delete capsule", err);
    }
  };

  // Determine capsule status:
  // - If unlockDate missing or empty, status = draft
  // - Else if unlockDate in future => locked
  // - Else unlocked
  const getCapsuleStatus = (cap) => {
    if (!cap.unlockDate) {
      return { status: "draft", date: cap.createdAt, dateLabel: "Created on" };
    }

    const now = new Date();
    const unlockDate = new Date(cap.unlockDate);

    if (unlockDate > now) {
      return {
        status: "locked",
        date: cap.unlockDate,
        dateLabel: "Unlock date",
      };
    } else {
      return {
        status: "unlocked",
        date: cap.unlockDate,
        dateLabel: "Unlocked on",
      };
    }
  };

  const filteredCapsules = capsules.filter((cap) => {
    const { status } = getCapsuleStatus(cap);
    if (filter === "all") return true;
    return status === filter;
  });

  const handleCardClick = (cap) => {
    const { status } = getCapsuleStatus(cap);
    if (status === "draft") {
      navigate(`/create-capsule/${cap._id}`); // edit draft
    } else if (status === "unlocked") {
      navigate(`/capsule/${cap._id}`, { state: { editMode: false } }); // view unlocked in read-only mode
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">📁 My Capsules</h2>
        <button
          onClick={() => navigate("/create-capsule")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Create Capsule
        </button>
      </div>

      {/* Filter buttons */}
      <div className="flex gap-3 mb-6">
        {["all", "locked", "unlocked", "draft"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded capitalize ${
              filter === type
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Capsules Grid */}
      {filteredCapsules.length === 0 ? (
        <p>No capsules found.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {filteredCapsules.map((cap) => {
            const { status, date, dateLabel } = getCapsuleStatus(cap);
            const isClickable = status === "unlocked" || status === "draft";

            return (
              <div
                key={cap._id}
                onClick={() => isClickable && handleCardClick(cap)}
                className={`bg-white rounded shadow overflow-hidden transition hover:shadow-lg ${
                  isClickable ? "cursor-pointer" : "cursor-default"
                }`}
              >
                <img
                  src={cap.image || "/placeholder.jpg"}
                  alt={cap.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">{cap.title}</h3>
                  <p className="text-gray-600 text-sm">
                    {dateLabel}:{" "}
                    {date ? new Date(date).toLocaleDateString() : "N/A"}
                  </p>
                  <span
                    className={`inline-block mt-3 px-3 py-1 text-sm rounded capitalize ${
                      status === "locked"
                        ? "bg-gray-300"
                        : status === "unlocked"
                        ? "bg-green-300"
                        : "bg-yellow-300"
                    }`}
                  >
                    {status}
                  </span>

                  {/* Delete button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(cap._id);
                    }}
                    className="mt-3 block text-red-600 hover:underline text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MyCapsules;
