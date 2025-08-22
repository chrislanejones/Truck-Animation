import React, { useEffect, useState } from "react";

const Loading = ({ progress = 0 }) => {
  const [displayProgress, setDisplayProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Loading assets...");

  // Smooth progress animation - prevents backwards movement
  useEffect(() => {
    const targetProgress = Math.max(0, Math.min(100, progress));

    // Update loading text based on progress
    if (targetProgress < 20) {
      setLoadingText("Loading 3D models...");
    } else if (targetProgress < 40) {
      setLoadingText("Loading character...");
    } else if (targetProgress < 60) {
      setLoadingText("Loading animations...");
    } else if (targetProgress < 80) {
      setLoadingText("Loading textures...");
    } else if (targetProgress < 100) {
      setLoadingText("Almost ready...");
    } else {
      setLoadingText("Complete!");
    }

    // Smooth progress transition
    const duration = 300; // ms
    const startTime = Date.now();
    const startProgress = displayProgress;
    const progressDiff = targetProgress - startProgress;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progressRatio = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOut = 1 - Math.pow(1 - progressRatio, 3);
      const newProgress = startProgress + progressDiff * easeOut;

      setDisplayProgress(newProgress);

      if (progressRatio < 1) {
        requestAnimationFrame(animate);
      }
    };

    // Only animate if progress is moving forward
    if (targetProgress > displayProgress) {
      requestAnimationFrame(animate);
    }
  }, [progress, displayProgress]);

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="text-center">
        {/* Loading Text */}
        <h2 className="text-white text-2xl font-light mb-8 tracking-wide">
          Loading
        </h2>

        {/* Progress Bar Container */}
        <div className="w-80 bg-gray-800 rounded-full h-3 overflow-hidden shadow-inner">
          {/* Progress Bar Fill */}
          <div
            className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-300 ease-out relative"
            style={{ width: `${displayProgress}%` }}
          >
            {/* Animated shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
          </div>
        </div>

        {/* Progress Info */}
        <div className="flex justify-between items-center mt-4 text-sm w-80">
          <span className="text-gray-400">{loadingText}</span>
          <span className="text-cyan-300 font-mono">
            {Math.round(displayProgress)}%
          </span>
        </div>

        {/* Loading indicator dots */}
        <div className="flex justify-center space-x-1 mt-6">
          <div
            className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"
            style={{ animationDelay: "0ms" }}
          ></div>
          <div
            className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"
            style={{ animationDelay: "200ms" }}
          ></div>
          <div
            className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"
            style={{ animationDelay: "400ms" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
