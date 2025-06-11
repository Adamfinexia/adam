
import React, { useState } from 'react';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const addOrder = () => {
    setOrders([...orders, { title, description }]);
    setTitle('');
    setDescription('');
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Zlecenia</h1>
      <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Tytuł" className="border p-2 m-2" />
      <input type="text" value={description} onChange={e => setDescription(e.target.value)} placeholder="Opis" className="border p-2 m-2" />
      <button onClick={addOrder} className="bg-blue-500 text-white p-2 m-2">Dodaj</button>
      <ul>
        {orders.map((order, index) => (
          <li key={index}>{order.title}: {order.description}</li>
        ))}
      </ul>
    </div>
  );
}
