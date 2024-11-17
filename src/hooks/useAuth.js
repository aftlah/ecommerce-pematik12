import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [email, setEmail] = useState(null);

    console.log("user", user);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                setAccessToken(currentUser.accessToken);
                setEmail(currentUser.email);
            } else {
                setAccessToken(null);
            }
        });

        return () => unsubscribe();
    }, []);

    const username = email?.split("@")[0];


    return { user, username };
};
