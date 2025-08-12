import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { BASE_URL } from "../config/config";
import { isLocked, isUnlocked, isDraft } from "../utils/validators";
import {
  VintageDecorations,
  VintageOrnament,
  VintageContainer,
  vintageClasses,
} from "../utils/vintageStyles.jsx";
import imagePlaceholder from "../assets/image-placeholder.jpg";
import { Plus, Trash2, Camera} from "lucide-react";

function MyCapsules() {
  const { user } = useContext(AuthContext);
  const [capsules, setCapsules] = useState([]);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const fetchCapsules = async () => {
      try {
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

  const handleDelete = (id) => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .delete(`${BASE_URL}/api/capsules/${id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => setCapsules((prev) => prev.filter((c) => c._id !== id)))
      .catch((err) => console.error("Failed to delete capsule", err));
  };

  // Use imported helper functions to determine status
  const getCapsuleStatus = (cap) => {
    if (isDraft(cap)) {
      return { status: "draft", date: cap.createdAt, dateLabel: "Created on" };
    }
    if (isLocked(cap)) {
      return {
        status: "locked",
        date: cap.unlockedDate,
        dateLabel: "Unlock date",
      };
    }
    if (isUnlocked(cap)) {
      return {
        status: "unlocked",
        date: cap.unlockedDate,
        dateLabel: "Unlocked on",
      };
    }
    return { status: "unknown", date: null, dateLabel: "" };
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
    } else {
      navigate(`/capsule/${cap._id}`, { state: { editMode: false } }); // view unlocked in read-only mode
    }
  };

  return (
    <main className={vintageClasses.pageContainer}>
      <VintageDecorations />

      <section className="relative z-10 px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="max-w-6xl mx-auto">
          <VintageContainer
            className="text-center mb-6 sm:mb-8"
            style={{ paddingTop: "12px", paddingBottom: "12px" }}
          >
            <div className="flex justify-center mb-3 sm:mb-4">
              <Camera size={24} className="sm:w-7 sm:h-7" color="#8B4513" />
            </div>

            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-[#8B4513] tracking-wide"
              style={{ fontFamily: "Georgia, serif" }}
            >
              <span className="text-2xl sm:text-3xl lg:text-4xl">💌</span> My Capsules
            </h2>

            <button
              onClick={() => navigate("/create-capsule")}
              className="flex items-center gap-2 bg-[#d4c5a3] text-[#4a3f35] mb-5 px-4 py-2 rounded-full hover:bg-[#c0af8f] transition-colors mx-auto"
            >
              <Plus size={18} />
              Create New Capsule
            </button>
            <VintageOrnament size="sm" symbol="✦" />
          </VintageContainer>

          {/* Filter buttons */}
          <div className="bg-[#f9f5e8] p-3 rounded-lg border border-[#d4c5a3] mb-8 flex gap-4 justify-center">
            {["all", "locked", "unlocked", "draft"].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-4 py-2 rounded-full capitalize transition-colors ${
                  filter === type
                    ? "bg-[#c0af8f] text-[#4a3f35]"
                    : "bg-[#d4c5a3] text-[#4a3f35] hover:bg-[#c0af8f]"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Capsules Grid */}
          {filteredCapsules.length === 0 ? (
            <div className="text-center py-12">
              <VintageContainer padding="p-8">
                <p
                  className="text-2xl text-[#A0522D] italic"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  No capsules found.
                </p>
                <p className="text-lg text-[#8B4513] mt-4">
                  Start preserving your precious memories today!
                </p>
              </VintageContainer>
            </div>
          ) : (
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCapsules.map((cap) => {
                const { status, date, dateLabel } = getCapsuleStatus(cap);

                return (
                  <div
                    key={cap._id}
                    onClick={() => handleCardClick(cap)}
                    className="bg-gradient-to-br from-[#fefcf8] via-[#fdf9f4] to-[#f8f3ec] rounded-2xl shadow-xl border-4 border-[#e8d5b7] overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:border-[#CD853F] cursor-pointer"
                  >
                    <figure className="w-full h-48 overflow-hidden">
                      <img
                        className="w-full h-full object-cover"
                        src={cap.image || imagePlaceholder}
                        alt={cap.title}
                      />
                    </figure>

                    <div className="p-6">
                      <h3
                        className="text-2xl font-bold mb-3 text-[#8B4513]"
                        style={{ fontFamily: "Georgia, serif" }}
                      >
                        {cap.title}
                      </h3>
                      <p
                        className="text-[#A0522D] text-sm mb-4"
                        style={{ fontFamily: "Georgia, serif" }}
                      >
                        {dateLabel}:{" "}
                        {date ? new Date(date).toLocaleDateString() : "N/A"}
                      </p>
                      <span
                        className={`inline-block mb-4 px-4 py-2 text-sm rounded-full capitalize font-semibold ${
                          status === "locked"
                            ? "bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white"
                            : status === "unlocked"
                            ? "bg-gradient-to-r from-[#CD853F] to-[#D2691E] text-white"
                            : "bg-gradient-to-r from-[#f5e6b8] to-[#efdaa5] text-[#8B4513] border-2 border-[#CD853F]"
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
                        className="flex items-center justify-center w-8 h-8 bg-[#d4c5a3] text-[#4a3f35] rounded-full hover:bg-[#c0af8f] transition-colors"
                        aria-label="Delete capsule"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default MyCapsules;
