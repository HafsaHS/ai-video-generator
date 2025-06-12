import { useState } from 'react';

function buildPrompt(features: string, audience: string, tone: string, style: string): string {
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
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [features, setFeatures] = useState('');
  const [audience, setAudience] = useState('');
  const [tone, setTone] = useState('');
  const [style, setStyle] = useState('');
  const [showResult, setShowResult] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const prompt = buildPrompt(features, audience, tone, style);
    setGeneratedPrompt(prompt);
  
    setTimeout(() => {
      setShowResult(true);
    }, 1000);
  };
  

  return (
    <div className="min-h-screen bg-white p-8 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Suplimax Video Generator</h1>

      <form onSubmit={handleSubmit} className="space-y-4 bg-gray-100 p-6 rounded-lg shadow">
        <div>
          <label className="block font-medium mb-1">Product Features</label>
          <textarea
            className="w-full border p-2 rounded"
            rows={3}
            placeholder="E.g., Boosts energy, zero sugar, tropical flavor"
            value={features}
            onChange={(e) => setFeatures(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Target Audience</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            placeholder="E.g., Athletes, college students"
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Video Tone</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            placeholder="E.g., Energetic, fun, professional"
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Video Style</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            placeholder="E.g., Cinematic, animated, retro"
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Generate Video
        </button>
      </form>

      {showResult && (
        <div className="mt-10 bg-gray-100 p-6 rounded-lg shadow text-center">
          <h2 className="text-xl font-semibold mb-4 text-green-700">🎉 Suplimax Video Ready!</h2>

          <img
            src="/suplimax.png"
            alt="Suplimax Energy Drink"
            className="w-40 mx-auto mb-4 rounded"
          />

          <video controls className="w-full rounded shadow mb-4">
            <source src="/mock-suplimax-ad.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <a
            href="/mock-suplimax-ad.mp4"
            download
            className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Download Video
          </a>
          <div className="mt-6 text-left bg-white p-4 border rounded text-sm">
  <h3 className="font-semibold mb-2 text-gray-800">🔍 Prompt Sent to Gemini (Simulated)</h3>
  <pre className="whitespace-pre-wrap text-gray-700">{generatedPrompt}</pre>
</div>

        </div>
      )}
    </div>
  );
}

export default SuplimaxGenerator;
