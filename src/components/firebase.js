// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBia88aWcsKp07E_AqsyjHwDnhQGLtxGqQ",

  authDomain: "exam-app-5332f.firebaseapp.com",

  projectId: "exam-app-5332f",

  storageBucket: "exam-app-5332f.firebasestorage.app",

  messagingSenderId: "188212578827",

  appId: "1:188212578827:web:d35e9ecd08042b376d950e",

  measurementId: "G-H12R7NV3ST"

};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
