export {};

import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./FaceRecognitionWebcam.css";
import { loadTmImage } from "@/lib/tmImageLoader";

// Add global declaration for tmImage
declare global {
  interface Window {
    tmImage: {
      load: (
        modelUrl: string,
        metadataUrl: string
      ) => Promise<{
        predict: (
          input: HTMLVideoElement
        ) => Promise<Array<{ className: string; probability: number }>>;
      }>;
    };
  }
}

interface FaceRecognitionWebcamProps {
  onRecognized?: (label: string) => void;
}

const FaceRecognitionWebcam: React.FC<FaceRecognitionWebcamProps> = ({
  onRecognized,
}) => {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const recognizedLabelsRef = useRef<{ Prakhar: boolean; Hemang: boolean }>({
    Prakhar: false,
    Hemang: false,
  });
  const modelRef = useRef<{
    predict: (
      input: HTMLVideoElement
    ) => Promise<Array<{ className: string; probability: number }>>;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [id, setId] = useState("");
  const [pass, setPass] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    const MODEL_URL =
      "https://teachablemachine.withgoogle.com/models/8LsIbRnqg/";
    let webcamReady = false;
    let modelReady = false;

    const startVideo = () => {
      console.log("Attempting to access webcam...");
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          console.log("Webcam stream obtained.");
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.onloadedmetadata = () => {
              webcamReady = true;
              console.log("Webcam metadata loaded.");
              maybeStartPrediction();
            };
          }
        })
        .catch((err) => {
          console.error("Error accessing webcam:", err);
          const advice = [
            "Make sure you allowed webcam access when prompted.",
            "Check browser settings and site permissions for camera access.",
            "Ensure your device has a working webcam.",
            "Close other apps that might be using the webcam.",
            "Use HTTPS or localhost (not HTTP) for webcam access.",
            "Try a different browser or disable incognito/private mode.",
          ].join(" ");
          setError("Error accessing webcam: " + err.message + ". " + advice);
          setLoading(false);
        });
    };

    const maybeStartPrediction = () => {
      console.log("maybeStartPrediction called", { webcamReady, modelReady });
      if (webcamReady && modelReady && videoRef.current && modelRef.current) {
        setLoading(false);
        intervalId = setInterval(async () => {
          if (!videoRef.current || !modelRef.current) return;
          try {
            const prediction = await modelRef.current.predict(videoRef.current);
            console.log("Prediction result:", prediction);
            let foundPrakhar = recognizedLabelsRef.current.Prakhar;
            let foundHemang = recognizedLabelsRef.current.Hemang;
            prediction.forEach((p) => {
              if (p.className === "Prakhar" && p.probability > 0.85) {
                foundPrakhar = true;
                recognizedLabelsRef.current.Prakhar = true;
              }
              if (p.className === "Hemang" && p.probability > 0.85) {
                foundHemang = true;
                recognizedLabelsRef.current.Hemang = true;
              }
            });
            if (foundPrakhar && foundHemang) {
              console.log("Both Prakhar and Hemang recognized.");
              if (onRecognized) {
                onRecognized("success");
              }
              router.push("/");
              if (intervalId) {
                clearInterval(intervalId);
              }
            }
          } catch (err) {
            console.error("Prediction error:", err);
            setError("Prediction error: " + (err as Error).message);
            setLoading(false);
            if (intervalId) clearInterval(intervalId);
          }
        }, 500);
      }
    };

    (async () => {
      setLoading(true);
      setError(null);
      try {
        console.log("Loading Teachable Machine tmImage library...");
        await loadTmImage();
        const tmImage = window.tmImage;
        if (!tmImage || typeof tmImage.load !== "function") {
          console.error("Teachable Machine tmImage library failed to load.");
          setError("Teachable Machine tmImage library failed to load.");
          setLoading(false);
          return;
        }
        console.log("Loading model from", MODEL_URL);
        modelRef.current = await tmImage.load(
          MODEL_URL + "model.json",
          MODEL_URL + "metadata.json"
        );
        modelReady = true;
        console.log("Model loaded successfully.");
        maybeStartPrediction();
        startVideo();
      } catch (err) {
        console.error("Model load error:", err);
        setError("Model load error: " + (err as Error).message);
        setLoading(false);
      }
    })();
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [onRecognized, router]);

  return (
    <div className="face-recognition-container face-recognition-flex">
      {/* Webcam video is now a floating overlay in the bottom-right corner */}
      <div className="fixed bottom-6 right-6 z-50 shadow-2xl rounded-xl overflow-hidden border-2 border-cyan-400/60 bg-slate-900/80 backdrop-blur-lg" style={{ width: 320, height: 240 }}>
        <div className="p-2 flex flex-col items-center">
          <h3 className="text-cyan-200 text-xs mb-1">Webcam</h3>
          {loading && <div className="face-recognition-loading text-xs">Loading model and webcam...</div>}
          {error && <div className="face-recognition-error text-xs">{error}</div>}
          <video
            ref={videoRef}
            autoPlay
            muted
            width={300}
            height={200}
            className={`face-recognition-video${loading || error ? ' face-recognition-video-hidden' : ''} rounded-lg`}
            style={{ background: '#0f172a' }}
          />
        </div>
      </div>
      <div className="text-white face-recognition-login-panel">
        <div className="face-recognition-login-box">
          <h3>Secondary Login Method</h3>
          <form
            className="face-recognition-login-form"
            onSubmit={(e) => {
              e.preventDefault();
              if (id === "1" && pass === "APAP") {
                setLoginError(null);
                if (onRecognized) onRecognized("success");
                router.push("/");
              } else {
                setLoginError("Invalid ID or Password.");
              }
            }}
          >
            <label>
              ID:
              <input
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />
            </label>
            <button type="submit">Login</button>
            {loginError && (
              <div className="face-recognition-login-error">{loginError}</div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default FaceRecognitionWebcam;
