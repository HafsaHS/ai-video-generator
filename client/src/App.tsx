import { useState } from "react";
import SuplimaxGenerator from "./components/SuplimaxGenerator";
import RealEstateGenerator from "./components/RealEstateGenerator";
import {  Home, Zap } from "lucide-react";

function App() {
  const [activeTab, setActiveTab] = useState<"suplimax" | "realestate">(
    "suplimax"
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <header className="border-b border-gray-200 bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold tracking-tight">
            AI Video Generator
          </h1>
          <nav className="space-x-2">
            <button
              onClick={() => setActiveTab("suplimax")}
              className={`inline-flex items-center gap-2 py-1.5 px-4 rounded-lg text-sm font-medium transition ${
                activeTab === "suplimax"
                  ? "bg-blue-600 text-white"
                  : "text-blue-600 hover:bg-blue-100"
              }`}
            >
              <Zap size={16} />
              Suplimax
            </button>
            <button
              onClick={() => setActiveTab("realestate")}
              className={`inline-flex items-center gap-2 py-1.5 px-4 rounded-lg text-sm font-medium transition ${
                activeTab === "realestate"
                  ? "bg-blue-600 text-white"
                  : "text-blue-600 hover:bg-blue-100"
              }`}
            >
              <Home size={16} />
              Real Estate
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-10">
        {activeTab === "suplimax" && <SuplimaxGenerator />}
        {activeTab === "realestate" && <RealEstateGenerator />}
      </main>
    </div>
  );
}

export default App;
