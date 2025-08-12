import { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { BASE_URL } from "../config/config";
import { AuthContext } from "../contexts/AuthContext";
import TiptapEditor from "../components/TiptapEditor";
import { useNavigate, useParams } from "react-router-dom";
import { memoryStyles } from "../utils/styles";
import { VintageDecorations, VintageOrnament, VintageContainer, vintageClasses } from "../utils/vintageStyles.jsx";
import {
  Trash2,
  Plus,
  ChevronUp,
  ChevronDown,
  X,
  Play,
  Pause,
  Volume2,
  Edit,
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

  // Font properties for new items
  const [newItemFontSize, setNewItemFontSize] = useState("16px");
  const [newItemFontFamily, setNewItemFontFamily] = useState("Georgia, serif");
  const [newItemFontColor, setNewItemFontColor] = useState("#8B4513");

  const [newParticipant, setNewParticipant] = useState("");
  const [participantError, setParticipantError] = useState("");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const fileInputRef = useRef(null);

  const [styleKey, setStyleKey] = useState("default");
  const [selectedMusic, setSelectedMusic] = useState("");
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);
  const [previewVolume, setPreviewVolume] = useState(0.5);
  const audioPreviewRef = useRef(null);

  // Slideshow timeout setting
  const [slideshowTimeout, setSlideshowTimeout] = useState(5000);

  const videoInputRef = useRef(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [videoUploading, setVideoUploading] = useState(false);

  // Audio upload state
  const [uploadedAudio, setUploadedAudio] = useState([]);
  const [audioUploading, setAudioUploading] = useState(false);
  const audioInputRef = useRef(null);

  // Edit item state
  const [editingItemIndex, setEditingItemIndex] = useState(null);
  const [editingContent, setEditingContent] = useState("");
  const [editingFontSize, setEditingFontSize] = useState("16px");
  const [editingFontFamily, setEditingFontFamily] = useState("Georgia, serif");
  const [editingFontColor, setEditingFontColor] = useState("#8B4513");

  // Remove default background music options - only custom uploads allowed

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
          setSlideshowTimeout(cap.slideshowTimeout || 5000);
          
          // If backgroundMusic exists, add it to uploadedAudio (all audio is now custom)
          if (cap.backgroundMusic) {
            const customAudio = {
              id: cap.backgroundMusic,
              name: "Custom Audio",
              duration: "Custom",
              isCustom: true,
              url: cap.backgroundMusic
            };
            setUploadedAudio([customAudio]);
          }
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

  const handleCloudinaryAudioUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "wombat-kombat");

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dtjylc9ny/video/upload", // Cloudinary uses video endpoint for audio
        formData
      );
      return res.data.secure_url;
    } catch (err) {
      console.error("Cloudinary audio upload failed", err);
      setError("Audio upload failed");
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

  const handleAudioUpload = async (e) => {
    if (e.target.files && e.target.files[0]) {
      setAudioUploading(true);
      setError("");
      try {
        const uploadedUrl = await handleCloudinaryAudioUpload(e.target.files[0]);
        if (uploadedUrl) {
          const fileName = e.target.files[0].name;
          const newAudio = {
            id: uploadedUrl,
            name: fileName.replace(/\.[^/.]+$/, ""), // Remove file extension
            duration: "Custom",
            isCustom: true,
            url: uploadedUrl
          };
          setUploadedAudio(prev => [...prev, newAudio]);
          setSelectedMusic(uploadedUrl); // Auto-select the uploaded audio
        }
      } catch (error) {
        console.error("Audio upload failed", error);
        setError("Audio upload failed. Please try again.");
      } finally {
        setAudioUploading(false);
      }
      e.target.value = null; // Reset input
    }
  };

  const handleRemoveUploadedAudio = (audioId) => {
    setUploadedAudio(prev => prev.filter(audio => audio.id !== audioId));
    // If the removed audio was selected, clear the selection
    if (selectedMusic === audioId) {
      setSelectedMusic("");
    }
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
        fontSize: newItemFontSize,
        fontFamily: newItemFontFamily,
        fontColor: newItemFontColor,
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

  const handleEditItem = (index) => {
    const item = items[index];
    if (item.type === "text") {
      setEditingItemIndex(index);
      setEditingContent(item.content);
      setEditingFontSize(item.fontSize || "16px");
      setEditingFontFamily(item.fontFamily || "Georgia, serif");
      setEditingFontColor(item.fontColor || "#8B4513");
    }
  };

  const handleSaveEdit = () => {
    if (editingItemIndex !== null) {
      setItems((prev) => {
        const newItems = [...prev];
        newItems[editingItemIndex] = {
          ...newItems[editingItemIndex],
          content: editingContent,
          fontSize: editingFontSize,
          fontFamily: editingFontFamily,
          fontColor: editingFontColor,
        };
        return newItems;
      });
      setEditingItemIndex(null);
      setEditingContent("");
      setEditingFontSize("16px");
      setEditingFontFamily("Georgia, serif");
      setEditingFontColor("#8B4513");
    }
  };

  const handleCancelEdit = () => {
    setEditingItemIndex(null);
    setEditingContent("");
    setEditingFontSize("16px");
    setEditingFontFamily("Georgia, serif");
    setEditingFontColor("#8B4513");
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
        // Set new source and play - all audio is now custom
        audioPreviewRef.current.src = selectedMusic;
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
      slideshowTimeout,
    };

    try {
      if (id) {
        await axios.put(`${BASE_URL}/api/capsules/${id}`, capsuleData, {
          headers: { Authorization: `Bearer ${storedToken}` },
        });
        setMessage("Capsule updated successfully!");
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
    <main className={vintageClasses.pageContainer}>
      <VintageDecorations />

      <section className="relative z-10 px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <VintageContainer className="text-center">
            <VintageOrnament symbol="🕰️" />
            <h2 className="text-5xl font-bold mb-8 text-[#8B4513] tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
              📦 {id ? "Edit" : "Create"} Time Capsule
            </h2>
            <VintageOrnament size="sm" symbol="✦" />

            {error && <p className="mb-4 text-center text-red-600">{error}</p>}
            {message && <p className="mb-4 text-center text-green-600">{message}</p>}

            {loading && <p className="mb-4 text-center text-[#8B4513]">Loading...</p>}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
              className="space-y-6 text-left"
            >
              {/* Title */}
              <div>
                <label className="block font-medium text-[#8B4513] mb-2" style={{ fontFamily: 'Georgia, serif' }}>Title</label>
                <input
                  className="w-full border-2 border-[#e8d5b7] rounded-lg px-4 py-3 bg-[#fefcf8] text-[#8B4513] focus:border-[#CD853F] focus:outline-none"
                  type="text"
                  value={title}
                  required
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              {/* Capsule Image Upload */}
              <div>
                <label className="block font-medium text-[#8B4513] mb-2" style={{ fontFamily: 'Georgia, serif' }}>Capsule Image</label>

                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleChange}
                />

                <div
                  onClick={handleClick}
                  className="cursor-pointer w-40 h-40 border-2 border-dashed border-[#CD853F] rounded-lg flex items-center justify-center overflow-hidden bg-[#fefcf8] hover:bg-[#f8f3ec] transition-colors"
                  title="Click to upload image"
                >
                  {image ? (
                    <img
                      src={image}
                      alt="Capsule"
                      className="object-contain w-full h-full"
                    />
                  ) : (
                    <div className="text-[#A0522D] text-center px-2" style={{ fontFamily: 'Georgia, serif' }}>
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
                <label className="block font-medium text-[#8B4513] mb-2" style={{ fontFamily: 'Georgia, serif' }}>Description</label>
                <textarea
                  className="w-full border-2 border-[#e8d5b7] rounded-lg px-4 py-3 bg-[#fefcf8] text-[#8B4513] focus:border-[#CD853F] focus:outline-none min-h-[100px]"
                  value={description}
                  required
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              {/* Unlock Date */}
              <div>
                <label className="block font-medium text-[#8B4513] mb-2" style={{ fontFamily: 'Georgia, serif' }}>Unlock Date</label>
                <input
                  className="w-full border-2 border-[#e8d5b7] rounded-lg px-4 py-3 bg-[#fefcf8] text-[#8B4513] focus:border-[#CD853F] focus:outline-none"
                  type="date"
                  value={unlockedDate}
                  required
                  onChange={(e) => setUnlockedDate(e.target.value)}
                />
              </div>

              {/* Public Toggle */}
              <div>
                <label className="inline-flex items-center gap-3 text-[#8B4513]" style={{ fontFamily: 'Georgia, serif' }}>
                  <input
                    type="checkbox"
                    checked={isPublic}
                    onChange={() => setIsPublic(!isPublic)}
                    className="w-5 h-5 text-[#CD853F] border-2 border-[#e8d5b7] rounded focus:ring-[#CD853F]"
                  />
                  <span className="font-medium">Make Public</span>
                </label>
              </div>

              {/* Add Participants */}
              <div>
                <label className="block font-medium text-[#8B4513] mb-2" style={{ fontFamily: 'Georgia, serif' }}>Participants</label>
                <div className="flex gap-3">
                  <input
                    type="email"
                    className="w-full border-2 border-[#e8d5b7] rounded-lg px-4 py-3 bg-[#fefcf8] text-[#8B4513] focus:border-[#CD853F] focus:outline-none"
                    placeholder="Enter participant email"
                    value={newParticipant}
                    onChange={(e) => setNewParticipant(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={handleAddParticipant}
                    className="bg-gradient-to-r from-[#CD853F] to-[#D2691E] hover:from-[#D2691E] hover:to-[#CD853F] text-white px-4 py-3 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
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
                        className={`border rounded overflow-hidden p-1 relative ${styleKey === key ? "ring-4 ring-yellow-300" : ""
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

                {/* Audio Upload Section */}
                <div className="mb-4 p-4 bg-[#fefcf8] border-2 border-[#e8d5b7] rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-[#8B4513] font-semibold" style={{ fontFamily: 'Georgia, serif' }}>
                      Upload Custom Audio
                    </h4>
                    <input
                      type="file"
                      ref={audioInputRef}
                      accept="audio/*"
                      onChange={handleAudioUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => audioInputRef.current?.click()}
                      disabled={audioUploading}
                      className="bg-gradient-to-r from-[#CD853F] to-[#D2691E] hover:from-[#D2691E] hover:to-[#CD853F] text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {audioUploading ? (
                        <>
                          <span className="animate-spin inline-block mr-2">⏳</span>
                          Uploading...
                        </>
                      ) : (
                        <>
                          <span className="mr-2">🎵</span>
                          Upload Audio
                        </>
                      )}
                    </button>
                  </div>

                  {/* Display uploaded audio files */}
                  {uploadedAudio.length > 0 && (
                    <div className="space-y-2">
                      <h5 className="text-sm font-medium text-[#8B4513]">Your Uploaded Audio:</h5>
                      {uploadedAudio.map((audio) => (
                        <div
                          key={audio.id}
                          className="flex items-center justify-between bg-white p-2 rounded border border-[#e8d5b7]"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-lg">🎵</span>
                            <span className="text-sm text-[#8B4513]">{audio.name}</span>
                            <span className="text-xs text-[#A0522D]">({audio.duration})</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveUploadedAudio(audio.id)}
                            className="text-red-600 hover:text-red-800 p-1"
                            title="Remove audio"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Display uploaded audio selection grid */}
                {uploadedAudio.length > 0 ? (
                  <div className="grid grid-cols-2 gap-3">
                    {uploadedAudio.map((audio) => (
                      <button
                        key={audio.id}
                        type="button"
                        onClick={() => setSelectedMusic(audio.id)}
                        className={`border rounded-lg p-3 text-left transition-all ${selectedMusic === audio.id
                            ? "border-[#CD853F] bg-[#fdf9f4] ring-2 ring-[#CD853F] ring-opacity-50"
                            : "border-[#e8d5b7] bg-[#fefcf8] hover:border-[#CD853F] hover:bg-[#fdf9f4]"
                          }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-lg">🎵</span>
                          <div className="font-medium text-[#8B4513]">{audio.name}</div>
                        </div>
                        <div className="text-sm text-[#A0522D]">{audio.duration}</div>
                        {selectedMusic === audio.id && (
                          <div className="mt-2 text-[#CD853F] text-sm font-medium">
                            ✓ Selected
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="text-center p-8 bg-[#fefcf8] border-2 border-dashed border-[#e8d5b7] rounded-lg">
                    <span className="text-4xl mb-3 block">🎵</span>
                    <p className="text-[#A0522D] font-medium" style={{ fontFamily: 'Georgia, serif' }}>
                      No background music uploaded yet
                    </p>
                    <p className="text-sm text-[#A0522D] mt-1">
                      Upload an audio file above to add background music to your capsule
                    </p>
                  </div>
                )}

                {/* Music Preview Controls */}
                {selectedMusic && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-sm font-medium text-gray-700">
                        Preview:{" "}
                        {
                          uploadedAudio.find((a) => a.id === selectedMusic)?.name ||
                          "Unknown"
                        }
                      </div>
                      <button
                        type="button"
                        onClick={toggleMusicPreview}
                        disabled={!selectedMusic}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${isPlayingPreview
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
                          background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${previewVolume * 100
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

              {/* Slideshow Timeout Setting */}
              <div>
                <label className="block font-medium mb-1">Slideshow Timeout (seconds per slide)</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { value: 3000, label: "3 seconds" },
                    { value: 5000, label: "5 seconds" },
                    { value: 8000, label: "8 seconds" },
                    { value: 10000, label: "10 seconds" },
                    { value: 15000, label: "15 seconds" },
                    { value: 20000, label: "20 seconds" },
                    { value: 30000, label: "30 seconds" },
                    { value: 60000, label: "1 minute" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setSlideshowTimeout(option.value)}
                      className={`border rounded-lg p-3 text-center transition-all ${slideshowTimeout === option.value
                          ? "border-[#CD853F] bg-[#fdf9f4] ring-2 ring-[#CD853F] ring-opacity-50"
                          : "border-[#e8d5b7] bg-[#fefcf8] hover:border-[#CD853F] hover:bg-[#fdf9f4]"
                        }`}
                    >
                      <div className="font-medium text-[#8B4513]">{option.label}</div>
                      {slideshowTimeout === option.value && (
                        <div className="mt-1 text-[#CD853F] text-sm font-medium">
                          ✓ Selected
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                {/* Custom timeout input */}
                <div className="mt-3">
                  <label className="block text-sm font-medium text-[#8B4513] mb-1">
                    Custom timeout (milliseconds)
                  </label>
                  <input
                    type="number"
                    min="1000"
                    max="300000"
                    step="1000"
                    value={slideshowTimeout}
                    onChange={(e) => setSlideshowTimeout(parseInt(e.target.value) || 5000)}
                    className="w-full border-2 border-[#e8d5b7] rounded-lg px-4 py-3 bg-[#fefcf8] text-[#8B4513] focus:border-[#CD853F] focus:outline-none"
                    placeholder="5000"
                  />
                  <p className="text-sm text-[#A0522D] mt-1">
                    Current setting: {slideshowTimeout / 1000} seconds per slide
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <label className="block font-medium mb-1">Insert Text</label>
                <TiptapEditor content={textContent} onChange={setTextContent} />

                {/* Font Customization for New Items */}
                <div className="mt-4 p-4 bg-[#fefcf8] border-2 border-[#e8d5b7] rounded-lg">
                  <h4 className="text-[#8B4513] font-semibold mb-3" style={{ fontFamily: 'Georgia, serif' }}>
                    Font Settings
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Font Size */}
                    <div>
                      <label className="block text-sm font-medium text-[#8B4513] mb-1">
                        Font Size
                      </label>
                      <select
                        value={newItemFontSize}
                        onChange={(e) => setNewItemFontSize(e.target.value)}
                        className="w-full border-2 border-[#e8d5b7] rounded-lg px-3 py-2 bg-[#fefcf8] text-[#8B4513] focus:border-[#CD853F] focus:outline-none"
                      >
                        <option value="12px">12px - Small</option>
                        <option value="14px">14px - Regular</option>
                        <option value="16px">16px - Medium</option>
                        <option value="18px">18px - Large</option>
                        <option value="20px">20px - X-Large</option>
                        <option value="24px">24px - XX-Large</option>
                        <option value="28px">28px - Huge</option>
                        <option value="32px">32px - Massive</option>
                      </select>
                    </div>

                    {/* Font Family */}
                    <div>
                      <label className="block text-sm font-medium text-[#8B4513] mb-1">
                        Font Family
                      </label>
                      <select
                        value={newItemFontFamily}
                        onChange={(e) => setNewItemFontFamily(e.target.value)}
                        className="w-full border-2 border-[#e8d5b7] rounded-lg px-3 py-2 bg-[#fefcf8] text-[#8B4513] focus:border-[#CD853F] focus:outline-none"
                      >
                        <option value="Georgia, serif">Georgia (Serif)</option>
                        <option value="Times New Roman, serif">Times New Roman</option>
                        <option value="Arial, sans-serif">Arial (Sans-serif)</option>
                        <option value="Helvetica, sans-serif">Helvetica</option>
                        <option value="Verdana, sans-serif">Verdana</option>
                        <option value="Courier New, monospace">Courier New</option>
                        <option value="Palatino, serif">Palatino</option>
                        <option value="Garamond, serif">Garamond</option>
                        <option value="Brush Script MT, cursive">Brush Script</option>
                        <option value="Comic Sans MS, cursive">Comic Sans</option>
                      </select>
                    </div>

                    {/* Font Color */}
                    <div>
                      <label className="block text-sm font-medium text-[#8B4513] mb-1">
                        Font Color
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={newItemFontColor}
                          onChange={(e) => setNewItemFontColor(e.target.value)}
                          className="w-12 h-10 border-2 border-[#e8d5b7] rounded-lg cursor-pointer"
                        />
                        <input
                          type="text"
                          value={newItemFontColor}
                          onChange={(e) => setNewItemFontColor(e.target.value)}
                          className="flex-1 border-2 border-[#e8d5b7] rounded-lg px-3 py-2 bg-[#fefcf8] text-[#8B4513] focus:border-[#CD853F] focus:outline-none text-sm"
                          placeholder="#8B4513"
                        />
                      </div>
                    </div>
                  </div>
                </div>

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
                        fontSize: newItemFontSize,
                        fontFamily: newItemFontFamily,
                        color: newItemFontColor,
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-6">
                <button
                  type="button"
                  onClick={handleAddItem}
                  className="bg-gradient-to-r from-[#CD853F] to-[#D2691E] hover:from-[#D2691E] hover:to-[#CD853F] text-white px-6 py-3 rounded-full font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  <span className="text-lg mr-2">➕</span>
                  Add Memory
                </button>
              </div>

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
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs shadow-sm ${idx === 0
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
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs shadow-sm ${idx === items.length - 1
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
                        className="absolute top-3 right-3 bg-red-500 text-white hover:bg-red-600 rounded-full p-2 shadow-sm z-10 w-6 h-6 flex items-center justify-center"
                      >
                        <X size={14} />
                      </button>

                      {/* Edit button - positioned in bottom right */}
                      {item.type === "text" && editingItemIndex !== idx && (
                        <button
                          type="button"
                          onClick={() => handleEditItem(idx)}
                          className="absolute bottom-3 right-3 bg-blue-500 text-white hover:bg-blue-600 rounded-full p-2 shadow-sm z-10 w-8 h-8 flex items-center justify-center"
                          title="Edit memory"
                        >
                          <Edit size={14} />
                        </button>
                      )}

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
                          <>
                            {editingItemIndex === idx ? (
                              <div style={{ width: "100%", padding: "20px" }}>
                                <TiptapEditor
                                  content={editingContent}
                                  onChange={setEditingContent}
                                />

                                {/* Font Customization Controls */}
                                <div className="mt-4 p-4 bg-[#fefcf8] border-2 border-[#e8d5b7] rounded-lg">
                                  <h4 className="text-[#8B4513] font-semibold mb-3" style={{ fontFamily: 'Georgia, serif' }}>
                                    Font Customization
                                  </h4>

                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {/* Font Size */}
                                    <div>
                                      <label className="block text-sm font-medium text-[#8B4513] mb-1">
                                        Font Size
                                      </label>
                                      <select
                                        value={editingFontSize}
                                        onChange={(e) => setEditingFontSize(e.target.value)}
                                        className="w-full border-2 border-[#e8d5b7] rounded-lg px-3 py-2 bg-[#fefcf8] text-[#8B4513] focus:border-[#CD853F] focus:outline-none"
                                      >
                                        <option value="12px">12px - Small</option>
                                        <option value="14px">14px - Regular</option>
                                        <option value="16px">16px - Medium</option>
                                        <option value="18px">18px - Large</option>
                                        <option value="20px">20px - X-Large</option>
                                        <option value="24px">24px - XX-Large</option>
                                        <option value="28px">28px - Huge</option>
                                        <option value="32px">32px - Massive</option>
                                      </select>
                                    </div>

                                    {/* Font Family */}
                                    <div>
                                      <label className="block text-sm font-medium text-[#8B4513] mb-1">
                                        Font Family
                                      </label>
                                      <select
                                        value={editingFontFamily}
                                        onChange={(e) => setEditingFontFamily(e.target.value)}
                                        className="w-full border-2 border-[#e8d5b7] rounded-lg px-3 py-2 bg-[#fefcf8] text-[#8B4513] focus:border-[#CD853F] focus:outline-none"
                                      >
                                        <option value="Georgia, serif">Georgia (Serif)</option>
                                        <option value="Times New Roman, serif">Times New Roman</option>
                                        <option value="Arial, sans-serif">Arial (Sans-serif)</option>
                                        <option value="Helvetica, sans-serif">Helvetica</option>
                                        <option value="Verdana, sans-serif">Verdana</option>
                                        <option value="Courier New, monospace">Courier New</option>
                                        <option value="Palatino, serif">Palatino</option>
                                        <option value="Garamond, serif">Garamond</option>
                                        <option value="Brush Script MT, cursive">Brush Script</option>
                                        <option value="Comic Sans MS, cursive">Comic Sans</option>
                                      </select>
                                    </div>

                                    {/* Font Color */}
                                    <div>
                                      <label className="block text-sm font-medium text-[#8B4513] mb-1">
                                        Font Color
                                      </label>
                                      <div className="flex gap-2">
                                        <input
                                          type="color"
                                          value={editingFontColor}
                                          onChange={(e) => setEditingFontColor(e.target.value)}
                                          className="w-12 h-10 border-2 border-[#e8d5b7] rounded-lg cursor-pointer"
                                        />
                                        <input
                                          type="text"
                                          value={editingFontColor}
                                          onChange={(e) => setEditingFontColor(e.target.value)}
                                          className="flex-1 border-2 border-[#e8d5b7] rounded-lg px-3 py-2 bg-[#fefcf8] text-[#8B4513] focus:border-[#CD853F] focus:outline-none text-sm"
                                          placeholder="#8B4513"
                                        />
                                      </div>
                                    </div>
                                  </div>

                                  {/* Preview */}
                                  <div className="mt-4">
                                    <label className="block text-sm font-medium text-[#8B4513] mb-2">
                                      Font Preview
                                    </label>
                                    <div
                                      className="p-3 border border-[#e8d5b7] rounded-lg bg-white max-h-32 overflow-y-auto"
                                      style={{
                                        fontSize: editingFontSize,
                                        fontFamily: editingFontFamily,
                                        color: editingFontColor,
                                      }}
                                      dangerouslySetInnerHTML={{
                                        __html: editingContent || "Start typing to see preview..."
                                      }}
                                    />
                                  </div>
                                </div>

                                <div className="flex gap-4 mt-6 justify-center">
                                  <button
                                    type="button"
                                    onClick={handleSaveEdit}
                                    className={vintageClasses.button.primary}
                                  >
                                    <span className="text-lg mr-2">✨</span>
                                    Save Changes
                                  </button>
                                  <button
                                    type="button"
                                    onClick={handleCancelEdit}
                                    className={vintageClasses.button.secondary}
                                  >
                                    <span className="text-lg mr-2">✖️</span>
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div
                                dangerouslySetInnerHTML={{ __html: item.content }}
                                style={{
                                  maxWidth: "80%",
                                  padding: "15px",
                                  fontSize: item.fontSize || "16px",
                                  fontFamily: item.fontFamily || "Georgia, serif",
                                  color: item.fontColor || "#8B4513",
                                }}
                              />
                            )}
                          </>
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

              <div className="flex gap-6 mt-8 justify-center">
                <button
                  type="submit"
                  disabled={loading}
                  className={vintageClasses.button.primary}
                >
                  <span className="text-xl mr-2">✨</span>
                  {loading ? "Saving..." : "Save Capsule"}
                </button>

                <button
                  type="button"
                  onClick={handlePreview}
                  disabled={!id || loading}
                  className={`${vintageClasses.button.secondary} ${!id || loading
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                    }`}
                >
                  <span className="text-xl mr-2">👁️</span>
                  Preview
                </button>
              </div>
            </form>
          </VintageContainer>
        </div>
      </section>
    </main>
  );
}

export default CreateCapsule;
