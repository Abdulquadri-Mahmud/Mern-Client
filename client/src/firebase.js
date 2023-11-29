import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-ed7b0.firebaseapp.com",
  projectId: "mern-estate-ed7b0",
  storageBucket: "mern-estate-ed7b0.appspot.com",
  messagingSenderId: "949214867729",
  appId: "1:949214867729:web:ae1dacfa63feaa3d9c5cb0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);