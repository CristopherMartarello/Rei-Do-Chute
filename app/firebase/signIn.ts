import dbConfig from './firebase-config';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';

const auth = getAuth(dbConfig);

export default async function signIn(email: string, password: string) {
    let result = null, 
        error = null;
    
    try {
        result = await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
        error = e;
    }

    return { result, error };
}