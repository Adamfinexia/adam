import { exportExpensesToPDF } from '../components/exportPDF';
import { exportExpensesToExcel } from '../components/exportExcel';

import React, { useState } from 'react';

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [project, setProject] = useState('');
  const [item, setItem] = useState('');
  const [amount, setAmount] = useState('');

  const addExpense = () => {
    const parsedAmount = parseFloat(amount);
    if (!isNaN(parsedAmount)) {
      setExpenses([...expenses, { project, item, amount: parsedAmount }]);
      setProject('');
      setItem('');
      setAmount('');
    }
  };

  const getProjectSummaries = () => {
    const summary = {};
    expenses.forEach(({ project, amount }) => {
      if (!summary[project]) {
        summary[project] = 0;
      }
      summary[project] += amount;
    });
    return summary;
  };

  const summaries = getProjectSummaries();

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Baza Rachunków</h1>
      <input type="text" value={project} onChange={e => setProject(e.target.value)} placeholder="Nazwa projektu" className="border p-2 m-2" />
      <input type="text" value={item} onChange={e => setItem(e.target.value)} placeholder="Wydatek" className="border p-2 m-2" />
      <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Kwota (€)" className="border p-2 m-2" />
      <button onClick={addExpense} className="bg-blue-500 text-white p-2 m-2">Dodaj</button>

      <h2 className="text-lg font-semibold mt-6">Lista wydatków</h2>
      <ul>
        {expenses.map((exp, index) => (
          <li key={index}>{exp.project}: {exp.item} - {exp.amount.toFixed(2)} €</li>
        ))}
      </ul>

      <h2 className="text-lg font-semibold mt-6">Podsumowanie kosztów</h2>
      <ul>
        {Object.entries(summaries).map(([proj, total], index) => (
          <li key={index}><strong>{proj}</strong>: {total.toFixed(2)} €</li>
        ))}
      </ul>
    
      <div className="mt-6">
        <button onClick={() => exportExpensesToPDF(expenses)} className="bg-green-500 text-white p-2 m-2">Eksportuj do PDF</button>
        <button onClick={() => exportExpensesToExcel(expenses)} className="bg-yellow-500 text-black p-2 m-2">Eksportuj do Excel</button>
      </div>
    </div>
  );
}
