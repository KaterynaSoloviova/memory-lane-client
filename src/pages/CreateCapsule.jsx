import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { BASE_URL } from "../config/config";
import { AuthContext } from "../contexts/AuthContext";
import TiptapEditor from "../components/TiptapEditor";
import { useNavigate, useParams } from "react-router-dom";

function CreateCapsule() {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [image, setImage] = useState(""); // Capsule image URL
  const [description, setDescription] = useState("");
  const [unlockedDate, setUnlockedDate] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLocked, setIsLocked] = useState(false);
  const [participants, setParticipants] = useState([]);

  const [itemType, setItemType] = useState("text");
  const [textContent, setTextContent] = useState("");

  const [imageUrl, setImageUrl] = useState("");
  const [imageDescription, setImageDescription] = useState("");

  const [newParticipant, setNewParticipant] = useState("");
  const [participantError, setParticipantError] = useState("");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    if (id) {
      const fetchCapsule = async () => {
        setLoading(true);
        setError("");
        try {
          const token = localStorage.getItem("authToken");
          const res = await axios.get(`${BASE_URL}/api/capsules/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const cap = res.data;
          setTitle(cap.title || "");
          setImage(cap.image || ""); // Load existing capsule image
          setDescription(cap.description || "");
          setUnlockedDate(
            cap.unlockedDate ? cap.unlockedDate.slice(0, 10) : ""
          );
          setIsPublic(!!cap.isPublic);
          setIsLocked(!!cap.isLocked);
          setItems(cap.items || []);
          setLoading(false);
          setParticipants(cap.emails || []);
        } catch (err) {
          setError("Failed to load capsule data.");
          setLoading(false);
          console.error(err);
        }
      };
      fetchCapsule();
    }
  }, [id]);

  if (!user) {
    return (
      <p className="text-center mt-10">Please login to create a capsule.</p>
    );
  }

  if (isLocked) {
    navigate(`/capsule/${id}`);
  }

  // --- Cloudinary Upload ---
  const handleCloudinaryUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "wombat-kombat");

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dtjylc9ny/image/upload",
        formData
      );
      return res.data.secure_url;
    } catch (err) {
      console.error("Cloudinary upload failed", err);
      setError("Image upload failed");
      return "";
    }
  };

  // const handleImageFileSelect = async (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const uploadedUrl = await handleCloudinaryUpload(file);
  //     if (uploadedUrl) {
  //       setItems((prev) => [
  //         ...prev,
  //         { type: "image", url: uploadedUrl, description: "" },
  //       ]);
  //     }
  //   }
  // };

  const handleAddParticipant = () => {
    if (!emailRegex.test(newParticipant.trim())) {
      setParticipantError("Please enter a valid email address.");
      return;
    }
    if (participants.includes(newParticipant.trim())) {
      setParticipantError("This email is already added.");
      return;
    }
    setParticipants((prev) => [...prev, newParticipant.trim()]);
    setNewParticipant("");
    setParticipantError("");
  };

  const handleRemoveParticipant = (index) => {
    setParticipants((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddItem = () => {
    if (itemType === "text" && textContent.trim() !== "") {
      setItems((prev) => [...prev, { type: "text", content: textContent }]);
      setTextContent("");
    } else if (itemType === "image" && imageUrl.trim() !== "") {
      setItems((prev) => [
        ...prev,
        {
          type: "image",
          url: imageUrl.trim(),
          description: imageDescription.trim(),
        },
      ]);
      setImageUrl("");
      setImageDescription("");
    }
  };

  const handleDeleteItem = (index) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    setLoading(true);
    setMessage("");
    setError("");

    const storedToken = localStorage.getItem("authToken");

    const capsuleData = {
      title,
      image,
      description,
      unlockedDate,
      emails: participants,
      isPublic,
      items,
    };

    try {
      if (id) {
        await axios.put(`${BASE_URL}/api/capsules/${id}`, capsuleData, {
          headers: { Authorization: `Bearer ${storedToken}` },
        });
        setMessage("Capsule updated successfully!");
        navigate(`/capsules`);
      } else {
        const res = await axios.post(`${BASE_URL}/api/capsules`, capsuleData, {
          headers: { Authorization: `Bearer ${storedToken}` },
        });
        const createdId = res.data._id;
        if (createdId) {
          navigate(`/create-capsule/${createdId}`);
        }
        setMessage("Capsule created successfully!");
      }
    } catch (err) {
      setError("Failed to save capsule.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePreview = () => {
    if (id) {
      navigate(`/preview/${id}`);
    } else {
      alert("Please save the capsule before previewing.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 mt-8 bg-yellow-50 font-retro rounded shadow-lg">
      <h2 className="text-3xl font-bold mb-4">
        📦 {id ? "Edit" : "Create"} Time Capsule
      </h2>

      {error && <p className="mb-4 text-center text-red-600">{error}</p>}
      {message && <p className="mb-4 text-center text-green-600">{message}</p>}

      {loading && <p className="mb-4 text-center">Loading...</p>}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
        className="space-y-4"
      >
        {/* Title */}
        <div>
          <label className="block font-medium">Title</label>
          <input
            className="w-full border rounded px-3 py-2"
            type="text"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Capsule Image Upload */}
        <label className="block font-medium">Capsule Image</label>
        <input
          type="file"
          onChange={async (e) => {
            const url = await handleCloudinaryUpload(e.target.files[0]);
            setImage(url);
          }}
        />
        {image && (
          <img
            src={image}
            alt="Capsule"
            className="mt-2 max-h-40 object-contain rounded border"
          />
        )}

        {/* Description */}
        <div>
          <label className="block font-medium">Description</label>
          <textarea
            className="w-full border rounded px-3 py-2"
            value={description}
            required
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Unlock Date */}
        <div>
          <label className="block font-medium">Unlock Date</label>
          <input
            className="w-full border rounded px-3 py-2"
            type="date"
            value={unlockedDate}
            required
            onChange={(e) => setUnlockedDate(e.target.value)}
          />
        </div>

        {/* Public Toggle */}
        <div>
          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              checked={isPublic}
              onChange={() => setIsPublic(!isPublic)}
            />
            <span>Make Public</span>
          </label>
        </div>

        {/* Add Participants */}
        <div className="mt-6">
          <label className="block font-medium mb-1">Participants</label>
          <div className="flex gap-2">
            <input
              type="email"
              className="w-full border rounded px-3 py-2"
              placeholder="Enter participant email"
              value={newParticipant}
              onChange={(e) => setNewParticipant(e.target.value)}
            />
            <button
              type="button"
              onClick={handleAddParticipant}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Add
            </button>
          </div>
          {participantError && (
            <p className="text-red-600 mt-1">{participantError}</p>
          )}

          <ul className="mt-2 space-y-1">
            {participants.map((p, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center bg-white p-2 rounded shadow"
              >
                {p}
                <button
                  type="button"
                  onClick={() => handleRemoveParticipant(idx)}
                  className="text-red-600 hover:text-red-800"
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Add Items */}
        <div>
          <label className="block font-medium mb-1">Select Item Type</label>
          <select
            className="border rounded px-3 py-2 w-full"
            value={itemType}
            onChange={(e) => setItemType(e.target.value)}
          >
            <option value="text">Text</option>
            <option value="image">Image</option>
          </select>
        </div>

        {itemType === "text" && (
          <div className="mt-4">
            <label className="block font-medium mb-1">Insert Text</label>
            <TiptapEditor content={textContent} onChange={setTextContent} />
          </div>
        )}

        {itemType === "image" && (
          <div className="mt-4 space-y-2">
            <label className="block font-medium">Image URL</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              placeholder="Paste image URL here"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
            <label className="block font-medium">Description</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              placeholder="Image description"
              value={imageDescription}
              onChange={(e) => setImageDescription(e.target.value)}
            />
          </div>
        )}

        <button
          type="button"
          onClick={handleAddItem}
          className="mt-3 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          ➕ Add Item
        </button>

        {/* Items List */}
        <div className="mt-6 space-y-4">
          {items.length === 0 ? (
            <p className="text-center text-gray-500">No items added yet.</p>
          ) : (
            items.map((item, idx) => (
              <div
                key={idx}
                className="border rounded-lg bg-white shadow-md p-4 flex flex-col items-center relative"
              >
                {/* Delete button */}
                <button
                  type="button"
                  onClick={() => handleDeleteItem(idx)}
                  className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                >
                  ❌
                </button>

                {item.type === "text" && (
                  <div
                    className="prose max-w-full"
                    dangerouslySetInnerHTML={{ __html: item.content }}
                  />
                )}

                {item.type === "image" && (
                  <>
                    <img
                      src={item.url}
                      alt={item.description || "Image"}
                      className="max-w-full rounded mb-2"
                    />
                    <p className="italic text-gray-600 text-center">
                      {item.description || "No description"}
                    </p>
                  </>
                )}
              </div>
            ))
          )}
        </div>

        <div className="flex gap-4 mt-6">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800"
          >
            {loading ? "Saving..." : "Save"}
          </button>

          <button
            type="button"
            onClick={handlePreview}
            disabled={!id || loading}
            className={`px-6 py-2 rounded border ${
              id && !loading
                ? "border-green-600 text-green-600 hover:bg-green-100 cursor-pointer"
                : "text-gray-400 border-gray-400 cursor-not-allowed"
            }`}
          >
            Preview
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateCapsule;
