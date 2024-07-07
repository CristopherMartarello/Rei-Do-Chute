import dbConfig from './firebase-config';
import { collection, getDocs, getFirestore } from "firebase/firestore";

const db = getFirestore(dbConfig);
const matchesCollectionRef = collection(db, 'matches');

export interface Match {
    id: string;
    data: string;
    dia: string;
    estadio: string;
    hora: string;
    time1: string;
    time2: string;
}

export interface MatchDoc {
    id: string;
    partidas: Match[]
}

export const getActualMatches = async (): Promise<MatchDoc[]> => {
    try {
      const querySnapshot = await getDocs(matchesCollectionRef);
      const matches = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as MatchDoc[];
      return matches;
    } catch (error) {
      console.error("Error getting matches: ", error);
      throw error;
    }
  };