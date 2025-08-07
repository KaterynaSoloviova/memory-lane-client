import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../config/config";

function CapsuleDetails() {
  const { id } = useParams();

  const [capsule, setCapsule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bgMusicFile, setBgMusicFile] = useState(null);
  const [voiceFile, setVoiceFile] = useState(null);
  const [message, setMessage] = useState("");
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    async function fetchCapsule() {
      try {
        const res = await axios.get(`${BASE_URL}/api/capsules/${id}`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });
        setCapsule(res.data);
        setLocked(res.data.locked);
      } catch (err) {
        setMessage("Failed to load capsule.");
      } finally {
        setLoading(false);
      }
    }
    fetchCapsule();
  }, [id]);

  async function uploadFile(file) {
    // Replace this with your actual file upload logic
    return new Promise((resolve) => {
      setTimeout(() => resolve(URL.createObjectURL(file)), 1000);
    });
  }

  const handleSave = async () => {
    setMessage("");
    try {
      let bgMusicUrl = capsule.bgMusicUrl;
      let voiceUrl = capsule.voiceRecordingUrl;

      if (bgMusicFile) {
        bgMusicUrl = await uploadFile(bgMusicFile);
      }
      if (voiceFile) {
        voiceUrl = await uploadFile(voiceFile);
      }

      const storedToken = localStorage.getItem("authToken");
      await axios.patch(
        `${BASE_URL}/api/capsules/${id}`,
        {
          bgMusicUrl,
          voiceRecordingUrl: voiceUrl,
          title: capsule.title,
          description: capsule.description,
          unlockedDate: capsule.unlockedDate,
        },
        { headers: { Authorization: `Bearer ${storedToken}` } }
      );

      setMessage("Capsule updated!");
      setCapsule((prev) => ({
        ...prev,
        bgMusicUrl,
        voiceRecordingUrl: voiceUrl,
      }));
    } catch (err) {
      setMessage("Failed to save changes.");
    }
  };

  const handleLock = async () => {
    try {
      const storedToken = localStorage.getItem("authToken");
      await axios.patch(
        `${BASE_URL}/api/capsules/${id}`,
        { locked: true },
        { headers: { Authorization: `Bearer ${storedToken}` } }
      );
      setLocked(true);
      setMessage("Capsule locked. No more changes allowed.");
    } catch (err) {
      setMessage("Failed to lock capsule.");
    }
  };

  if (loading) return <p>Loading capsule...</p>;
  if (!capsule) return <p>Capsule not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 mt-8 bg-yellow-50 font-retro rounded shadow-lg">
      <h2 className="text-3xl font-bold mb-4">Capsule Details</h2>

      {message && <p className="mb-4 text-center">{message}</p>}

      <label className="block font-medium">Title</label>
      <input
        type="text"
        className="w-full border rounded px-3 py-2 mb-4"
        value={capsule.title}
        onChange={(e) => setCapsule({ ...capsule, title: e.target.value })}
        disabled={locked}
      />

      <label className="block font-medium">Description</label>
      <textarea
        className="w-full border rounded px-3 py-2 mb-4"
        value={capsule.description}
        onChange={(e) =>
          setCapsule({ ...capsule, description: e.target.value })
        }
        disabled={locked}
      />

      <label className="block font-medium">Unlock Date</label>
      <input
        type="date"
        className="w-full border rounded px-3 py-2 mb-4"
        value={capsule.unlockedDate.split("T")[0]}
        onChange={(e) =>
          setCapsule({ ...capsule, unlockedDate: e.target.value })
        }
        disabled={locked}
      />

      <div className="mb-4">
        <p className="font-medium mb-1">Background Music</p>
        <input
          type="file"
          accept="audio/*"
          disabled={locked}
          onChange={(e) => setBgMusicFile(e.target.files[0])}
        />
        {bgMusicFile && <p>Selected: {bgMusicFile.name}</p>}
        {!bgMusicFile && capsule.bgMusicUrl && (
          <audio controls src={capsule.bgMusicUrl} className="w-full mt-2" />
        )}
      </div>

      <div className="mb-4">
        <p className="font-medium mb-1">Voice Recording</p>
        <input
          type="file"
          accept="audio/*"
          disabled={locked}
          onChange={(e) => setVoiceFile(e.target.files[0])}
        />
        {voiceFile && <p>Selected: {voiceFile.name}</p>}
        {!voiceFile && capsule.voiceRecordingUrl && (
          <audio
            controls
            src={capsule.voiceRecordingUrl}
            className="w-full mt-2"
          />
        )}
      </div>

      <div className="mb-4">
        <p className="font-medium mb-2">Capsule Items</p>
        {capsule.items.map((item, idx) => (
          <div key={idx} className="border p-3 rounded mb-2 bg-white">
            {item.type === "text" ? (
              <div
                className="prose"
                dangerouslySetInnerHTML={{ __html: item.content }}
              />
            ) : (
              <>
                <img
                  src={item.url}
                  alt={item.description || "Image"}
                  className="max-w-full rounded"
                />
                <p className="italic text-gray-600">
                  {item.description || "No description"}
                </p>
              </>
            )}
          </div>
        ))}
      </div>

      {!locked && (
        <>
          <button
            onClick={handleSave}
            className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800 mr-4"
          >
            Save Changes
          </button>
          <button
            onClick={handleLock}
            className="bg-red-700 text-white px-6 py-2 rounded hover:bg-red-800"
          >
            Lock Capsule
          </button>
        </>
      )}

      {locked && (
        <p className="text-center text-red-600 font-bold mt-4">
          This capsule is locked and cannot be edited.
        </p>
      )}
    </div>
  );
}

export default CapsuleDetails;
