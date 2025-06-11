
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { app } from '../firebaseConfig';

export default function Home() {
  const [user, setUser] = useState(null);
  const auth = getAuth(app);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>Finexia działa!</h1>
      {user ? (
        <>
          <p>Zalogowany jako: {user.email}</p>
          <button onClick={() => signOut(auth)}>Wyloguj</button>
        </>
      ) : (
        <p>Nie jesteś zalogowany.</p>
      )}
    </div>
  );
}
