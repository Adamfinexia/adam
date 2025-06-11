
import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { sendEmailToTeam } from '../components/sendEmail';

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [teamName, setTeamName] = useState('');
  const [message, setMessage] = useState('');
  const [project, setProject] = useState('');
  const [date, setDate] = useState('');
  const [assignedTeam, setAssignedTeam] = useState('');

  const fetchEmployees = async () => {
    const querySnapshot = await getDocs(collection(db, 'employees'));
    const list = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    setEmployees(list);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const addEmployee = async () => {
    const newEmp = { name, email, team: teamName };
    const docRef = await addDoc(collection(db, 'employees'), newEmp);
    setEmployees([...employees, { ...newEmp, id: docRef.id }]);
    setName('');
    setEmail('');
    setTeamName('');
  };

  const deleteEmployee = async (id) => {
    await deleteDoc(doc(db, 'employees', id));
    setEmployees(employees.filter(e => e.id !== id));
  };

  const assignTask = async () => {
    const task = { project, date, message, team: assignedTeam };
    await addDoc(collection(db, 'tasks'), task);
    const teamEmails = employees.filter(e => e.team === assignedTeam).map(e => e.email);
    sendEmailToTeam(teamEmails, message, project, date);
    setMessages([...messages, task]);
    setMessage('');
    setProject('');
    setDate('');
    setAssignedTeam('');
    alert('Zadanie przypisane i zapisane w bazie!');
  };

  const teams = employees.reduce((acc, emp) => {
    acc[emp.team] = acc[emp.team] || [];
    acc[emp.team].push(emp);
    return acc;
  }, {});

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Baza Pracowników i Zespołów</h1>
      <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Imię i nazwisko" className="border p-2 m-2" />
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="E-mail" className="border p-2 m-2" />
      <input type="text" value={teamName} onChange={e => setTeamName(e.target.value)} placeholder="Zespół" className="border p-2 m-2" />
      <button onClick={addEmployee} className="bg-blue-500 text-white p-2 m-2">Dodaj pracownika</button>

      <h2 className="text-lg font-semibold mt-6">Zespoły</h2>
      {Object.entries(teams).map(([team, members], idx) => (
        <div key={idx} className="mb-4">
          <h3 className="font-bold">{team}</h3>
          <ul className="ml-4 list-disc">
            {members.map(emp => (
              <li key={emp.id}>
                {emp.name} – {emp.email}
                <button onClick={() => deleteEmployee(emp.id)} className="ml-2 text-red-600 underline">Usuń</button>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <h2 className="text-lg font-semibold mt-6">Zadanie dla zespołu</h2>
      <input type="text" value={project} onChange={e => setProject(e.target.value)} placeholder="Projekt" className="border p-2 m-2" />
      <input type="date" value={date} onChange={e => setDate(e.target.value)} className="border p-2 m-2" />
      <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Opis prac" className="border p-2 m-2 w-full h-24" />
      <select value={assignedTeam} onChange={e => setAssignedTeam(e.target.value)} className="border p-2 m-2">
        <option value="">Wybierz zespół</option>
        {Object.keys(teams).map((team, index) => (
          <option key={index} value={team}>{team}</option>
        ))}
      </select>
      <button onClick={assignTask} className="bg-green-600 text-white p-2 m-2">Przypisz zadanie</button>
    </div>
  );
}
