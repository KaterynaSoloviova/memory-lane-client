/**
 * Cloudinary upload utility function
 * Handles uploading files (images, videos, audio) to Cloudinary
 */

import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from '../config/config';

/**
 * Upload a file to Cloudinary
 * @param {File} file - The file to upload
 * @param {string} resourceType - The type of resource ('image', 'video', 'raw', 'auto')
 * @returns {Promise<string>} - The secure URL of the uploaded file
 */
export const cloudinaryUpload = async (file, resourceType = 'auto') => {
  if (!file) {
    throw new Error('No file provided for upload');
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  // Determine the correct endpoint based on resource type
  const baseUrl = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}`;
  let endpoint;
  switch (resourceType) {
    case 'image':
      endpoint = `${baseUrl}/image/upload`;
      break;
    case 'video':
    case 'audio':
      endpoint = `${baseUrl}/video/upload`;
      break;
    case 'raw':
      endpoint = `${baseUrl}/raw/upload`;
      break;
    case 'auto':
    default:
      // Auto-detect based on file type
      if (file.type.startsWith('image/')) {
        endpoint = `${baseUrl}/image/upload`;
      } else if (file.type.startsWith('video/') || file.type.startsWith('audio/')) {
        endpoint = `${baseUrl}/video/upload`;
      } else {
        endpoint = `${baseUrl}/raw/upload`;
      }
      break;
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed with status: ${response.status}`);
    }

    const result = await response.json();

    if (!result.secure_url) {
      throw new Error('Upload failed - no URL returned');
    }

    return result.secure_url;
  } catch (error) {
    console.error('Cloudinary upload failed:', error);
    throw new Error(`Upload failed: ${error.message}`);
  }
};

/**
 * Upload an image to Cloudinary
 * @param {File} file - The image file to upload
 * @returns {Promise<string>} - The secure URL of the uploaded image
 */
export const uploadImage = (file) => cloudinaryUpload(file, 'image');

/**
 * Upload a video to Cloudinary
 * @param {File} file - The video file to upload
 * @returns {Promise<string>} - The secure URL of the uploaded video
 */
export const uploadVideo = (file) => cloudinaryUpload(file, 'video');

/**
 * Upload audio to Cloudinary
 * @param {File} file - The audio file to upload
 * @returns {Promise<string>} - The secure URL of the uploaded audio
 */
export const uploadAudio = (file) => cloudinaryUpload(file, 'audio');
