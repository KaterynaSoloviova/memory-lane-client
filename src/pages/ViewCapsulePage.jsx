import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { BASE_URL } from "../config/config";
import { isDraft, isLocked, isOwner } from "../utils/validators";
import {
  VintageDecorations,
  VintageOrnament,
  VintageContainer,
  vintageClasses,
} from "../utils/vintageStyles.jsx";
import Countdown from "../components/Countdown";
import SlideShow from "../components/SlideShow";
import CommentSection from "../components/CommentSection";
import VintageLoader from "../components/VintageLoader";
import { Trash2, Lock } from "lucide-react";
import { Unlock } from "lucide-react";

function ViewCapsulePage() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [capsule, setCapsule] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if this is a public capsule view
  const isPublicView = location.pathname.startsWith('/public/');

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
    return (
      <main className={vintageClasses.pageContainer}>
        <VintageDecorations />
        <section className="relative z-10 px-6 py-16">
          <div className="max-w-4xl mx-auto">
            <VintageLoader 
              size="lg" 
              message="Opening time capsule..."
            />
          </div>
        </section>
      </main>
    );
  }

  if (isLocked(capsule)) {
    return (
      <main className={vintageClasses.pageContainer}>
        <VintageDecorations />

        <section className="relative z-10 px-6 py-16">
          <div className="max-w-3xl mx-auto">
            <VintageContainer className="text-center">
              <VintageOrnament symbol="🔒" />
              <h2
                className="text-4xl font-bold mb-8 text-[#8B4513]"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {capsule.title}
              </h2>
              <p
                className="text-xl text-[#A0522D] mb-8 italic"
                style={{ fontFamily: "Georgia, serif" }}
              >
                This capsule is locked until:
              </p>
              <Countdown unlockDate={capsule.unlockedDate} />
              <VintageOrnament size="sm" symbol="✦" />
            </VintageContainer>
          </div>
        </section>
      </main>
    );
  }

  const items = capsule.items || [];
  const backgroundMusic = capsule.backgroundMusic; // Only custom audio URLs now

  return (
    <main className={vintageClasses.pageContainer}>
      <VintageDecorations />

      <section className="relative z-10 px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <VintageContainer className="text-center mb-6 w-full px-8 py-4">
            <div className="flex justify-center mb-3">
              <Unlock size={32} className="text-[#8B4513]" />
            </div>

            <h1
              className="text-3xl font-bold mb-3 text-[#8B4513] tracking-wide"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {capsule.title}
            </h1>
            <p
              className="text-lg text-[#A0522D] italic leading-snug"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {capsule.description}
            </p>
            <VintageOrnament size="sm" symbol="✦" />
          </VintageContainer>

          {items.length > 0 ? (
            <div className="mb-8 w-full aspect-[21/9]">
              <SlideShow
                items={items}
                autoplay
                interval={capsule.slideshowTimeout || 5000}
                backgroundMusic={backgroundMusic}
                className="w-full h-full"
              />
            </div>
          ) : (
            <VintageContainer padding="p-8" className="text-center mb-8">
              <p
                className="text-2xl text-[#A0522D] italic"
                style={{ fontFamily: "Georgia, serif" }}
              >
                No items to display.
              </p>
            </VintageContainer>
          )}

          <div className="mb-8">
            <CommentSection capsuleId={capsule._id} isPublicView={isPublicView} />
          </div>

          {editMode && (
            <div className="mb-4 flex items-center justify-center gap-4 bg-[#f9f5e8] p-3 rounded-lg border border-[#d4c5a3]">
              <div className="flex gap-6 justify-center">
                <button
                  onClick={() => {
                    const token = localStorage.getItem("authToken");
                    axios
                      .delete(`${BASE_URL}/api/capsules/${id}`, {
                        headers: { Authorization: `Bearer ${token}` },
                      })
                      .then(() => navigate("/capsules"))
                      .catch((err) =>
                        console.error("Error deleting capsule:", err)
                      );
                  }}
                  className="flex items-center gap-2 bg-[#d4c5a3] text-[#4a3f35] px-4 py-2 rounded-full hover:bg-[#c0af8f] transition-colors"
                >
                  <Trash2 size={18} />
                  Delete Capsule
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
                      .catch((err) =>
                        console.error("Error locking capsule:", err)
                      );
                  }}
                  className="flex items-center gap-2 bg-[#d4c5a3] text-[#4a3f35] px-4 py-2 rounded-full hover:bg-[#c0af8f] transition-colors"
                >
                  <Lock size={18} />
                  Lock Capsule
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default ViewCapsulePage;
