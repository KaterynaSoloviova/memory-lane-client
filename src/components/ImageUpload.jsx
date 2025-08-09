import { useState, useRef } from "react";

const ImageUpload = ({ onUploadSuccess, compact = false }) => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const uploadImage = async () => {
    if (!image) return alert("Please choose a file first!");
    setUploading(true);

    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "wombat-kombat");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dtjylc9ny/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const result = await res.json();

      if (result.secure_url) {
        console.log("Uploaded image URL:", result.secure_url);
        onUploadSuccess(result.secure_url);
        alert("Upload success!");
      } else {
        alert("Upload failed — no URL returned.");
      }
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={`form-control w-full`}>
      <label className="label">
        <span className="label-text font-semibold">Upload Image</span>
      </label>

      {/* Hidden native file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />

      {/* Clickable placeholder or preview */}
      <div
        onClick={() => fileInputRef.current.click()}
        className={`cursor-pointer border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center text-gray-500 hover:border-emerald-700 hover:text-emerald-700 transition-colors duration-200
          ${compact ? "p-2 min-h-[80px]" : "p-8 min-h-[150px]"}
        `}
      >
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className={`object-contain rounded ${
              compact ? "max-h-16" : "max-h-48"
            } w-full`}
          />
        ) : (
          <span>
            {compact
              ? "Click to upload image"
              : "Click here to choose an image"}
          </span>
        )}
      </div>

      <button
        type="button"
        onClick={uploadImage}
        disabled={uploading}
        className={`px-4 py-2 text-sm font-medium text-white bg-[#d89d20]/80 hover:bg-[#be6406]/90 rounded-lg transition-colors w-full ${
          compact ? "py-1" : "py-2"
        }`}
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
};

export default ImageUpload;
