import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBP-WvIta-Bmc1JWprmNPHn_ZauW8KUZ90",
  authDomain: "catering-app-final.firebaseapp.com",
  projectId: "catering-app-final",
  storageBucket: "catering-app-final.firebasestorage.app",
  messagingSenderId: "741651504983",
  appId: "1:741651504983:web:0f2b80808f4623e5b5a812",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);