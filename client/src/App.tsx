import { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:4000/')
      .then(res => res.text())
      .then(data => setMessage(data))
      .catch(err => console.error('Error:', err));
  }, []);

  return (
    <div className="p-10 text-center">
      <h1 className="text-2xl font-bold">React + Express App</h1>
      <p className="mt-4">{message}</p>
    </div>
  );
}

export default App;
