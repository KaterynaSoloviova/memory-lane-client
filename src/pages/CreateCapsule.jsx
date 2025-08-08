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
  const [capsuleImage, setCapsuleImage] = useState(""); // Capsule image URL
  const [description, setDescription] = useState("");
  const [unlockedDate, setUnlockedDate] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [itemType, setItemType] = useState("text");
  const [textContent, setTextContent] = useState("");

  const [imageUrl, setImageUrl] = useState("");
  const [imageDescription, setImageDescription] = useState("");

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
          setCapsuleImage(cap.capsuleImage || ""); // Load existing capsule image
          setDescription(cap.description || "");
          setUnlockedDate(cap.unlockedDate ? cap.unlockedDate.slice(0, 10) : "");
          setIsPublic(!!cap.isPublic);
          setItems(cap.items || []);
          setLoading(false);
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

  const handleAddItem = () => {
    if (itemType === "text" && textContent.trim() !== "") {
      setItems((prev) => [...prev, { type: "text", content: textContent }]);
      setTextContent("");
    } else if (itemType === "image" && imageUrl.trim() !== "") {
      setItems((prev) => [
        ...prev,
        { type: "image", url: imageUrl.trim(), description: imageDescription.trim() },
      ]);
      setImageUrl("");
      setImageDescription("");
    }
  };

  const handleSave = async () => {
    setLoading(true);
    setMessage("");
    setError("");

    const storedToken = localStorage.getItem("authToken");

    const capsuleData = {
      title,
      capsuleImage,
      description,
      unlockedDate,
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

        {/* Capsule Image URL */}
        <div>
          <label className="block font-medium">Capsule Image URL</label>
          <input
            className="w-full border rounded px-3 py-2"
            type="text"
            placeholder="Enter image URL for capsule card"
            value={capsuleImage}
            onChange={(e) => setCapsuleImage(e.target.value)}
          />
          {capsuleImage && (
            <img
              src={capsuleImage}
              alt="Capsule Thumbnail Preview"
              className="mt-2 max-h-40 object-contain rounded border"
            />
          )}
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <textarea
            className="w-full border rounded px-3 py-2"
            value={description}
            required
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

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

        <div className="mt-6 space-y-4">
          {items.length === 0 ? (
            <p className="text-center text-gray-500">No items added yet.</p>
          ) : (
            items.map((item, idx) => (
              <div
                key={idx}
                className="border rounded-lg bg-white shadow-md p-4 flex flex-col items-center"
              >
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
