import React from "react";

const Loading = ({ progress = 0 }) => {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="text-center">
        {/* Loading Text */}
        <h2 className="text-white text-2xl font-light mb-8 tracking-wide">
          Loading
        </h2>

        {/* Progress Bar */}
        <div className="w-80 bg-gray-700 rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-white rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Progress Percentage */}
        <div className="text-gray-400 text-sm mt-4 font-mono">
          {Math.round(progress)}%
        </div>
      </div>
    </div>
  );
};

export default Loading;
