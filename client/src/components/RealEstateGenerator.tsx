import { useState } from 'react';

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
    "Prime Beverly Hills location"
  ]
};

const RealEstateGenerator = () => {
  const [style, setStyle] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [prompt, setPrompt] = useState('');

  const buildPrompt = (style: string): string => {
    return `Generate a virtual video tour of a real estate property with the following details:
    
Address: ${property.address}
Price: ${property.price}
Bedrooms: ${property.bedrooms}
Bathrooms: ${property.bathrooms}
Square Footage: ${property.squareFootage} sq ft
Features: ${property.features.join(', ')}

Tour Style: ${style}

Make it visually appealing, smooth, and reflect the chosen tour style.`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPrompt(buildPrompt(style));
    setShowResult(true);
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">🏡 Real Estate Video Tour Generator</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Select Tour Style</label>
          <select
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            required
            className="w-full border p-2 rounded"
          >
            <option value="">Choose a style</option>
            <option value="Luxury">Luxury</option>
            <option value="Family-friendly">Family-friendly</option>
            <option value="Modern">Modern</option>
            <option value="Romantic">Romantic</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Generate Tour
        </button>
      </form>

      {showResult && (
        <div className="mt-8 text-center bg-white p-4 rounded shadow">
          <video controls className="w-full rounded mb-4">
            <source src="/mock-real-estate-tour.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <a
            href="/mock-real-estate-tour.mp4"
            download
            className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mb-4"
          >
            Download Video
          </a>

          <div className="mt-6 text-left text-sm bg-gray-100 p-4 rounded">
            <h3 className="font-semibold text-gray-800 mb-2">🔍 Prompt Sent to Gemini (Simulated)</h3>
            <pre className="whitespace-pre-wrap text-gray-700">{prompt}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default RealEstateGenerator;
