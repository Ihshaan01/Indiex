import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function GamePage() {
  const unityCanvasRef = useRef(null);
  const unityInstanceRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const location = useLocation();

  const loadUnityGame = () => {
    setLoading(true);
    const script = document.createElement("script");
    script.src = "/assets/unity/Build/TestBuilds.loader.js";
    script.async = true;

    script.onload = () => {
      if (window.createUnityInstance) {
        createUnityInstance(unityCanvasRef.current, {
          dataUrl: "/assets/unity/Build/TestBuilds.data.gz",
          frameworkUrl: "/assets/unity/Build/TestBuilds.framework.js.gz",
          codeUrl: "/assets/unity/Build/TestBuilds.wasm.gz",
          id: "unity-canvas",
        })
          .then((instance) => {
            console.log("Unity game loaded successfully:", instance);
            unityInstanceRef.current = instance;
            setLoading(false);
          })
          .catch((err) => {
            console.error("Error loading Unity game:", err);
            setError("Failed to load the game: " + err.message);
            setLoading(false);
          });
      } else {
        setError("Unity loader not available.");
        setLoading(false);
      }
    };

    script.onerror = () => {
      console.error("Failed to load TestBuilds.loader.js");
      setError("Failed to load Unity script.");
      setLoading(false);
    };

    document.body.appendChild(script);
  };

  useEffect(() => {
    return () => {
      console.log("Unmounting or navigating away from GamePage...");
      if (unityInstanceRef.current) {
        console.log("Attempting to quit Unity instance...");
        unityInstanceRef.current
          .Quit()
          .then(() => {
            console.log("Unity instance quit successfully");
            const audios = document.querySelectorAll("audio");
            audios.forEach((audio) => audio.pause());

            if (window.AudioContext) {
              try {
                const audioCtx = new window.AudioContext();
                audioCtx.suspend().then(() => {
                  console.log("Audio context suspended");
                });
                audioCtx.close().then(() => {
                  console.log("Audio context closed");
                });
              } catch (error) {
                console.warn("Audio context cleanup failed:", error);
              }
            }
            unityInstanceRef.current = null;
          })
          .catch((err) => {
            console.error("Error quitting Unity:", err);
          });
      } else {
        console.log("No Unity instance to quit");
      }
    };
  }, [location]);

  const handleStartGame = () => {
    if (!gameStarted) {
      setGameStarted(true);
      loadUnityGame();
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-4 text-center">
            Play Unity Game
          </h1>

          {/* Fake Canvas with Play Button */}
          {!gameStarted && !loading && !error && (
            <div
              className="w-full max-w-4xl mx-auto bg-black relative"
              style={{
                height: "600px",
                border: "1px solid white",
              }}
            >
              <button
                onClick={handleStartGame}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-xl"
              >
                Play
              </button>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div
              className="w-full max-w-4xl mx-auto bg-black flex items-center justify-center"
              style={{
                height: "600px",
                border: "1px solid white",
              }}
            >
              <p className="text-center">Loading game...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div
              className="w-full max-w-4xl mx-auto bg-black flex items-center justify-center"
              style={{
                height: "600px",
                border: "1px solid white",
              }}
            >
              <p className="text-center text-red-500">{error}</p>
            </div>
          )}

          {/* Unity Canvas */}
          <canvas
            ref={unityCanvasRef}
            id="unity-canvas"
            className="w-full max-w-4xl mx-auto bg-black"
            style={{
              height: "600px",
              border: "1px solid white",
              display: gameStarted && !loading && !error ? "block" : "none",
            }}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default GamePage;
