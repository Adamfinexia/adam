
import React from 'react';

export default function Home() {
  return (
    <div className="p-6">
      {typeof window !== "undefined" && localStorage.getItem("loggedInUser") ? <p>Zalogowany jako: {JSON.parse(localStorage.getItem("loggedInUser")).email}</p> : null}
  <h1 className="text-2xl font-bold mb-4">Finexia BV - Panel Zleceń</h1>
      <ul>
        <li><a href="/employees" className="text-blue-500 underline">Baza Pracowników</a></li>
        <li><a href="/expenses" className="text-blue-500 underline">Baza Rachunków</a></li>
        <li><a href="/orders" className="text-blue-500 underline">Zlecenia</a></li>
        <li><a href="/photos" className="text-blue-500 underline">Zdjęcia</a></li>
        <li><a href="/workhours" className="text-blue-500 underline">Godziny pracy</a></li>
        <li><a href="/login" className="text-blue-500 underline">Logowanie</a></li>
      </ul>
    
      <div className="mt-4">
        <button
          onClick={() => {
            localStorage.removeItem('loggedIn');
            window.location.reload();
          }}
          className="bg-red-500 text-white p-2"
        >
          Wyloguj się
        </button>
      </div>

    </div>
  );
}
