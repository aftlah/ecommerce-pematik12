import {
    collection,
    getDocs,
    getFirestore,
    query,
    where,
} from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import app from "./init";

const firestore = getFirestore(app);

export const authenticationUser = async (auth, email, password) => {
    const userQuery = query(collection(firestore, "users"), where("email", "==", email));
    const querySnapshot = await getDocs(userQuery);
    if (!querySnapshot.empty) {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            // console.log("User logged in:", userCredential.user);
        } catch (error) {
            console.error("Error logging in:", error);
        }
    } else {
        try {
            const newUserCredential = await createUserWithEmailAndPassword(auth, email, password);
            // console.log("User registered:", newUserCredential.user);
        } catch (registerError) {
            console.error("Error registering user:", registerError);
        }
    }
};

export const getMenus = async () => {
    const menuQuery = query(collection(firestore, "menus"));
    const querySnapshot = await getDocs(menuQuery);
    const menus = [];

    querySnapshot.docs.map((doc) => {
        menus.push(doc.data());
    });
    return menus;
}

export const getOrders = async (userId) => {
    const querySnapshot = await getDocs(collection(firestore, 'cartItems'));
    const items = querySnapshot.docs.map(doc => doc.data());
    return items

}