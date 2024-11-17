import { db } from "../lib/firebase";
import {
    collection,
    getDocs,
    query,
    where,
} from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

export const authenticationUser = async (auth, email, password) => {
    const userQuery = query(collection(db, "users"), where("email", "==", email));
    const querySnapshot = await getDocs(userQuery);
    if (!querySnapshot.empty) {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log("User logged in:", userCredential.user);
        } catch (error) {
            console.error("Error logging in:", error);
        }
    } else {
        try {
            const newUserCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log("User registered:", newUserCredential.user);
        } catch (registerError) {
            console.error("Error registering user:", registerError);
        }
    }
};


// export const useFirestore = () => {



//     return { authenticationUser };
// }

// export default useFirestore;