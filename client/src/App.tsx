import { useState } from 'react';
import SuplimaxGenerator from './components/SuplimaxGenerator';
import RealEstateGenerator from './components/RealEstateGenerator';

function App() {
  const [activeTab, setActiveTab] = useState<'suplimax' | 'realestate'>('suplimax');

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">AI Video Generator</h1>
          <nav className="space-x-4">
            <button
              onClick={() => setActiveTab('suplimax')}
              className={`py-1 px-3 rounded ${activeTab === 'suplimax' ? 'bg-blue-600 text-white' : 'text-blue-600 hover:bg-blue-100'}`}
            >
              🧃 Suplimax
            </button>
            <button
              onClick={() => setActiveTab('realestate')}
              className={`py-1 px-3 rounded ${activeTab === 'realestate' ? 'bg-blue-600 text-white' : 'text-blue-600 hover:bg-blue-100'}`}
            >
              🏡 Real Estate
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10">
        {activeTab === 'suplimax' && <SuplimaxGenerator />}
        {activeTab === 'realestate' && <RealEstateGenerator />}
      </main>
    </div>
  );
}

export default App;
