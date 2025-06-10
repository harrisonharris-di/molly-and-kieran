// frontend/src/App.jsx
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Countdown from 'react-countdown';

function Landing() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white">
            <h1 className="text-4xl font-bold mb-4">Molly & Kieran's Wedding</h1>
            <Countdown date={new Date('2026-10-10T00:00:00')} className="text-2xl mb-6" />
            <button
                onClick={() => navigate('/rsvp')}
                className="bg-blue-500 text-white px-4 py-2 rounded shadow"
            >
                RSVP
            </button>
        </div>
    );
}

function RSVP() {
    const [name, setName] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const handleSearch = async () => {
        const res = await fetch(`/api/search?name=${encodeURIComponent(name)}`);
        const data = await res.json();
        setSuggestions(data);
    };

    const handleRSVP = async (selectedName) => {
        await fetch(`/api/rsvp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: selectedName }),
        });
        alert(`RSVP confirmed for ${selectedName}`);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
            <h2 className="text-2xl mb-4">Find Your Name</h2>
            <input
                className="border px-3 py-2 mb-4 rounded"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <button className="mb-4 bg-green-500 text-white px-3 py-2 rounded" onClick={handleSearch}>
                Search
            </button>
            {suggestions.length > 0 && (
                <ul className="space-y-2">
                    {suggestions.map((s, i) => (
                        <li key={i}>
                            <button
                                className="underline text-blue-600"
                                onClick={() => handleRSVP(s)}
                            >
                                {s}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/rsvp" element={<RSVP />} />
            </Routes>
        </Router>
    );
}
