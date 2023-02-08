import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from "./app";

export const auth = getAuth(app);

export async function createAccount(email, password) {
    try {
        const data = await createUserWithEmailAndPassword(auth, email, password);
        return data.user.uid;
    }
    catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        if(errorCode=='auth/email-already-in-use'){
            window.alert("Email already Exists");
        }
        else if(errorCode=='auth/weak-password'){
            window.alert("Please enter a Strong Password");
        }
    }
}

export async function login(email, password) {
    try {
        const data = await signInWithEmailAndPassword(auth, email, password);
        return data.user.uid;
    }
    catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        window.alert("Wrong Password");
    }
}


export async function logout() {
    try {
        await signOut(auth);
        return true;
    }
    catch (error) {
        console.log(error);
    };
}