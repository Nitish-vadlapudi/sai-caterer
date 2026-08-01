import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

export async function getMenuItems() {
  try {
    const snapshot = await getDocs(collection(db, "menu"));

    const items = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("MENU ITEMS:", items);

    return items;
  } catch (error) {
    console.error(error);
    return [];
  }
}