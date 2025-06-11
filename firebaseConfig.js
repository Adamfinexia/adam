
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCjvaFRK1AHb7un99VZchZj1Mjih3PSCcs",
  authDomain: "finexia-bv.firebaseapp.com",
  projectId: "finexia-bv",
  storageBucket: "finexia-bv.firebasestorage.app",
  messagingSenderId: "963249060796",
  appId: "1:963249060796:web:c1414d058b636fcd5b49b9",
  measurementId: "G-NGSCTG1HXX"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
