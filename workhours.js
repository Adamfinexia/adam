
import React, { useState } from 'react';

export default function WorkHours() {
  const [entries, setEntries] = useState([]);
  const [worker, setWorker] = useState('');
  const [hours, setHours] = useState('');

  const addEntry = () => {
    setEntries([...entries, { worker, hours }]);
    setWorker('');
    setHours('');
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Godziny pracy</h1>
      <input type="text" value={worker} onChange={e => setWorker(e.target.value)} placeholder="Pracownik" className="border p-2 m-2" />
      <input type="number" value={hours} onChange={e => setHours(e.target.value)} placeholder="Liczba godzin" className="border p-2 m-2" />
      <button onClick={addEntry} className="bg-blue-500 text-white p-2 m-2">Dodaj</button>
      <ul>
        {entries.map((entry, index) => (
          <li key={index}>{entry.worker}: {entry.hours} godz.</li>
        ))}
      </ul>
    </div>
  );
}
