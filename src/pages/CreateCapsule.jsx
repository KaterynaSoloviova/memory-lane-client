import { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { BASE_URL } from "../config/config";
import { AuthContext } from "../contexts/AuthContext";
import TiptapEditor from "../components/TiptapEditor";
import { useNavigate, useParams } from "react-router-dom";
import { memoryStyles } from "../utils/styles";
import {
  Trash2,
  Plus,
  ChevronUp,
  ChevronDown,
  X,
  Play,
  Pause,
  Volume2,
} from "lucide-react";

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

  const [textContent, setTextContent] = useState("");

  const [newParticipant, setNewParticipant] = useState("");
  const [participantError, setParticipantError] = useState("");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const fileInputRef = useRef(null);

  const [styleKey, setStyleKey] = useState("default");
  const [selectedMusic, setSelectedMusic] = useState("");
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);
  const [previewVolume, setPreviewVolume] = useState(0.5);
  const audioPreviewRef = useRef(null);

  const videoInputRef = useRef(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [videoUploading, setVideoUploading] = useState(false);

  // Available background music options
  const backgroundMusicOptions = [
    {
      id: "presentation-music-1.mp3",
      name: "Presentation Music 1",
      duration: "0:58",
    },
    {
      id: "presentation-music-2.mp3",
      name: "Presentation Music 2",
      duration: "1:49",
    },
    {
      id: "presentation-music-3.mp3",
      name: "Presentation Music 3",
      duration: "1:12",
    },
    {
      id: "promo-music-1.mp3",
      name: "Promo Music 1",
      duration: "1:06",
    },
  ];

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
          setParticipants(cap.emails || []);
          setSelectedMusic(cap.backgroundMusic || "");
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

  const handleCloudinaryVideoUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "wombat-kombat");

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dtjylc9ny/video/upload",
        formData
      );
      return res.data.secure_url;
    } catch (err) {
      console.error("Cloudinary video upload failed", err);
      setError("Video upload failed");
      return "";
    }
  };

  const handleVideoClick = () => {
    videoInputRef.current?.click();
  };

  const handleVideoChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      setVideoUploading(true);
      try {
        const uploadedUrl = await handleCloudinaryVideoUpload(
          e.target.files[0]
        );
        if (uploadedUrl) {
          setItems((prev) => [
            ...prev,
            { type: "video", content: uploadedUrl },
          ]);
          setVideoPreview(uploadedUrl);
        }
      } catch (error) {
        console.error("Video upload failed", error);
      } finally {
        setVideoUploading(false);
      }
      e.target.value = null;
    }
  };

  const handleClearVideo = () => {
    setVideoPreview(null);
  };
  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const url = await handleCloudinaryUpload(e.target.files[0]);
      setImage(url);
    }
  };

  const handleClear = () => {
    setImage("");
    // Optionally also clear file input value to allow re-upload of same file
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

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
    if (!textContent.trim()) return;
    setItems((prev) => [
      ...prev,
      {
        type: "text",
        content: textContent,
        style: styleKey || "default",
      },
    ]);
    setTextContent("");
  };

  const handleAddVideoItem = () => {
    if (!newVideoUrl.trim()) {
      alert("Please enter a video URL");
      return;
    }

    setItems((prev) => [
      ...prev,
      {
        type: "video",
        content: newVideoUrl.trim(), // direct link or embed URL
      },
    ]);

    setNewVideoUrl(""); // clear the input
  };

  const handleDeleteItem = (index) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleMoveItemUp = (index) => {
    if (index > 0) {
      setItems((prev) => {
        const newItems = [...prev];
        [newItems[index], newItems[index - 1]] = [
          newItems[index - 1],
          newItems[index],
        ];
        return newItems;
      });
    }
  };

  const handleMoveItemDown = (index) => {
    if (index < items.length - 1) {
      setItems((prev) => {
        const newItems = [...prev];
        [newItems[index], newItems[index + 1]] = [
          newItems[index + 1],
          newItems[index],
        ];
        return newItems;
      });
    }
  };

  // Audio preview functions
  const toggleMusicPreview = () => {
    if (audioPreviewRef.current) {
      if (isPlayingPreview) {
        audioPreviewRef.current.pause();
        setIsPlayingPreview(false);
      } else {
        // Stop any currently playing audio
        if (audioPreviewRef.current.src) {
          audioPreviewRef.current.pause();
          audioPreviewRef.current.currentTime = 0;
        }
        // Set new source and play
        audioPreviewRef.current.src = `/music/${selectedMusic}`;
        audioPreviewRef.current.play();
        setIsPlayingPreview(true);
      }
    }
  };

  const handlePreviewVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setPreviewVolume(newVolume);
    if (audioPreviewRef.current) {
      audioPreviewRef.current.volume = newVolume;
    }
  };

  // Stop preview when music selection changes
  useEffect(() => {
    if (audioPreviewRef.current && isPlayingPreview) {
      audioPreviewRef.current.pause();
      setIsPlayingPreview(false);
    }
  }, [selectedMusic]);

  // Cleanup audio on component unmount
  useEffect(() => {
    return () => {
      if (audioPreviewRef.current) {
        audioPreviewRef.current.pause();
      }
    };
  }, []);

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
      backgroundMusic: selectedMusic,
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

        <div>
          <label className="block font-medium mb-1">Capsule Image</label>

          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleChange}
          />

          <div
            onClick={handleClick}
            className="cursor-pointer w-40 h-40 border border-dashed border-gray-400 rounded flex items-center justify-center overflow-hidden"
            title="Click to upload image"
          >
            {image ? (
              <img
                src={image}
                alt="Capsule"
                className="object-contain w-full h-full"
              />
            ) : (
              <div className="text-gray-400 text-center px-2">
                Click here to upload capsule image
              </div>
            )}
          </div>
          {image && (
            <button
              type="button"
              onClick={handleClear}
              className="mt-2 text-sm text-red-600 hover:underline"
            >
              Clear Image
            </button>
          )}
        </div>

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
              <Plus size={18} />
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
                  <Trash2 size={16} />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Choose style */}
        <div>
          <label className="block font-medium mb-1">Choose style</label>
          <div className="grid grid-cols-5 gap-2">
            {Object.keys(memoryStyles).map((key) => {
              const s = memoryStyles[key];
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setStyleKey(key)}
                  className={`border rounded overflow-hidden p-1 relative ${
                    styleKey === key ? "ring-4 ring-yellow-300" : ""
                  }`}
                  aria-pressed={styleKey === key}
                >
                  <div
                    className="w-28 h-16"
                    style={{
                      backgroundImage: s.backgroundImage,
                      backgroundSize: "100% 100%",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      opacity: 0.7,
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-black drop-shadow-lg">
                    {s.label}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Background Music Selection */}
        <div>
          <label className="block font-medium mb-1">Background Music</label>

          {/* Audio Preview Element */}
          <audio ref={audioPreviewRef} preload="metadata" />

          <div className="grid grid-cols-2 gap-3">
            {backgroundMusicOptions.map((music) => (
              <button
                key={music.id}
                type="button"
                onClick={() => setSelectedMusic(music.id)}
                className={`border rounded-lg p-3 text-left transition-all ${
                  selectedMusic === music.id
                    ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200"
                    : "border-gray-300 bg-white hover:border-gray-400 hover:bg-gray-50"
                }`}
              >
                <div className="font-medium text-gray-900">{music.name}</div>
                <div className="text-sm text-gray-500">{music.duration}</div>
                {selectedMusic === music.id && (
                  <div className="mt-2 text-blue-600 text-sm font-medium">
                    ✓ Selected
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Music Preview Controls */}
          {selectedMusic && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm font-medium text-gray-700">
                  Preview:{" "}
                  {
                    backgroundMusicOptions.find((m) => m.id === selectedMusic)
                      ?.name
                  }
                </div>
                <button
                  type="button"
                  onClick={toggleMusicPreview}
                  disabled={!selectedMusic}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                    isPlayingPreview
                      ? "bg-red-500 text-white hover:bg-red-600"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  {isPlayingPreview ? <Pause size={16} /> : <Play size={16} />}
                  {isPlayingPreview ? "Stop" : "Play Preview"}
                </button>
              </div>

              {/* Volume Control */}
              <div className="flex items-center gap-2">
                <Volume2 size={16} className="text-gray-600" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={previewVolume}
                  onChange={handlePreviewVolumeChange}
                  className="flex-1 h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${
                      previewVolume * 100
                    }%, #e5e7eb ${previewVolume * 100}%, #e5e7eb 100%)`,
                  }}
                />
                <span className="text-sm text-gray-600 w-8 text-right">
                  {Math.round(previewVolume * 100)}%
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="mt-4">
          <label className="block font-medium mb-1">Insert Text</label>
          <TiptapEditor content={textContent} onChange={setTextContent} />

          <div className="mt-4">
            <label className="block font-medium mb-1">Preview</label>
            <div
              className="p-4 rounded shadow-sm border relative"
              style={{
                backgroundColor:
                  memoryStyles[styleKey]?.backgroundColor ||
                  memoryStyles.default.backgroundColor,
                backgroundImage:
                  memoryStyles[styleKey]?.backgroundImage || "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
                fontFamily:
                  memoryStyles[styleKey]?.fontFamily ||
                  memoryStyles.default.fontFamily,
                fontSize:
                  memoryStyles[styleKey]?.fontSize ||
                  memoryStyles.default.fontSize,
                color:
                  memoryStyles[styleKey]?.color || memoryStyles.default.color,
                minHeight: "400px",
                whiteSpace: "pre-wrap",
                overflowWrap: "break-word",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <div
                dangerouslySetInnerHTML={{ __html: textContent }}
                style={{
                  maxWidth: "80%",
                  padding: "20px",
                }}
              />
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleAddItem}
          className="mt-3 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          ➕ Add Item
        </button>

        {/* --- VIDEO UPLOAD --- */}
        <div className="mb-6">
          <label className="block font-medium mb-1">Insert Video</label>

          {/* Hidden file input */}
          <input
            type="file"
            accept="video/*"
            ref={videoInputRef}
            onChange={async (e) => {
              if (e.target.files && e.target.files[0]) {
                setVideoUploading(true);
                setError(""); // clear error on new upload
                try {
                  const uploadedUrl = await handleCloudinaryVideoUpload(
                    e.target.files[0]
                  );
                  if (uploadedUrl) {
                    setItems((prev) => [
                      ...prev,
                      { type: "video", content: uploadedUrl },
                    ]);
                    setVideoPreview(uploadedUrl);
                  }
                } catch (err) {
                  console.error("Video upload failed", err);
                } finally {
                  setVideoUploading(false);
                }
                e.target.value = null; // reset to allow same file again
              }
            }}
            style={{ display: "none" }}
          />

          {/* Upload Button */}
          <button
            type="button"
            onClick={() => videoInputRef.current?.click()}
            disabled={videoUploading}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            {videoUploading ? "Uploading..." : "Upload Video"}
          </button>

          {/* Video Preview */}
          {videoPreview && (
            <div className="mt-4">
              <video width="320" height="240" controls src={videoPreview} />
              <button
                type="button"
                onClick={() => setVideoPreview(null)}
                className="mt-2 text-red-600"
              >
                Remove Preview
              </button>
            </div>
          )}
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

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
                {/* Reorder buttons */}
                <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
                  <button
                    type="button"
                    onClick={() => handleMoveItemUp(idx)}
                    disabled={idx === 0}
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs shadow-sm ${
                      idx === 0
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
                    }`}
                  >
                    <ChevronUp size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMoveItemDown(idx)}
                    disabled={idx === items.length - 1}
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs shadow-sm ${
                      idx === items.length - 1
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
                    }`}
                  >
                    <ChevronDown size={14} />
                  </button>
                </div>

                {/* Delete button */}
                <button
                  type="button"
                  onClick={() => handleDeleteItem(idx)}
                  className="absolute top-3 right-3 bg-red-500 text-white hover:bg-blue-600 rounded-full p-2 shadow-sm z-10 w-6 h-6 flex items-center justify-center"
                >
                  <X size={18} strokeWidth={8} />
                </button>

                <div
                  className="prose max-w-full p-4 rounded relative"
                  style={{
                    backgroundColor:
                      memoryStyles[item.style]?.backgroundColor ||
                      memoryStyles.default.backgroundColor,
                    backgroundImage:
                      memoryStyles[item.style]?.backgroundImage || "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    fontFamily:
                      memoryStyles[item.style]?.fontFamily ||
                      memoryStyles.default.fontFamily,
                    fontSize:
                      memoryStyles[item.style]?.fontSize ||
                      memoryStyles.default.fontSize,
                    color:
                      memoryStyles[item.style]?.color ||
                      memoryStyles.default.color,
                    minHeight: "400px",
                    whiteSpace: "pre-wrap",
                    overflowWrap: "break-word",
                    width: "100%",
                    boxSizing: "border-box",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                  {item.type === "text" && (
                    <div
                      dangerouslySetInnerHTML={{ __html: item.content }}
                      style={{
                        maxWidth: "80%",
                        padding: "15px",
                      }}
                    />
                  )}

                  {item.type === "video" && (
                    <div style={{ maxWidth: "100%" }}>
                      <video
                        src={item.content}
                        controls
                        style={{ width: "100%", borderRadius: "8px" }}
                      />
                    </div>
                  )}
                </div>
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
