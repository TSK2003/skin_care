// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA2I-3m31ECO-CAjgQ2QMYUsjzTsDk1dto",
  authDomain: "skincare-72058.firebaseapp.com",
  projectId: "skincare-72058",
  storageBucket: "skincare-72058.firebasestorage.app",
  messagingSenderId: "911010571150",
  appId: "1:911010571150:web:89c50bc2e54f176a52badf",
  measurementId: "G-NN0BQXDJBG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth & Database instances
const auth = getAuth(app);
const db = getFirestore(app);

// Initialize Analytics conditionally (safeguards SSR / non-browser environments)
let analytics = null;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch(() => {
    // Analytics fallback
  });
}

export { app, auth, db, analytics };
export default app;
