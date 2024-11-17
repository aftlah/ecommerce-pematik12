import { db } from "../lib/firebase";
import {
    collection,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    doc,
    query,
    where,
} from "firebase/firestore";
import { signInWithEmailAndPassword } from 'firebase/auth'


export const useFirestore = () => {

    const authenticationUser = async (auth, email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log("User logged in:", userCredential.user);
        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                try {
                    const newUserCredential = await createUserWithEmailAndPassword(auth, email, password);
                    console.log("User registered:", newUserCredential.user);
                } catch (registerError) {
                    console.error("Error registering user:", registerError);
                }
            } else {
                console.error("Error logging in:", error);
            }
        }
    };

    return { authenticationUser };
}

export default useFirestore;