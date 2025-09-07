import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Library, Unlock } from "lucide-react";
import { BASE_URL } from "../config/config";
import { VintageDecorations, VintageOrnament, VintageContainer, vintageClasses } from "../utils/vintageStyles.jsx";
import imagePlaceholder from "../assets/image-placeholder.jpg";

function PublicCapsulesPage() {
  const [capsules, setCapsules] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/public`)
      .then((res) => setCapsules(res.data))
      .catch((err) => console.error("Error fetching public capsules:", err));
  }, []);

  return (
    <main className={vintageClasses.pageContainer}>
      <VintageDecorations />
      
      <section className="relative z-10 px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <VintageContainer className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <Library className="w-16 h-16 text-[#CD853F]" />
            </div>
            <h1 className="text-5xl font-bold mb-6 text-[#8B4513] tracking-wide" style={{fontFamily: 'Georgia, serif'}}>Public Capsules</h1>
            <p className="text-xl text-[#A0522D] italic leading-relaxed" style={{fontFamily: 'Georgia, serif'}}>
              Discover memories shared by the community
            </p>
            <VintageOrnament size="sm" symbol="✦" />
          </VintageContainer>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {capsules.map((capsule) => (
              <div
                key={capsule._id}
                className="bg-gradient-to-br from-[#fefcf8] via-[#fdf9f4] to-[#f8f3ec] rounded-2xl shadow-xl border-4 border-[#e8d5b7] overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:border-[#CD853F]"
                onClick={() => navigate(`/public/${capsule._id}`)}
              >
                <img
                  src={capsule.image || imagePlaceholder}
                  alt={capsule.title}
                  className="h-48 w-full object-cover transition-all duration-300 filter sepia-[0.8] contrast-[1.1] brightness-[0.9] saturate-[0.8] hover:sepia-0 hover:contrast-100 hover:brightness-100 hover:saturate-100"
                />
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-3 text-[#8B4513]" style={{fontFamily: 'Georgia, serif'}}>{capsule.title}</h2>
                  <p className="text-[#A0522D] text-sm flex items-center gap-2" style={{fontFamily: 'Georgia, serif'}}>
                    <Unlock className="w-4 h-4" />
                    Unlocked date: {new Date(capsule.unlockedDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default PublicCapsulesPage;
