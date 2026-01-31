"use client";

import React from "react";

interface ErrorMessageProps {
  message?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message = "Something went wrong!",
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 p-6 bg-red-100 text-red-800 rounded-lg border border-red-300 min-h-[100px]">
      <svg
        className="w-10 h-10"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <p className="text-center font-medium">{message}</p>
    </div>
  );
};
