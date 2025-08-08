import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../config/config";

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
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Public Capsules</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {capsules.map((capsule) => (
          <div
            key={capsule._id}
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition"
            onClick={() => navigate(`/public/${capsule._id}`)}
          >
            <img
              src={capsule.items?.find((item) => item.type === "image")?.url || "/placeholder.jpg"}
              alt={capsule.title}
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{capsule.title}</h2>
              <p className="text-gray-500 text-sm">
                Unlocked: {new Date(capsule.unlockedDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PublicCapsulesPage;
