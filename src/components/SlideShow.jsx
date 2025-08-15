import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { memoryStyles } from "../utils/styles";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

export default function SlideShow({
  items,
  autoplay = false, // Changed default to false
  interval = 5000,
  backgroundMusic = null,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [slideshowActive, setSlideshowActive] = useState(false); // New state for slideshow control
  const [slideshowFinished, setSlideshowFinished] = useState(false); // New state to track if slideshow finished
  const audioRef = useRef(null);
  const videoRef = useRef(null);
  const timerRef = useRef(null);

  const currentItem = items[currentIndex];
  const isVideo = currentItem.type === "video";
  const [isPaused, setIsPaused] = useState(false);

  // Clear any existing timer
  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  // Go to the next slide after pause
  const resumeSlideshow = () => {
    setIsPaused(false);
    nextSlide(); // immediately go to next slide
  };

  // Navigation helpers
  const nextSlide = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex >= items.length) {
      // Slideshow finished
      setSlideshowFinished(true);
      setSlideshowActive(false);
      setIsPaused(false);
      clearTimer();
      return;
    }
    setCurrentIndex(nextIndex);
  };
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  // Start slideshow function
  const startSlideshow = () => {
    setSlideshowActive(true);
    setSlideshowFinished(false);
    setCurrentIndex(0);
    setIsPaused(false);
    
    // Start background music if available
    if (audioRef.current && backgroundMusic) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {
        // Audio might be blocked, but slideshow can continue
      });
    }
  };

  // Restart slideshow function
  const restartSlideshow = () => {
    setSlideshowFinished(false);
    setSlideshowActive(false);
    setCurrentIndex(0);
    setIsPaused(false);
    clearTimer();
  };

  // Single useEffect for slide timer and video playback
  useEffect(() => {
    clearTimer();

    if (!slideshowActive || isPaused) return; // <-- stop if slideshow not active or paused

    if (isVideo && videoRef.current) {
      const video = videoRef.current;
      video.currentTime = 0;

      const handleLoadedMetadata = () => {
        // Set up a fallback timer based on video duration as backup
        if (video.duration && isFinite(video.duration)) {
          const fallbackTimer = setTimeout(() => {
            nextSlide();
          }, (video.duration + 2) * 1000); // Add 2 second buffer

          // Store the timer reference to clear it later
          video._fallbackTimer = fallbackTimer;
        }
      };

      // Add fallback timer listener
      video.addEventListener("loadedmetadata", handleLoadedMetadata);

      video.play().catch((e) => {
        console.warn("Video play failed:", e);
        // If play fails, advance to next slide after 2 seconds
        setTimeout(() => nextSlide(), 2000);
      });

      return () => {
        if (video) {
          video.pause();
          video.removeEventListener("loadedmetadata", handleLoadedMetadata);

          // Clear fallback timer if it exists
          if (video._fallbackTimer) {
            clearTimeout(video._fallbackTimer);
            delete video._fallbackTimer;
          }
        }
      };
    } else if (!isVideo) {
      // Only set timer for non-video items
      timerRef.current = setTimeout(() => {
        nextSlide();
      }, interval);
      return () => clearTimer();
    }
  }, [currentIndex, slideshowActive, interval, isVideo, isPaused]);

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
    if (audioRef.current && backgroundMusic) {
      audioRef.current.volume = volume;
      audioRef.current.loop = true;
      // Don't auto-play audio - wait for slideshow to start
    }
  }, [backgroundMusic, volume]);

  // Update audio source when backgroundMusic changes
  useEffect(() => {
    if (audioRef.current && backgroundMusic) {
      audioRef.current.src = backgroundMusic;
      audioRef.current.load();
      // Don't auto-play audio - wait for slideshow to start
    }
  }, [backgroundMusic]);

  const slideVariants = {
    enter: { opacity: 0, y: 30, rotate: -2 },
    center: { opacity: 1, y: 0, rotate: 0 },
    exit: { opacity: 0, y: -30, rotate: 2 },
  };

  return (
    <div className="w-full p-0">
      <div className="relative w-full h-[80vh]">
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
              height: "80vh",
              backgroundColor: "#f9f5e8",
              backgroundImage: "url('/paper-texture.png')",
              backgroundSize: "cover",
            }}
          >
            {isVideo ? (
              <video
                ref={videoRef}
                src={currentItem.content}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  width: "100%",
                  height: "100%",
                  objectFit: "contain"
                }}
                controls={false}
                autoPlay
                muted={false}
                playsInline
                loop={false}
                preload="metadata"
                onError={(e) => {
                  console.error("Video error:", e);
                  // If video fails to load, move to next slide after 2 seconds
                  setTimeout(() => nextSlide(), 2000);
                }}
                onEnded={() => {
                  nextSlide();
                }}
              />
            ) : (
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
                    currentItem.fontFamily ||
                    memoryStyles[currentItem.style]?.fontFamily ||
                    memoryStyles.default.fontFamily,
                  fontSize:
                    currentItem.fontSize ||
                    memoryStyles[currentItem.style]?.fontSize ||
                    memoryStyles.default.fontSize,
                  color:
                    currentItem.fontColor ||
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
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons - only show when slideshow is active */}
        {slideshowActive && (
          <>
            <button
              onClick={() => {
                clearTimer();
                prevSlide();
              }}
              className="absolute left-[-60px] top-1/2 -translate-y-1/2 bg-[#d4c5a3] text-[#4a3f35] p-3 rounded-full shadow hover:bg-[#c0af8f] transition"
            >
              ◀
            </button>
            <button
              onClick={() => {
                clearTimer();
                nextSlide();
              }}
              className="absolute right-[-60px] top-1/2 -translate-y-1/2 bg-[#d4c5a3] text-[#4a3f35] p-3 rounded-full shadow hover:bg-[#c0af8f] transition"
            >
              ▶
            </button>
          </>
        )}
      </div>

      {/* Slide Counter */}
      <div className="mt-4 text-center text-sm text-[#7a6a57] mb-4">
        {slideshowActive ? (
          `${currentIndex + 1} / ${items.length}`
        ) : slideshowFinished ? (
          "Slideshow completed! 🎉"
        ) : (
          "Click 'Start Slideshow' to begin"
        )}
      </div>

      {/* Background Music Audio Element */}
      {backgroundMusic && <audio ref={audioRef} src={backgroundMusic} preload="metadata" />}

      {/* Slideshow Controls */}
      <div className="mb-4 flex items-center justify-center gap-4 bg-[#f9f5e8] p-3 rounded-lg border border-[#d4c5a3]">
        {/* Show different controls based on slideshow state */}
        {!slideshowActive && !slideshowFinished ? (
          // Start slideshow button
          <button
            onClick={startSlideshow}
            className="flex items-center gap-2 bg-gradient-to-r from-[#CD853F] to-[#D2691E] hover:from-[#D2691E] hover:to-[#CD853F] text-white px-6 py-3 rounded-full font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <Play size={18} />
            Start Slideshow
          </button>
        ) : slideshowFinished ? (
          // Slideshow finished - show restart button
          <button
            onClick={restartSlideshow}
            className="flex items-center gap-2 bg-gradient-to-r from-[#CD853F] to-[#D2691E] hover:from-[#D2691E] hover:to-[#CD853F] text-white px-6 py-3 rounded-full font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <Play size={18} />
            Restart Slideshow
          </button>
        ) : (
          // Slideshow active - show pause/resume button
          <button
            onClick={() => {
              if (isPaused) resumeSlideshow();
              else setIsPaused(true);
            }}
            className="flex items-center gap-2 bg-[#d4c5a3] text-[#4a3f35] px-4 py-2 rounded-full hover:bg-[#c0af8f] transition-colors"
          >
            {isPaused ? <Play size={18} /> : <Pause size={18} />}
            {isPaused ? "Resume Slideshow" : "Pause Slideshow"}
          </button>
        )}

        {/* Background Music Controls - only show when slideshow is active */}
        {backgroundMusic && slideshowActive && (
          <>
            <button
              onClick={togglePlayPause}
              className="flex items-center gap-2 bg-[#d4c5a3] text-[#4a3f35] px-4 py-2 rounded-full hover:bg-[#c0af8f] transition-colors"
            >
              {isPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />}
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
                  background: `linear-gradient(to right, #d4c5a3 0%, #d4c5a3 ${volume * 100
                    }%, #e8e0d0 ${volume * 100}%, #e8e0d0 100%)`,
                }}
              />
            </div>
          </>
        )}
      </div>

    </div>
  );
}
