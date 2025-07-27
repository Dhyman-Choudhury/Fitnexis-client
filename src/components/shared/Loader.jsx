import React from 'react';

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen container dark:bg-gray-900 space-y-6">
      <div className="relative w-24 h-24">
        {/* Outer gradient spinning ring */}
        <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-b-transparent border-l-blue-500 border-r-purple-500 animate-spin"></div>

        {/* Inner glowing pulse */}
        <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 animate-pulse blur-sm"></div>

        {/* Center glow dot */}
        <div className="absolute inset-8 rounded-full bg-blue-500 dark:bg-purple-500 shadow-lg shadow-blue-500/50 dark:shadow-purple-500/40"></div>
      </div>

      {/* Shimmering "Loading..." text */}
      <div className="relative">
        <span className="text-xl font-semibold text-gray-200 dark:text-gray-200">
          Loading<span className="animate-pulse">...</span>
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-200 to-transparent dark:via-purple-400 animate-[shimmer_2s_infinite] bg-[length:200%_100%]" />
      </div>

      {/* Tailwind keyframes if you want to include custom shimmer */}
      <style>
        {`
          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
        `}
      </style>
    </div>
  );
};

export default Loader;
