
import React, { useState } from 'react';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(true);
  const router = useRouter();

  const handleAuth = async () => {
    try {
      if (isLoginMode) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      router.push('/employees');
    } catch (error) {
      alert('Błąd: ' + error.message);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">{isLoginMode ? 'Logowanie' : 'Rejestracja'}</h1>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="E-mail" className="border p-2 m-2" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Hasło" className="border p-2 m-2" />
      <button onClick={handleAuth} className="bg-blue-500 text-white p-2 m-2">{isLoginMode ? 'Zaloguj się' : 'Zarejestruj się'}</button>
      <p className="mt-4 cursor-pointer text-blue-500 underline" onClick={() => setIsLoginMode(!isLoginMode)}>
        {isLoginMode ? 'Nie masz konta? Zarejestruj się' : 'Masz już konto? Zaloguj się'}
      </p>
    </div>
  );
}
