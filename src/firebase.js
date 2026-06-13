import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCF7IyCwwLYTCY-IZ6xHOOnWpv15P6knIw",
  authDomain: "cns-official.firebaseapp.com",
  projectId: "cns-official",
  storageBucket: "cns-official.firebasestorage.app",
  messagingSenderId: "30319868916",
  appId: "1:30319868916:web:16452c2da935b678b897a1",
  measurementId: "G-Z5QWRPCERE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
