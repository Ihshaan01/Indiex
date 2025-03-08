import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import JSZip from "jszip";
import pako from "pako"; // Import pako for gzip decompression

function GamePage() {
  const unityCanvasRef = useRef(null);
  const unityInstanceRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const location = useLocation();

  const loadUnityGameFromZip = async () => {
    setLoading(true);
    try {
      // Step 1: Fetch the ZIP file from Cloudinary
      const zipUrl =
        "https://res.cloudinary.com/dxlr5sh9k/raw/upload/v1741435180/WordSlotWebGLTestBuild_e6pq3n.zip";
      const response = await fetch(zipUrl, { mode: "cors" });
      if (!response.ok) throw new Error("Failed to fetch ZIP file");

      const zipData = await response.arrayBuffer();

      // Step 2: Extract the ZIP contents using JSZip
      const zip = new JSZip();
      const extracted = await zip.loadAsync(zipData);

      // Step 3: Extract required Unity files
      const files = {};
      await Promise.all(
        Object.keys(extracted.files).map(async (filename) => {
          if (
            filename.endsWith(".loader.js") ||
            filename.endsWith(".data.gz") ||
            filename.endsWith(".framework.js.gz") ||
            filename.endsWith(".wasm.gz")
          ) {
            const blob = await extracted.file(filename).async("blob");
            if (filename.endsWith(".gz")) {
              // Decompress .gz files using pako
              const arrayBuffer = await blob.arrayBuffer();
              const decompressed = pako.inflate(new Uint8Array(arrayBuffer));
              files[filename.replace(".gz", "")] = new Blob([decompressed]);
            } else {
              files[filename] = blob;
            }
            console.log(`Processed ${filename}`);
          }
        })
      );

      // Step 4: Dynamically find the Unity files
      let loaderFile, dataFile, frameworkFile, wasmFile;
      for (const filename of Object.keys(files)) {
        if (filename.endsWith(".loader.js")) {
          loaderFile = filename;
        } else if (filename.endsWith(".data")) {
          dataFile = filename;
        } else if (filename.endsWith(".framework.js")) {
          frameworkFile = filename;
        } else if (filename.endsWith(".wasm")) {
          wasmFile = filename;
        }
      }

      // Step 5: Validate that all required files are present
      if (!loaderFile) throw new Error("Missing .loader.js file");
      if (!dataFile) throw new Error("Missing .data file");
      if (!frameworkFile) throw new Error("Missing .framework.js file");
      if (!wasmFile) throw new Error("Missing .wasm file");

      // Step 6: Create Blob URLs for Unity files
      const loaderUrl = URL.createObjectURL(files[loaderFile]);
      const dataUrl = URL.createObjectURL(files[dataFile]);
      const frameworkUrl = URL.createObjectURL(files[frameworkFile]);
      const wasmUrl = URL.createObjectURL(files[wasmFile]);

      // Step 7: Dynamically load the Unity loader script
      const script = document.createElement("script");
      script.src = loaderUrl;
      script.async = true;

      script.onload = () => {
        if (window.createUnityInstance) {
          createUnityInstance(unityCanvasRef.current, {
            dataUrl,
            frameworkUrl,
            codeUrl: wasmUrl,
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
        setError("Failed to load Unity loader script.");
        setLoading(false);
      };

      document.body.appendChild(script);
    } catch (err) {
      console.error("Error processing ZIP:", err);
      setError("Failed to process game files: " + err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (unityInstanceRef.current) {
        unityInstanceRef.current.Quit().then(() => {
          console.log("Unity instance quit successfully");
          unityInstanceRef.current = null;
        });
      }
    };
  }, [location]);

  const handleStartGame = () => {
    if (!gameStarted) {
      setGameStarted(true);
      loadUnityGameFromZip();
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

          {!gameStarted && !loading && !error && (
            <div
              className="w-full max-w-4xl mx-auto bg-black relative"
              style={{ height: "600px", border: "1px solid white" }}
            >
              <button
                onClick={handleStartGame}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-xl"
              >
                Play
              </button>
            </div>
          )}

          {loading && (
            <div
              className="w-full max-w-4xl mx-auto bg-black flex items-center justify-center"
              style={{ height: "600px", border: "1px solid white" }}
            >
              <p className="text-center">Loading game...</p>
            </div>
          )}

          {error && (
            <div
              className="w-full max-w-4xl mx-auto bg-black flex items-center justify-center"
              style={{ height: "600px", border: "1px solid white" }}
            >
              <p className="text-center text-red-500">{error}</p>
            </div>
          )}

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
