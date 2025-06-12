import { useState } from "react";
import { Settings2 } from "lucide-react";

function buildPrompt(
  features: string,
  audience: string,
  tone: string,
  style: string
): string {
  return `Create a short marketing video (15–30 seconds) for a fictional energy drink called "Suplimax".

Product Features:
${features}

Target Audience:
${audience}

Tone:
${tone}

Video Style:
${style}

The drink can design includes bold, sporty colors and lightning graphics. The brand name "Suplimax" should appear clearly in the video. End the video with the slogan: "Fuel the Fire."`;
}

const SuplimaxGenerator = () => {
  const [features, setFeatures] = useState("");
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [useRealAPI, setUseRealAPI] = useState(false); // ✅ toggle state

  const [audience, setAudience] = useState("student");
  const [tone, setTone] = useState("fun");
  const [style, setStyle] = useState("animated");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const prompt = buildPrompt(features, audience, tone, style);
    setGeneratedPrompt(prompt);
    setShowResult(true);

    if (useRealAPI) {
      try {
        const response = await fetch("http://localhost:4000/api/suplimax", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ features, audience, tone, style }),
        });

        const data = await response.json();
        if (data.videoUrl) {
          setVideoUrl(data.videoUrl);
        } else {
          alert("Failed to generate video");
        }
      } catch (err) {
        console.error(err);
        alert("Something went wrong while calling the real API.");
      }
    } else {
      // ✅ mock path
      setVideoUrl("/mock-suplimax-ad.mp4");
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center px-4 py-8">
      <div className="w-full max-w-2xl space-y-6">
        <div className="bg-white shadow-xl rounded-xl p-6 space-y-6">
          <h1 className="text-2xl font-semibold text-center text-gray-800">
            Suplimax Video Generator
          </h1>

          {/* Toggle Real vs Mock */}
          <div className="flex items-center justify-end gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              id="use-real-api"
              checked={useRealAPI}
              onChange={() => setUseRealAPI(!useRealAPI)}
              className="accent-blue-600"
            />
            <label htmlFor="use-real-api">Use real API (Runway ML)</label>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-3">
              <textarea
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="Describe Suplimax product features..."
                value={features}
                onChange={(e) => setFeatures(e.target.value)}
                required
              />
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
                    Target Audience
                  </label>
                  <input
                    className="w-full border rounded px-2 py-1"
                    value={audience}
                    onChange={(e) => setAudience(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">Video Tone</label>
                  <input
                    className="w-full border rounded px-2 py-1"
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">Video Style</label>
                  <input
                    className="w-full border rounded px-2 py-1"
                    value={style}
                    onChange={(e) => setStyle(e.target.value)}
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Generate Video
            </button>
          </form>
        </div>

        {showResult && (
          <div className="bg-white shadow-xl rounded-xl p-6 space-y-4">
            {videoUrl && (
              <video controls className="w-full rounded-md border">
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}

            <a
              href={videoUrl || "/mock-suplimax-ad.mp4"}
              download
              className="block w-full text-center bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
            >
              Download Video
            </a>

            <div className="bg-gray-50 p-4 border rounded text-sm font-mono text-gray-800 whitespace-pre-wrap">
              {generatedPrompt}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuplimaxGenerator;
