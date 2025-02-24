// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDE6f2yAANLGSyzarvWQvAhRyHyHDqgTT8",
  authDomain: "my-api-hub.firebaseapp.com",
  projectId: "my-api-hub",
  storageBucket: "my-api-hub.firebasestorage.app",
  messagingSenderId: "914751135134",
  appId: "1:914751135134:web:8d740e8dd81957547c0a8f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
