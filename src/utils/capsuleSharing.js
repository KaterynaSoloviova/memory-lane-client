import QRCode from 'qrcode';

/**
 * Generate a sharing URL for a capsule
 * @param {string} capsuleId - The ID of the capsule
 * @param {string} baseUrl - The base URL of the application
 * @returns {string} The sharing URL
 */
export const generateSharingUrl = (capsuleId, baseUrl = window.location.origin) => {
  return `${baseUrl}/signup?capsule=${capsuleId}`;
};

/**
 * Generate a QR code data URL for a sharing URL
 * @param {string} sharingUrl - The sharing URL
 * @returns {Promise<string>} The QR code as a data URL
 */
export const generateQRCode = async (sharingUrl) => {
  try {
    const qrCodeDataUrl = await QRCode.toDataURL(sharingUrl, {
      width: 200,
      margin: 2,
      color: {
        dark: '#8B4513', // Vintage brown color
        light: '#fefcf8' // Light cream background
      }
    });
    return qrCodeDataUrl;
  } catch (error) {
    console.error('Error generating QR code:', error);
    return null;
  }
};

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} Success status
 */
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Error copying to clipboard:', error);
    return false;
  }
};
