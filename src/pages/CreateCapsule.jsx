import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:5005/api"; 
function CreateCapsule() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [unlockedDate, setUnlockedDate] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");

  const [capsules, setCapsules] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/capsules`)
      .then((res) => {
        setCapsules(res.data);
      })
      .catch((err) => {
        console.error("Failed to load capsules", err);
      });
  }, []);

  // 👉 Add item to list
  const handleAddItem = () => {
    if (newItem.trim() !== "") {
      setItems((prev) => [...prev, newItem.trim()]);
      setNewItem("");
    }
  };

  // 👉 Submit new capsule (POST)
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

    axios
      .post(`${BASE_URL}/capsules`, newCapsule)
      .then((res) => {
        setMessage("✅ Capsule created successfully!");
        setTitle("");
        setDescription("");
        setUnlockedDate("");
        setIsPublic(false);
        setItems([]);
        setCapsules((prev) => [...prev, res.data]);
      })
      .catch((err) => {
        console.error("Failed to create capsule", err);
        setMessage("❌ Error creating capsule.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 mt-8 bg-yellow-50 font-retro rounded shadow-lg">
      <h2 className="text-3xl font-bold mb-4">📦 Create Time Capsule</h2>

      {message && <p className="mb-4">{message}</p>}

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

        <div>
          <label className="block font-medium">Add Items</label>
          <div className="flex gap-2">
            <input
              className="flex-grow border rounded px-3 py-2"
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="Type memory or note"
            />
            <button
              type="button"
              onClick={handleAddItem}
              className="bg-gray-700 text-white px-3 py-2 rounded hover:bg-gray-800"
            >
              Add
            </button>
          </div>
          <ul className="list-disc ml-5 mt-2">
            {items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800"
        >
          {loading ? "Creating..." : "Create Capsule"}
        </button>
      </form>

      {/* Demo display of all capsules */}
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
