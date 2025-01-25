import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set, get, onValue, remove, update } from "firebase/database";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1WJDxAAoqFm5tftzdzgQaneUN8Ln6vMQ",
  authDomain: "webapp-45d62.firebaseapp.com",
  databaseURL: "https://webapp-45d62-default-rtdb.firebaseio.com/",  // Correct format: this should point to the root

  projectId: "webapp-45d62",
  storageBucket: "webapp-45d62.firebasestorage.app",
  messagingSenderId: "932901305495",
  appId: "1:932901305495:web:1b04a2de431f3a8a343dd2",
  measurementId: "G-CE8C529RRD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Database
const auth = getAuth(app);
const database = getDatabase(app);

// Named Exports
export { auth, database, ref, set, get, onValue, remove, update };

export default app; // Optional if you want to initialize Firebase elsewhere
