import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase-config";
import Contact from "./contact";

export const addContact = async (contact: Contact): Promise<string | null> => {
    try {
        const docRef = await addDoc(collection(db, "contacts"), contact);
        return docRef.id;
    } catch (error: unknown) {
        if (process.env.NODE_ENV === "development") {
            console.error("Error adding contact:", error);
        }
        return null;
    }
};