import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDmx_kDmbBp8eSfpEy-5bUQaNCJi_miMVQ",
  authDomain: "gptunes-b5f99.firebaseapp.com",
  projectId: "gptunes-b5f99",
  storageBucket: "gptunes-b5f99.firebasestorage.app",
  messagingSenderId: "700904829653",
  appId: "1:700904829653:web:your-app-id",
  measurementId: "G-01ERCVTRSY"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
