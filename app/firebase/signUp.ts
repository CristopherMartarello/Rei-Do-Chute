import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import dbConfig from './firebase-config';
import { addDoc, collection, getFirestore } from "firebase/firestore";

const auth = getAuth(dbConfig);
const db = getFirestore(dbConfig);
const userCollectionRef = collection(db, 'users');
const accountCollectionRef = collection(db, 'accounts');

async function createAccountInstance(name: string, userId: string) {
    const account = await addDoc(accountCollectionRef, {
        name,
        userIds: [userId]
    })
    console.log(account);
}

async function createUserInstance(name: string, email: string) {
    const user = await addDoc(userCollectionRef, {
        name,
        email
    })
    console.log(user.id);
    await createAccountInstance(name+"'s Team", user.id);
}

export default async function signUp(name: string, email: string, password: string) {
    let result = null,
        error = null;

    try {
        result = await createUserWithEmailAndPassword(auth, email, password);
        await createUserInstance(name, email);
    } catch (e) {
        error = e;
    }

    return { result, error}
}