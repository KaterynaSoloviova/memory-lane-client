import { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { BASE_URL } from "../config/config";
import { AuthContext } from "../contexts/AuthContext";
import TiptapEditor from "../components/TiptapEditor";
import { useNavigate, useParams } from "react-router-dom";
import { memoryStyles } from "../utils/styles";
import { VintageDecorations, VintageOrnament, VintageContainer, vintageClasses } from "../utils/vintageStyles.jsx";
import { uploadImage, uploadVideo, uploadAudio } from "../utils/cloudinaryUpload";
import VintageLoader from "../components/VintageLoader";
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
  Clock,
  Package,
  Video,
  Save,
  Eye,
  Music,
  Info,
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
  const [isStyleSectionOpen, setIsStyleSectionOpen] = useState(false);
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

  // Tooltip state
  const [showPublicTooltip, setShowPublicTooltip] = useState(false);


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
          setImage(cap.image || "");
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
    try {
      return await uploadImage(file);
    } catch (err) {
      console.error("Cloudinary upload failed", err);
      setError("Image upload failed");
      return "";
    }
  };

  // --- Image Upload for TiptapEditor ---
  const handleEditorImageUpload = (callback) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      if (e.target.files && e.target.files[0]) {
        const url = await handleCloudinaryUpload(e.target.files[0]);
        callback(url);
      }
    };
    input.click();
  };

  const handleCloudinaryVideoUpload = async (file) => {
    try {
      return await uploadVideo(file);
    } catch (err) {
      console.error("Cloudinary video upload failed", err);
      setError("Video upload failed");
      return "";
    }
  };

  const handleCloudinaryAudioUpload = async (file) => {
    try {
      return await uploadAudio(file);
    } catch (err) {
      console.error("Cloudinary audio upload failed", err);
      setError("Audio upload failed");
      return "";
    }
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

      {/* CSS for empty paragraph visibility and text alignment */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .preview-content p:empty {
            min-height: 1.2em;
            display: block;
          }
          .preview-content p:empty::before {
            content: " ";
            white-space: pre;
          }
          /* Ensure text alignment from editor is preserved in preview */
          .preview-content *[style*="text-align"] {
            /* Preserve any text-align style from editor */
          }
          .preview-content p[style*="text-align: left"], 
          .preview-content div[style*="text-align: left"] {
            text-align: left !important;
          }
          .preview-content p[style*="text-align: right"], 
          .preview-content div[style*="text-align: right"] {
            text-align: right !important;
          }
          .preview-content p[style*="text-align: center"], 
          .preview-content div[style*="text-align: center"] {
            text-align: center !important;
          }
          .preview-content p[style*="text-align: justify"], 
          .preview-content div[style*="text-align: justify"] {
            text-align: justify !important;
          }
          .preview-content ul, .preview-content ol {
            padding-left: 20px;
          }
          .preview-content blockquote {
            padding: 8px 16px;
            border-left: 4px solid #CD853F;
            background-color: #fdf9f4;
            font-style: italic;
          }
          /* Text positioning and spacing for preview */
          .preview-content {
            white-space: pre-wrap;
            word-wrap: break-word;
            line-height: 1.2;
          }
          
          /* Line breaks */
          .preview-content br {
            display: block;
            margin: 0.5em 0;
            line-height: 0.5em;
          }
          
          /* Paragraphs */
          .preview-content p {
            margin: 0.5em 0;
            line-height: 1.2;
            display: block;
          }
          
          /* Divs */
          .preview-content div {
            margin: 0.3em 0;
            display: block;
          }
          
          /* Text alignment - this is the key fix! */
          .preview-content p[style*="text-align: left"],
          .preview-content div[style*="text-align: left"] {
            text-align: left !important;
          }
          
          .preview-content p[style*="text-align: right"],
          .preview-content div[style*="text-align: right"] {
            text-align: right !important;
          }
          
          .preview-content p[style*="text-align: center"],
          .preview-content div[style*="text-align: center"] {
            text-align: center !important;
          }
          
          .preview-content p[style*="text-align: justify"],
          .preview-content div[style*="text-align: justify"] {
            text-align: justify !important;
            text-justify: inter-word;
          }
          
          /* Additional justify support for different attribute formats */
          .preview-content p[style*="justify"],
          .preview-content div[style*="justify"] {
            text-align: justify !important;
            text-justify: inter-word;
          }
          
          /* Support for Tiptap justify classes */
          .preview-content .has-text-align-justify,
          .preview-content [data-text-align="justify"] {
            text-align: justify !important;
            text-justify: inter-word;
          }
          
          /* Default alignment for content without specific alignment */
          .preview-content p:not([style*="text-align"]),
          .preview-content div:not([style*="text-align"]) {
            text-align: left !important;
          }
          
          /* Ensure all preview content defaults to center alignment and positioning */
          .preview-content {
            text-align: center !important;
            align-items: center !important;
            justify-content: center !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          
          .preview-content p, .preview-content div {
            text-align: left !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          
          .preview-content p:first-child {
            margin-top: 0 !important;
            padding-top: 0 !important;
          }
          
          /* Center images in preview */
          .preview-content img {
            display: block !important;
            margin: 0 auto !important;
            max-width: 100% !important;
            max-height: 70vh !important;
            object-fit: contain !important;
            border-radius: 8px !important;
            box-shadow: 0 4px 8px rgba(0,0,0,0.15) !important;
          }
          
          /* Memory cards text alignment and spacing */
          .memory-card-content {
            white-space: pre-wrap !important;
            word-wrap: break-word !important;
            line-height: 1.2 !important;
            overflow-wrap: break-word !important;
          }
          
          .memory-card-content br {
            display: block !important;
            margin: 0.8em 0 !important;
            line-height: 1.2 !important;
            height: 0.8em !important;
            content: "" !important;
            min-height: 0.8em !important;
          }
          
          /* Force line breaks to be visible */
          .memory-card-content br::after {
            content: "\\A" !important;
            white-space: pre !important;
          }
          
          /* Additional line break support for memory cards */
          .memory-card-content br {
            display: block !important;
            margin: 0.8em 0 !important;
            line-height: 1.2 !important;
            height: 0.8em !important;
            content: "" !important;
            min-height: 0.8em !important;
            width: 100% !important;
            clear: both !important;
          }
          
          .memory-card-content p {
            margin: 0.8em 0;
            line-height: 1.2;
            display: block;
          }
          
          .memory-card-content div {
            margin: 0.6em 0;
            display: block;
          }
          
          /* Text alignment for memory cards */
          .memory-card-content p[style*="text-align: left"],
          .memory-card-content div[style*="text-align: left"] {
            text-align: left !important;
          }
          
          .memory-card-content p[style*="text-align: right"],
          .memory-card-content div[style*="text-align: right"] {
            text-align: right !important;
          }
          
          .memory-card-content p[style*="text-align: center"],
          .memory-card-content div[style*="text-align: center"] {
            text-align: center !important;
          }
          
          .memory-card-content p[style*="text-align: justify"],
          .memory-card-content div[style*="text-align: justify"] {
            text-align: justify !important;
            text-justify: inter-word;
          }
          
          /* Default alignment for memory cards */
          .memory-card-content p:not([style*="text-align"]),
          .memory-card-content div:not([style*="text-align"]) {
            text-align: left !important;
          }
          
          /* Ensure all memory card content defaults to left alignment and top positioning */
          .memory-card-content {
            text-align: left !important;
            align-items: flex-start !important;
            justify-content: flex-start !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          
          .memory-card-content p, .memory-card-content div {
            text-align: left !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          
          .memory-card-content p:first-child {
            margin-top: 0 !important;
            padding-top: 0 !important;
          }
        `
      }} />

      <section className="relative z-10 px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="max-w-4xl mx-auto">
          <VintageContainer className="text-center">
            <VintageOrnament symbol="❦" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 text-[#8B4513] tracking-wide flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4" style={{ fontFamily: 'Georgia, serif' }}>
              <Package className="w-8 sm:w-10 lg:w-12 h-8 sm:h-10 lg:h-12 text-[#CD853F]" />
              <span className="text-center">{id ? "Edit" : "Create"} Time Capsule</span>
            </h2>
            <VintageOrnament size="sm" symbol="✦" />

            {error && <p className="mb-4 text-center text-red-600">{error}</p>}
            {message && <p className="mb-4 text-center text-green-600">{message}</p>}

            {loading && (
              <div className="mb-4">
                <VintageLoader
                  size="sm"
                  message="Saving your precious memories..."
                />
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
              className="space-y-4 sm:space-y-6 text-left"
            >
              {/* Title */}
              <div>
                <label className="block font-bold text-lg sm:text-xl text-[#8B4513] mb-2" style={{ fontFamily: 'Georgia, serif' }}>Title</label>
                <input
                  className="w-full border-2 border-[#e8d5b7] rounded-lg px-3 sm:px-4 py-2 sm:py-3 bg-[#fefcf8] text-[#8B4513] focus:border-[#CD853F] focus:outline-none text-sm sm:text-base"
                  type="text"
                  value={title}
                  required
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              {/* Capsule Image Upload */}
              <div>
                <label className="block font-bold text-xl text-[#8B4513] mb-2" style={{ fontFamily: 'Georgia, serif' }}>Capsule Image</label>

                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleChange}
                />

                <div
                  onClick={handleClick}
                  className="cursor-pointer w-full h-40 border-2 border-dashed border-[#CD853F] rounded-lg flex items-center justify-center overflow-hidden bg-[#fefcf8] hover:bg-[#f8f3ec] transition-colors"
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
                <label className="block font-bold text-xl text-[#8B4513] mb-2" style={{ fontFamily: 'Georgia, serif' }}>Description</label>
                <textarea
                  className="w-full border-2 border-[#e8d5b7] rounded-lg px-4 py-3 bg-[#fefcf8] text-[#8B4513] focus:border-[#CD853F] focus:outline-none min-h-[100px]"
                  value={description}
                  required
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              {/* Unlock Date */}
              <div>
                <label className="block font-bold text-xl text-[#8B4513] mb-2" style={{ fontFamily: 'Georgia, serif' }}>Unlock Date</label>
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
                    className="w-5 h-5 text-[#CD853F] bg-[#fefcf8] border-2 border-[#e8d5b7] rounded focus:ring-2 focus:ring-[#CD853F] focus:ring-opacity-50 focus:border-[#CD853F] accent-[#CD853F]"
                  />
                  <span className="font-bold text-xl">Make Public</span>
                  <div className="relative">
                    <Info
                      className="w-5 h-5 text-[#CD853F] cursor-help"
                      onMouseEnter={() => setShowPublicTooltip(true)}
                      onMouseLeave={() => setShowPublicTooltip(false)}
                    />
                    {showPublicTooltip && (
                      <div className="absolute left-6 top-0 z-50 bg-[#8B4513] text-white text-sm rounded-lg px-3 py-2 shadow-lg w-64">
                        <div className="relative">
                          <div className="leading-relaxed">
                            Making your capsule public allows all website visitors to discover and view your time capsule.
                            <br />
                            Private capsules are only accessible to you and invited participants.
                          </div>
                          <div className="absolute left-0 top-1/2 transform -translate-x-full -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-[#8B4513]"></div>
                        </div>
                      </div>
                    )}
                  </div>
                </label>
              </div>

              {/* Add Participants */}
              <div>
                <label className="block font-bold text-xl text-[#8B4513] mb-2" style={{ fontFamily: 'Georgia, serif' }}>Participants</label>
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
                <button
                  type="button"
                  onClick={() => setIsStyleSectionOpen(!isStyleSectionOpen)}
                  className="w-full flex items-center justify-between font-bold text-xl text-[#8B4513] mb-2 hover:text-[#CD853F] transition-colors p-3 border-2 border-[#e8d5b7] rounded-lg bg-[#fefcf8] hover:bg-[#f8f3ec] hover:border-[#CD853F]"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  <div className="flex items-center gap-3">
                    <span>Choose style</span>
                    <span className="text-sm text-[#A0522D] opacity-75">(Click to expand)</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-lg">
                      {isStyleSectionOpen ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
                    </span>
                  </div>
                </button>

                {isStyleSectionOpen && (
                  <div className="grid grid-cols-5 gap-2 mt-2 p-4 bg-[#fefcf8] border-2 border-[#e8d5b7] rounded-lg">
                    {Object.keys(memoryStyles).map((key) => {
                      const s = memoryStyles[key];
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setStyleKey(key)}
                          className={`border-2 rounded-lg overflow-hidden p-1 relative ${styleKey === key ? "border-[#CD853F] ring-2 ring-[#CD853F]" : "border-[#e8d5b7] hover:border-[#CD853F]"
                            }`}
                          aria-pressed={styleKey === key}
                        >
                          <div
                            className="w-28 h-16 relative"
                            style={{
                              backgroundImage: s.backgroundImage,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                              backgroundRepeat: "no-repeat",
                              margin: "0 auto",
                            }}
                          >
                            <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-[#8B4513] drop-shadow-lg" style={{ fontFamily: 'Georgia, serif', textAlign: 'center', lineHeight: '1.2', textShadow: '2px 2px 4px rgba(255,255,255,0.8)' }}>
                              {s.label}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Background Music Selection */}
              <div>
                <label className="block font-bold text-xl text-[#8B4513] mb-2" style={{ fontFamily: 'Georgia, serif' }}>Background Music</label>

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
                      className="bg-gradient-to-r from-[#CD853F] to-[#D2691E] hover:from-[#D2691E] hover:to-[#CD853F] text-white px-4 py-2 rounded-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                    >
                      {audioUploading ? (
                        <>
                          <span className="animate-spin inline-block mr-2">⏳</span>
                          Uploading...
                        </>
                      ) : (
                        <>
                          <span className="mr-2"><Music className="w-5 h-5" /></span>
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
                            <Music className="w-5 h-5" />
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
                          <Music className="w-5 h-5" />
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
                  <div className="text-center p-3 bg-[#fefcf8] border-2 border-dashed border-[#e8d5b7] rounded-lg">
                    <Music className="w-6 h-6 mx-auto mb-1 text-[#CD853F]" />
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
                  <div className="mt-4 p-4 bg-[#fefcf8] border-2 border-[#e8d5b7] rounded-lg">
                    {/* Preview Header */}
                    <div className="mb-3">
                      <div className="text-sm font-semibold text-[#8B4513] mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                        Preview:{" "}
                        {
                          uploadedAudio.find((a) => a.id === selectedMusic)?.name ||
                          "Unknown"
                        }
                      </div>
                      <div className="flex justify-center">
                        <button
                          type="button"
                          onClick={toggleMusicPreview}
                          disabled={!selectedMusic}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${isPlayingPreview
                            ? "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-lg"
                            : "bg-gradient-to-r from-[#CD853F] to-[#D2691E] text-white hover:from-[#D2691E] hover:to-[#CD853F] shadow-lg"
                            }`}
                        >
                          {isPlayingPreview ? <Pause size={16} /> : <Play size={16} />}
                          {isPlayingPreview ? "Stop" : "Play Preview"}
                        </button>
                      </div>
                    </div>

                    {/* Volume Control */}
                    <div className="flex items-center gap-3">
                      <Volume2 size={16} className="text-[#8B4513]" />
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={previewVolume}
                        onChange={handlePreviewVolumeChange}
                        className="flex-1 h-3 bg-[#e8d5b7] rounded-lg appearance-none cursor-pointer hover:bg-[#dbc7a6] transition-colors"
                        style={{
                          background: `linear-gradient(to right, #CD853F 0%, #CD853F ${previewVolume * 100
                            }%, #e8d5b7 ${previewVolume * 100}%, #e8d5b7 100%)`,
                        }}
                      />
                      <span className="text-sm font-semibold text-[#8B4513] w-10 text-right" style={{ fontFamily: 'Georgia, serif' }}>
                        {Math.round(previewVolume * 100)}%
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Slideshow Timeout Setting */}
              <div>
                <label className="block font-bold text-xl text-[#8B4513] mb-2" style={{ fontFamily: 'Georgia, serif' }}>Slideshow Timeout (seconds per slide)</label>
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
                <label className="block font-bold text-xl text-[#8B4513] mb-2" style={{ fontFamily: 'Georgia, serif' }}>Insert Text</label>
                <TiptapEditor content={textContent} onChange={setTextContent} onImageUpload={handleEditorImageUpload} />

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
                        <option value="36px">36px - Giant</option>
                        <option value="40px">40px - Enormous</option>
                        <option value="44px">44px - Colossal</option>
                        <option value="48px">48px - Monumental</option>
                        <option value="50px">50px - Epic</option>
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
                        <option value="Patrick Hand, cursive">Patrick Hand</option>
                        <option value="Caveat, cursive">Caveat</option>
                        <option value="Homemade Apple, cursive">Homemade Apple</option>
                        <option value="Dancing Script, cursive">Dancing Script</option>
                        <option value="Pacifico, cursive">Pacifico</option>
                        <option value="Lobster Two, cursive">Lobster Two</option>
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
                  <label className="block font-bold text-xl text-[#8B4513] mb-2" style={{ fontFamily: 'Georgia, serif' }}>Preview</label>
                  <div className="pt-0 px-4 pb-4 bg-[#fefcf8] border-2 border-[#e8d5b7] rounded-lg">
                    <div
                      className="pt-0 px-6 pb-6 rounded-lg shadow-lg border-2 border-[#dbc7a6] relative overflow-hidden"
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
                        width: "100%",
                        boxSizing: "border-box",
                        padding: "0px 40px 40px 40px",
                        margin: "0",
                        textAlign: "center",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        dangerouslySetInnerHTML={{ __html: textContent }}
                        style={{
                          fontSize: newItemFontSize,
                          fontFamily: newItemFontFamily,
                          color: newItemFontColor,
                          width: "100%",
                          boxSizing: "border-box",
                          lineHeight: "1.6",
                          margin: "0",
                          padding: "0",
                          textAlign: "center",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexDirection: "column",
                        }}
                        className="preview-content"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-6">
                <button
                  type="button"
                  onClick={handleAddItem}
                  className="bg-gradient-to-r from-[#CD853F] to-[#D2691E] hover:from-[#D2691E] hover:to-[#CD853F] text-white px-6 py-3 rounded-full font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center"
                >
                  <span className="text-xl mr-2"><Plus className="w-5 h-5" /></span>
                  Add Memory
                </button>
              </div>

              {/* --- VIDEO UPLOAD --- */}
              <div className="mb-6">
                <label className="block font-bold text-xl text-[#8B4513] mb-2" style={{ fontFamily: 'Georgia, serif' }}>Insert Video</label>

                {/* Video Upload Section */}
                <div className="mb-4 p-4 bg-[#fefcf8] border-2 border-[#e8d5b7] rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-[#8B4513] font-semibold" style={{ fontFamily: 'Georgia, serif' }}>
                      Upload Custom Video
                    </h4>
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
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => videoInputRef.current?.click()}
                      disabled={videoUploading}
                      className="bg-gradient-to-r from-[#CD853F] to-[#D2691E] hover:from-[#D2691E] hover:to-[#CD853F] text-white px-4 py-2 rounded-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                    >
                      {videoUploading ? (
                        <>
                          <span className="animate-spin inline-block mr-2">⏳</span>
                          Uploading...
                        </>
                      ) : (
                        <>
                          <span className="mr-2"><Video className="w-5 h-5" /></span>
                          Upload Video
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Video Preview */}
                {videoPreview && (
                  <div className="mt-4 p-4 bg-[#fefcf8] border-2 border-[#e8d5b7] rounded-lg">
                    <h4 className="text-[#8B4513] font-semibold mb-3" style={{ fontFamily: 'Georgia, serif' }}>
                      Video Preview
                    </h4>
                    <div className="flex flex-col items-center">
                      <video
                        width="320"
                        height="240"
                        controls
                        src={videoPreview}
                        className="rounded-lg shadow-md border-2 border-[#dbc7a6]"
                      />
                      <button
                        type="button"
                        onClick={() => setVideoPreview(null)}
                        className="mt-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
                      >
                        Remove Preview
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {error && <p className="text-red-500 mb-4">{error}</p>}

              {/* Items List */}
              <div className="mt-6 space-y-0">
                {items.length === 0 ? (
                  <div className="text-center p-8 bg-[#fefcf8] border-2 border-[#e8d5b7] rounded-lg">
                    <p className="text-[#A0522D]" style={{ fontFamily: 'Georgia, serif' }}>No memories added yet.</p>
                  </div>
                ) : (
                  items.map((item, idx) => (
                    <div
                      key={idx}
                      className="border-2 border-[#e8d5b7] rounded-lg bg-[#fefcf8] shadow-lg p-0 flex flex-col items-center relative mb-6"
                    >
                      {/* Reorder buttons */}
                      <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
                        <button
                          type="button"
                          onClick={() => handleMoveItemUp(idx)}
                          disabled={idx === 0}
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shadow-md transition-all duration-300 ${idx === 0
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-gradient-to-r from-[#CD853F] to-[#D2691E] text-white hover:from-[#D2691E] hover:to-[#CD853F] cursor-pointer transform hover:scale-105"
                            }`}
                        >
                          <ChevronUp size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMoveItemDown(idx)}
                          disabled={idx === items.length - 1}
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shadow-md transition-all duration-300 ${idx === items.length - 1
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-gradient-to-r from-[#CD853F] to-[#D2691E] text-white hover:from-[#D2691E] hover:to-[#CD853F] cursor-pointer transform hover:scale-105"
                            }`}
                        >
                          <ChevronDown size={14} />
                        </button>
                      </div>

                      {/* Delete button */}
                      <button
                        type="button"
                        onClick={() => handleDeleteItem(idx)}
                        className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 rounded-full p-2 shadow-lg z-10 w-8 h-8 flex items-center justify-center transition-all duration-300 transform hover:scale-105"
                      >
                        <X size={14} />
                      </button>

                      {/* Edit button - positioned in bottom right */}
                      {item.type === "text" && editingItemIndex !== idx && (
                        <button
                          type="button"
                          onClick={() => handleEditItem(idx)}
                          className="absolute bottom-3 right-3 bg-gradient-to-r from-[#CD853F] to-[#D2691E] text-white hover:from-[#D2691E] hover:to-[#CD853F] rounded-full p-2 shadow-lg z-10 w-9 h-9 flex items-center justify-center transition-all duration-300 transform hover:scale-105"
                          title="Edit memory"
                        >
                          <Edit size={14} />
                        </button>
                      )}

                      <div
                        className="prose max-w-full p-0 rounded-lg shadow-lg border-2 border-[#dbc7a6] relative overflow-hidden"
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
                          padding: "0px",
                          margin: "0",
                          textAlign: "left",
                          display: "flex",
                          alignItems: "flex-start",
                          justifyContent: "flex-start",
                        }}
                      >
                        {item.type === "text" && (
                          <>
                            {editingItemIndex === idx ? (
                              <div style={{ width: "100%", padding: "0px 20px 20px 20px" }}>
                                <TiptapEditor
                                  content={editingContent}
                                  onChange={setEditingContent}
                                  onImageUpload={handleEditorImageUpload}
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
                                        <option value="36px">36px - Giant</option>
                                        <option value="40px">40px - Enormous</option>
                                        <option value="44px">44px - Colossal</option>
                                        <option value="48px">48px - Monumental</option>
                                        <option value="50px">50px - Epic</option>
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
                                        <option value="Patrick Hand, cursive">Patrick Hand</option>
                                        <option value="Caveat, cursive">Caveat</option>
                                        <option value="Homemade Apple, cursive">Homemade Apple</option>
                                        <option value="Dancing Script, cursive">Dancing Script</option>
                                        <option value="Pacifico, cursive">Pacifico</option>
                                        <option value="Lobster Two, cursive">Lobster Two</option>
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
                                      className="p-3 border border-[#e8d5b7] rounded-lg bg-white max-h-32 overflow-y-auto preview-content"
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
                                    className="bg-gradient-to-r from-[#CD853F] to-[#D2691E] hover:from-[#D2691E] hover:to-[#CD853F] text-white px-5 py-2.5 rounded-full font-semibold text-base shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-[#8B4513] flex items-center gap-2"
                                  >
                                    <Save className="w-4 h-4" />
                                    Save
                                  </button>
                                  <button
                                    type="button"
                                    onClick={handleCancelEdit}
                                    className="bg-gradient-to-r from-[#fefcf8] to-[#f8f3ec] border-3 border-[#CD853F] text-[#8B4513] hover:bg-gradient-to-r hover:from-[#CD853F] hover:to-[#D2691E] hover:text-white px-5 py-2.5 rounded-full font-semibold text-base transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
                                  >
                                    <X className="w-4 h-4" />
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: `
                    <div style="
                      display: flex; 
                      flex-direction: column; 
                      gap: 0px; 
                      width: 100%; 
                      max-height: 100%;
                      overflow: hidden;
                      padding: 0px;
                      box-sizing: border-box;
                    ">
                      <style>
                        .slide-content img {
                          max-width: 100%;
                          max-height: 85vh;
                          min-height: 400px;
                          width: auto;
                          height: auto;
                          object-fit: contain;
                          border-radius: 6px;
                          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                          display: block;
                          margin: 0 auto;
                        }
                        .slide-content {
                          display: flex;
                          flex-direction: column;
                          gap: 0px;
                          width: 100%;
                          height: 100%;
                          padding: 0px;
                          justify-content: center;
                        }
                        .slide-content p, .slide-content div {
                          word-wrap: break-word;
                          font-size: 0.9em;
                          display: block;
                          width: 100%;
                        }
                        /* Ensure text alignment from editor is preserved */
                        .slide-content *[style*="text-align"] {
                          /* Preserve any text-align style from editor */
                        }
                        /* Preserve text alignment from editor */
                        .slide-content p[style*="text-align: left"], 
                        .slide-content div[style*="text-align: left"] {
                          text-align: left !important;
                        }
                        .slide-content p[style*="text-align: right"], 
                        .slide-content div[style*="text-align: right"] {
                          text-align: right !important;
                        }
                        .slide-content p[style*="text-align: center"], 
                        .slide-content div[style*="text-align: center"] {
                          text-align: center !important;
                        }
                        .slide-content p[style*="text-align: justify"],
                        .slide-content div[style*="text-align: justify"] {
                          text-align: justify !important;
                          text-justify: inter-word;
                        }
                        .slide-content ul, .slide-content ol {
                          padding-left: 20px;
                        }
                        .slide-content blockquote {
                          padding: 8px 16px;
                          border-left: 4px solid #CD853F;
                          background-color: #fdf9f4;
                          font-style: italic;
                        }
                        .slide-content p:empty {
                          min-height: 1.2em;
                          display: block;
                        }
                        .slide-content p:empty::before {
                          content: " ";
                          white-space: pre;
                        }
                        /* Line breaks and spacing for images with text */
                        .slide-content br {
                          display: block;
                          margin: 0.5em 0;
                          line-height: 0.5em;
                        }
                        .slide-content p {
                          margin: 0.5em 0;
                          line-height: 1.2;
                          display: block;
                        }
                        .slide-content div {
                          margin: 0.3em 0;
                          display: block;
                        }
                        .slide-content {
                          white-space: pre-wrap;
                          word-wrap: break-word;
                          line-height: 1.2;
                        }
                        /* Default alignment for content without specific alignment */
                        .slide-content p:not([style*="text-align"]),
                        .slide-content div:not([style*="text-align"]) {
                          text-align: left !important;
                        }
                        
                        /* Ensure all text content defaults to left alignment and top positioning */
                        .slide-content {
                          text-align: left !important;
                          align-items: flex-start !important;
                          justify-content: flex-start !important;
                          margin: 0 !important;
                          padding: 0 !important;
                        }
                        
                        .slide-content p, .slide-content div {
                          text-align: left !important;
                          margin: 0 !important;
                          padding: 0 !important;
                        }
                        
                        .slide-content p:first-child {
                          margin-top: 0 !important;
                          padding-top: 0 !important;
                        }
                      </style>
                      <div class="slide-content">${item.content}</div>
                    </div>
                  ` }}
                                style={{
                                  width: "100%",
                                  padding: "0px",
                                  margin: "0px",
                                  fontSize: item.fontSize || "16px",
                                  fontFamily: item.fontFamily || "Georgia, serif",
                                  color: item.fontColor || "#8B4513",
                                }}
                                className="memory-card-content"
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
