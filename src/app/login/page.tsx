"use client"
// TypeScript declarations for Teachable Machine

import React, { useState } from "react";
import FaceRecognitionWebcam from "@/components/FaceRecognitionWebcam";

export default function LoginPage() {
  const [showWebcam, setShowWebcam] = useState(false);
  const [success, setSuccess] = useState(false);

  // Callback for FaceRecognitionWebcam
  const handleRecognition = (label: string) => {
    if (label === "success") {
      setSuccess(true);
      setShowWebcam(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#0f2027] via-[#2c5364] to-[#1a2980]">
      <div className="rounded-xl shadow-2xl bg-[#181f2a] p-8 flex flex-col items-center gap-6 border border-[#2c5364]">
        <h1 className="text-3xl font-bold text-[#00fff7] mb-4 tracking-wide">Login</h1>
        {!showWebcam && !success && (
          <button
            type="button"
            className="neon-button px-8 py-3 text-lg font-semibold rounded-lg bg-[#00fff7] text-[#181f2a] shadow-lg hover:bg-[#00c6ff] transition-all duration-200"
            onClick={() => setShowWebcam(true)}
          >
            Open Webcam
          </button>
        )}
        {showWebcam && !success && (
          <div className="mt-4">
            <FaceRecognitionWebcam onRecognized={handleRecognition} />
          </div>
        )}
        {success && (
          <div className="text-[#00fff7] mt-2 text-xl font-bold">Login Successful! Welcome.</div>
        )}
      </div>
    </div>
  );
}
