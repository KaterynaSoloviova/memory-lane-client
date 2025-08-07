import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { BASE_URL } from "../config/config";

function MyCapsules() {
  const { user } = useContext(AuthContext);
  const [capsules, setCapsules] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCapsules = async () => {
      try {
        const storedToken = localStorage.getItem("authToken");
        const response = await axios.get(`${BASE_URL}/api/capsules`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });
        setCapsules(response.data);
      } catch (error) {
        console.error("Error fetching user capsules", error);
      }
    };

    fetchCapsules();
  }, []);

  if (!user)
    return (
      <p className="text-center mt-10">Please login to view your capsules.</p>
    );

  const handleDelete = async (id) => {
    const storedToken = localStorage.getItem("authToken");
    try {
      await axios.delete(`${BASE_URL}/api/capsules/${id}`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });
      setCapsules((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Failed to delete capsule", err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">📁 My Capsules</h2>

      {/* ➕ Create Capsule Button */}
      <button
        onClick={() => navigate("/create-capsule")}
        className="mb-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        + Create Capsule
      </button>

      {/* Capsule List */}
      {capsules.length === 0 ? (
        <p>No capsules yet.</p>
      ) : (
        <ul className="list-disc ml-5 space-y-4">
          {capsules.map((cap) => (
            <li key={cap._id} className="border-b pb-3">
              <strong>{cap.title}</strong>
              <br />
              <small>Created by: {cap.createdBy?.username}</small>
              <br />
              <small>
                Participants:{" "}
                {cap.participants?.map((p) => p.username).join(", ") || "None"}
              </small>
              <br />
              <small>Items: {cap.items?.length || 0}</small>
              <br />
              {/*Delete Button for each capsule */}
              <button
                onClick={() => handleDelete(cap._id)}
                className="mt-1 text-red-600 hover:underline text-sm"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyCapsules;
