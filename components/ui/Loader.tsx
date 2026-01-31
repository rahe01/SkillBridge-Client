"use client";

import React from "react";

interface LoaderProps {
  size?: number; // spinner size in px
  text?: string; // optional loading text
}

export const Loader: React.FC<LoaderProps> = ({ size = 6, text }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <svg
        className={`animate-spin h-${size} w-${size} text-blue-600`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        ></path>
      </svg>
      {text && <p className="text-gray-700 dark:text-gray-300">{text}</p>}
    </div>
  );
};
