import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { memoryStyles } from "../utils/styles";
import { Play, Pause, Volume2 } from "lucide-react";

export default function SlideShow({
  items,
  autoplay = true,
  interval = 5000,
  backgroundMusic = "/music/presentation-music-1.mp3",
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef(null);

  // Go to next slide
  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % items.length);
  const prevSlide = () =>
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);

  // Autoplay effect
  useEffect(() => {
    if (!autoplay) return;
    const timer = setInterval(() => {
      nextSlide();
    }, interval);
    return () => clearInterval(timer); // cleanup
  }, [autoplay, interval, items.length]);

  // Audio control functions
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  // Initialize audio when component mounts
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.loop = true;
      // Auto-play music when slideshow opens
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((error) => {
        console.log("Auto-play prevented by browser:", error);
        // Browser might block auto-play, so we keep the play button visible
      });
    }
  }, []);

  // Handle background music changes
  useEffect(() => {
    if (audioRef.current && backgroundMusic) {
      audioRef.current.src = backgroundMusic;
      audioRef.current.load();
      // Auto-play new music
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((error) => {
        console.log("Auto-play prevented by browser:", error);
      });
    }
  }, [backgroundMusic]);

  const currentItem = items[currentIndex];

  const slideVariants = {
    enter: { opacity: 0, y: 30, rotate: -2 },
    center: { opacity: 1, y: 0, rotate: 0 },
    exit: { opacity: 0, y: -30, rotate: 2 },
  };

  return (
    <div className="max-w-3xl mx-auto p-6">


      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="rounded-lg shadow-lg p-6 border border-[#d4c5a3]"
            style={{
              height: "500px",
              backgroundColor: "#f9f5e8",
              backgroundImage: "url('/paper-texture.png')", // Add a retro paper texture
              backgroundSize: "cover",
            }}
          >
            <motion.div
              className="w-full h-full flex items-center justify-center text-center px-4"
              style={{
                backgroundColor:
                  memoryStyles[currentItem.style]?.backgroundColor ||
                  memoryStyles.default.backgroundColor,
                backgroundImage:
                  memoryStyles[currentItem.style]?.backgroundImage || "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
                fontFamily:
                  memoryStyles[currentItem.style]?.fontFamily ||
                  memoryStyles.default.fontFamily,
                fontSize:
                  memoryStyles[currentItem.style]?.fontSize ||
                  memoryStyles.default.fontSize,
                color:
                  memoryStyles[currentItem.style]?.color ||
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
              whileHover={{ scale: 1.02 }}
              dangerouslySetInnerHTML={{ __html: currentItem.content }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-[-60px] top-1/2 -translate-y-1/2 bg-[#d4c5a3] text-[#4a3f35] p-3 rounded-full shadow hover:bg-[#c0af8f] transition"
        >
          ◀
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-[-60px] top-1/2 -translate-y-1/2 bg-[#d4c5a3] text-[#4a3f35] p-3 rounded-full shadow hover:bg-[#c0af8f] transition"
        >
          ▶
        </button>
      </div>

      {/* Slide Counter */}
      <div className="mt-4 text-center text-sm text-[#7a6a57]">
        {currentIndex + 1} / {items.length}
      </div>

      {/* Background Music Audio Element */}
      <audio ref={audioRef} src={backgroundMusic} preload="metadata" />
      <br />

      {/* Music Controls */}
      <div className="mb-4 flex items-center justify-center gap-4 bg-[#f9f5e8] p-3 rounded-lg border border-[#d4c5a3]">
        <button
          onClick={togglePlayPause}
          className="flex items-center gap-2 bg-[#d4c5a3] text-[#4a3f35] px-4 py-2 rounded-full hover:bg-[#c0af8f] transition-colors"
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          {isPlaying ? "Pause Music" : "Play Music"}
        </button>

        <div className="flex items-center gap-2">
          <Volume2 size={18} className="text-[#4a3f35]" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            className="w-20 h-2 bg-[#d4c5a3] rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #d4c5a3 0%, #d4c5a3 ${volume * 100}%, #e8e0d0 ${volume * 100}%, #e8e0d0 100%)`
            }}
          />
        </div>
      </div>
    </div>
  );
}
