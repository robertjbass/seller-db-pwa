import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  User,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFirestoreDoc, updateFirestoreDoc } from "./firestore";

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
export const db = getFirestore(app);

export const signInWithGoogle = async (): Promise<User | null> => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  if (result.user.email) {
    const { data, exists, id } = await getFirestoreDoc(
      "user",
      result.user.email
    );
    if (!exists) {
      const { error, success } = await updateFirestoreDoc(
        "user",
        result.user.email,
        {
          uid: result.user.uid,
          active: true,
        }
      );

      if (!success) console.error(error);
    }
    console.log(data, exists, id);
  }
  if (result?.user?.uid && result?.user?.email) {
    return result.user;
  }
  return null;
};

export const signOut = () => {
  auth.signOut();
};
