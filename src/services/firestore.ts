import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/services/firebase";

type CollectionName = "user" | "items";

type UserEmail = string;
type StorageUrl = string;
type UserDoc = {
  id: UserEmail;
  uid: string;
  active: boolean;
};

type ItemDoc = {
  items: DocItem[];
};

type DocItem = {
  id: string;
  name: string;
  photoUrl: StorageUrl;
  tag: string;
};

export const getFirestoreDoc = async (
  collectionName: CollectionName,
  documentName: UserEmail
): Promise<{
  id: string | undefined;
  exists: boolean;
  data: any;
}> => {
  const docRef = doc(db, collectionName, documentName);
  const docSnap = await getDoc(docRef);

  return {
    id: docSnap?.id,
    exists: docSnap.exists(),
    data: docSnap?.data(),
  };
};

export const updateFirestoreDoc = async (
  collectionName: CollectionName,
  documentName: UserEmail,
  data: any
): Promise<{
  success: boolean;
  data: UserDoc | ItemDoc;
  error: any;
}> => {
  const docRef = doc(db, collectionName, documentName);
  try {
    await setDoc(docRef, data, { merge: true });
    return { success: true, data, error: null };
  } catch (error) {
    return { success: false, data, error };
  }
};

const deleteFirestoreDoc = async (
  collectionName: CollectionName,
  documentName: UserEmail
): Promise<{
  success: boolean;
  error: any;
}> => {
  const docRef = doc(db, collectionName, documentName);
  try {
    await deleteDoc(docRef);
    return { success: true, error: null };
  } catch (error) {
    return { success: false, error };
  }
};
console.log(!!deleteFirestoreDoc && "deleteFirestoreDoc not used");
