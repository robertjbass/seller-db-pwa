import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  GoogleAuthProvider,
  // onAuthStateChanged,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDX4ronWwG7v7-Egdfspb6ZeVHxyI5-eJg",
  authDomain: "seller-db-16c6b.firebaseapp.com",
  projectId: "seller-db-16c6b",
  storageBucket: "seller-db-16c6b.appspot.com",
  messagingSenderId: "141546725004",
  appId: "1:141546725004:web:a4c842819ef9c2ea9e65a9",
  measurementId: "G-SCLJD44RBS",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const signInWithGoogle = async (): Promise<void> => {
  const provider = new GoogleAuthProvider();
  await signInWithRedirect(auth, provider);
};

export const signOut = () => {
  auth.signOut();
};
