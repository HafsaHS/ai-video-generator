import { useState } from "react";
import { Video, Download, Settings2 } from "lucide-react";

const property = {
  address: "12012 Crest Ct, Beverly Hills, CA 90210",
  price: "$10,183,985",
  bedrooms: 5,
  bathrooms: 6.5,
  squareFootage: 6100,
  features: [
    "Luxury estate",
    "Three-car garage",
    "Landscaped grounds",
    "Elegant entrance with grand staircase",
    "Modern design",
    "Prime Beverly Hills location",
  ],
};

const RealEstateGenerator = () => {
  const [style, setStyle] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [useRealAPI, setUseRealAPI] = useState(false);

  const [duration, setDuration] = useState("60 seconds");
  const [musicStyle, setMusicStyle] = useState("elegant");
  const [cameraMovement, setCameraMovement] = useState("smooth");

  const buildPrompt = (): string => {
    return `Generate a virtual video tour of a real estate property with the following details:

Address: ${property.address}
Price: ${property.price}
Bedrooms: ${property.bedrooms}
Bathrooms: ${property.bathrooms}
Square Footage: ${property.squareFootage} sq ft
Features: ${property.features.join(", ")}

Tour Style: ${style}
Duration: ${duration}
Music Style: ${musicStyle}
Camera Movement: ${cameraMovement}

Make it visually appealing, smooth, and reflect the chosen tour style. Showcase the property's luxury features and prime Beverly Hills location.`;
  };

  const handleSubmit = async () => {
    if (!style) return;
    const finalPrompt = buildPrompt();
    setPrompt(finalPrompt);
    setShowResult(true);

    if (!useRealAPI) {
      setVideoUrl("/mock-real-estate-tour.mp4");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/realestate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ style, duration, musicStyle, cameraMovement }),
      });

      const data = await response.json();
      if (data.videoUrl) {
        setVideoUrl(data.videoUrl);
      } else {
        alert("Video generation failed.");
      }
    } catch (err) {
      console.error("API Error:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center px-4 py-8">
      <div className="w-full max-w-2xl space-y-6">
        <div className="bg-white shadow-xl rounded-xl p-6 space-y-6">
          <h1 className="text-2xl font-semibold text-center text-gray-800 flex items-center justify-center gap-2">
            <Video size={24} /> Real Estate Tour Generator
          </h1>

          {/* Toggle */}
          <div className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={useRealAPI}
              onChange={(e) => setUseRealAPI(e.target.checked)}
              id="toggle-api"
              className="accent-blue-600"
            />
            <label htmlFor="toggle-api">
              Use actual Runway ML API (uncheck to simulate)
            </label>
          </div>

          <div className="space-y-4">
            <div className="flex gap-3">
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Choose a tour style...</option>
                <option value="Luxury">Luxury</option>
                <option value="Family-friendly">Family-friendly</option>
                <option value="Modern">Modern</option>
                <option value="Romantic">Romantic</option>
              </select>
              <button
                type="button"
                onClick={() => setShowSettings((prev) => !prev)}
                className="text-gray-500 hover:text-gray-900 p-2"
                title="Settings"
              >
                <Settings2 size={20} />
              </button>
            </div>

            {showSettings && (
              <div className="border rounded-md p-4 grid grid-cols-1 gap-4 text-sm">
                <div>
                  <label className="block font-medium mb-1">
                    Video Duration
                  </label>
                  <input
                    className="w-full border rounded px-2 py-1"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">Music Style</label>
                  <input
                    className="w-full border rounded px-2 py-1"
                    value={musicStyle}
                    onChange={(e) => setMusicStyle(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">
                    Camera Movement
                  </label>
                  <input
                    className="w-full border rounded px-2 py-1"
                    value={cameraMovement}
                    onChange={(e) => setCameraMovement(e.target.value)}
                  />
                </div>
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={!style}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Generate Tour
            </button>
          </div>
        </div>

        {showResult && (
          <div className="bg-white shadow-xl rounded-xl p-6 space-y-4">
            {videoUrl && (
              <video controls className="w-full rounded-md border">
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}

            {videoUrl && (
              <a
                href={videoUrl}
                download
                className="block w-full text-center bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition flex items-center justify-center gap-2"
              >
                <Download size={16} /> Download Video
              </a>
            )}

            <div className="bg-gray-50 p-4 border rounded text-sm font-mono text-gray-800 whitespace-pre-wrap">
              {prompt}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RealEstateGenerator;
