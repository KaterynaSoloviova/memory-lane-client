import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { BASE_URL } from "../config/config";
import { isDraft, isLocked, isOwner } from "../utils/validators";
import { VintageDecorations, VintageOrnament, VintageContainer, vintageClasses } from "../utils/vintageStyles.jsx";
import Countdown from "../components/Countdown";
import SlideShow from "../components/SlideShow";
import CommentSection from "../components/CommentSection";
import { Trash2, Lock } from "lucide-react";


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
      <main className={vintageClasses.pageContainer}>
        <VintageDecorations />
        
        <section className="relative z-10 px-6 py-16">
          <div className="max-w-3xl mx-auto">
            <VintageContainer className="text-center">
              <VintageOrnament symbol="🔒" />
              <h2 className="text-4xl font-bold mb-8 text-[#8B4513]" style={{fontFamily: 'Georgia, serif'}}>{capsule.title}</h2>
              <p className="text-xl text-[#A0522D] mb-8 italic" style={{fontFamily: 'Georgia, serif'}}>This capsule is locked until:</p>
              <Countdown unlockDate={capsule.unlockedDate} />
              <VintageOrnament size="sm" symbol="✦" />
            </VintageContainer>
          </div>
        </section>
      </main>
    );
  }

  const items = capsule.items || [];
  const backgroundMusic =
    capsule.backgroundMusic || "/music/presentation-music-1.mp3";

  return (
    <main className={vintageClasses.pageContainer}>
      <VintageDecorations />
      
      <section className="relative z-10 px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <VintageContainer className="text-center mb-8">
            <VintageOrnament symbol="🔓" />
            <h1 className="text-5xl font-bold mb-6 text-[#8B4513] tracking-wide" style={{fontFamily: 'Georgia, serif'}}>{capsule.title}</h1>
            <p className="text-xl text-[#A0522D] leading-relaxed italic" style={{fontFamily: 'Georgia, serif'}}>{capsule.description}</p>
            <VintageOrnament size="sm" symbol="✦" />
          </VintageContainer>

          {items.length > 0 ? (
            <div className="mb-8">
              <SlideShow
                items={items}
                autoplay
                interval={capsule.slideshowTimeout || 5000}
                backgroundMusic={`/music/${backgroundMusic}`}
              />
            </div>
          ) : (
            <VintageContainer padding="p-8" className="text-center mb-8">
              <p className="text-2xl text-[#A0522D] italic" style={{fontFamily: 'Georgia, serif'}}>No items to display.</p>
            </VintageContainer>
          )}

          <div className="mb-8">
            <CommentSection capsuleId={capsule._id}/>
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
                      .catch((err) => console.error("Error deleting capsule:", err));
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
                      .catch((err) => console.error("Error locking capsule:", err));
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
