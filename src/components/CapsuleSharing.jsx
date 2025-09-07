import { useState, useEffect } from 'react';
import { generateSharingUrl, generateQRCode, copyToClipboard } from '../utils/capsuleSharing';
import { Copy, QrCode, Share2, Check, Share } from 'lucide-react';
import { VintageContainer, VintageOrnament, vintageClasses } from '../utils/vintageStyles.jsx';

function CapsuleSharing({ capsuleId, capsuleTitle }) {
  const [sharingUrl, setSharingUrl] = useState('');
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [showSharing, setShowSharing] = useState(false);


  useEffect(() => {
    if (capsuleId) {
      const url = generateSharingUrl(capsuleId);
      setSharingUrl(url);
      
      // Generate QR code
      generateQRCode(url).then(dataUrl => {
        if (dataUrl) {
          setQrCodeDataUrl(dataUrl);
        }
      });
    }
  }, [capsuleId]);

  const handleCopyUrl = async () => {
    const success = await copyToClipboard(sharingUrl);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Join my time capsule: ${capsuleTitle}`,
          text: `I've created a time capsule called "${capsuleTitle}". Join me to see it when it unlocks!`,
          url: sharingUrl,
        });
      } catch (error) {
        console.error('Error sharing:', error);
        // Fallback to copying URL
        handleCopyUrl();
      }
    } else {
      // Fallback to copying URL
      handleCopyUrl();
    }
  };

  if (!sharingUrl) return null;

  return (
    <div className="mt-6">
      <button
        onClick={() => setShowSharing(!showSharing)}
        className="w-full flex items-center justify-between font-bold text-xl text-[#8B4513] mb-2 hover:text-[#CD853F] transition-colors p-3 border-2 border-[#e8d5b7] rounded-lg bg-[#fefcf8] hover:bg-[#f8f3ec] hover:border-[#CD853F]"
        style={{ fontFamily: 'Georgia, serif' }}
      >
        <div className="flex items-center gap-3">
          <Share2 className="w-6 h-6" />
          <span>Share Capsule</span>
          <span className="text-sm text-[#A0522D] opacity-75">(Click to expand)</span>
        </div>
        <div className="flex items-center">
          <span className="text-lg">
            {showSharing ? '−' : '+'}
          </span>
        </div>
      </button>

      {showSharing && (
        <VintageContainer className="p-6">
          <div className="flex justify-center mb-4">
            <Share className="w-8 h-8 text-[#CD853F]" />
          </div>
          <h3 className="text-2xl font-bold text-center mb-4 text-[#8B4513]" style={{ fontFamily: 'Georgia, serif' }}>
            Share Your Time Capsule
          </h3>
          <p className="text-center text-[#A0522D] mb-6" style={{ fontFamily: 'Georgia, serif' }}>
            Share this link or QR code with others! They'll be taken to the signup page and automatically join your time capsule after creating an account.
          </p>

          {/* Sharing URL */}
          <div className="mb-6">
            <label className="block font-semibold text-[#8B4513] mb-2" style={{ fontFamily: 'Georgia, serif' }}>
              Sharing Link
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={sharingUrl}
                readOnly
                className="flex-1 border-2 border-[#e8d5b7] rounded-lg px-4 py-3 bg-[#fefcf8] text-[#8B4513] text-sm"
              />
              <button
                onClick={handleCopyUrl}
                className={`px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
                  copied
                    ? 'bg-green-500 text-white'
                    : 'bg-gradient-to-r from-[#CD853F] to-[#D2691E] hover:from-[#D2691E] hover:to-[#CD853F] text-white'
                }`}
              >
                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>

          {/* QR Code */}
          {qrCodeDataUrl && (
            <div className="text-center">
              <label className="block font-semibold text-[#8B4513] mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                QR Code
              </label>
              <div className="inline-block p-4 bg-white rounded-lg border-2 border-[#e8d5b7]">
                <img
                  src={qrCodeDataUrl}
                  alt="QR Code for capsule sharing"
                  className="w-48 h-48"
                />
              </div>
              <p className="text-sm text-[#A0522D] mt-2" style={{ fontFamily: 'Georgia, serif' }}>
                Scan this QR code to join the capsule
              </p>
            </div>
          )}

          {/* Share Button */}
          <div className="text-center mt-6">
            <button
              onClick={handleShare}
              className={`${vintageClasses.button.primary} flex items-center justify-center mx-auto`}
            >
              <Share2 className="w-5 h-5 mr-2" />
              Share via Device
            </button>
          </div>

          <VintageOrnament size="sm" symbol="✦" />
        </VintageContainer>
      )}
    </div>
  );
}

export default CapsuleSharing;
