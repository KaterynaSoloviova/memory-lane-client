import { useState, useContext } from "react";
import axios from "axios";
import { BASE_URL } from "../config/config";
import { AuthContext } from "../contexts/AuthContext";
import TiptapEditor from "../components/TiptapEditor";
import { useNavigate } from "react-router-dom";

function CreateCapsule() {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [unlockedDate, setUnlockedDate] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [items, setItems] = useState([]);
  const [richText, setRichText] = useState("");

  const [capsules, setCapsules] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [itemType, setItemType] = useState("text");
  const [textContent, setTextContent] = useState("");

  const [imageUrl, setImageUrl] = useState("");
  const [imageDescription, setImageDescription] = useState("");

  const navigate = useNavigate();

  if (!user) {
    return (
      <p className="text-center mt-10">Please login to create a capsule.</p>
    );
  }

  // Submit capsule
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const newCapsule = {
      title,
      description,
      unlockedDate,
      isPublic,
      items,
    };

    const storedToken = localStorage.getItem("authToken");

    axios
  .post(`${BASE_URL}/api/capsules`, newCapsule, {
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  })
  .then((res) => {
    const createdId = res.data._id;
    if (createdId) {
      navigate(`/capsules/${createdId}`);
    } else {
      console.error("Capsule created but no ID returned:", res.data);
      setMessage("Capsule created, but can't navigate.");
    }
  })
  .catch((err) => {
    console.error("Failed to create capsule", err);
    setMessage("Error creating capsule.");
  })
  .finally(() => setLoading(false));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 mt-8 bg-yellow-50 font-retro rounded shadow-lg">
      <h2 className="text-3xl font-bold mb-4">📦 Create Time Capsule</h2>

      {message && <p className="mb-4 text-center">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
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

        {/* Item type selector */}
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

        {/* Conditional fields based on type */}
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

        {/* Add Item Button */}
        <button
          type="button"
          onClick={() => {
            if (itemType === "text" && textContent.trim() !== "") {
              setItems((prev) => [
                ...prev,
                { type: "text", content: textContent },
              ]);
              setTextContent("");
            }
            if (itemType === "image" && imageUrl.trim() !== "") {
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
          }}
          className="mt-3 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          ➕ Add Item
        </button>

        {/* Items Preview Cards */}
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

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800"
        >
          {loading ? "Creating..." : "Create Capsule"}
        </button>
      </form>

      {/* Preview of created capsules */}
      {capsules.length > 0 && (
        <div className="mt-10">
          <h3 className="text-xl font-bold mb-2">🎩 Existing Capsules</h3>
          <ul className="list-disc ml-5">
            {capsules.map((cap) => (
              <li key={cap._id}>{cap.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CreateCapsule;
