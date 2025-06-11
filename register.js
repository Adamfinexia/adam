
import React, { useState } from 'react';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const registerUser = () => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.email === email)) {
      alert('Użytkownik już istnieje.');
      return;
    }
    users.push({ email, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Zarejestrowano pomyślnie.');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Rejestracja</h1>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="E-mail" className="border p-2 m-2" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Hasło" className="border p-2 m-2" />
      <button onClick={registerUser} className="bg-blue-500 text-white p-2 m-2">Zarejestruj się</button>
    </div>
  );
}
