import { useState } from "react";
import UserTips from "../utils/user-tips/entity/user-tips";
import dbConfig from "./firebase-config";
import { arrayUnion, collection, doc, getDocs, getFirestore, query, updateDoc, where } from "firebase/firestore";

const db = getFirestore(dbConfig);

export async function addTipsToUser(
  userId: string,
  tips: UserTips
) {
  const userDocRef = doc(db, "users", userId);
  try {
    await updateDoc(userDocRef, {
      actualTips: tips.tips,
    });
    console.log("Palpites adicionados ao usuário...");
  } catch (error) {
    console.error("Erro ao adicionar palpites ao usuário:", error);
  }
};

export async function addTipsHistory(
  userId: string,
  tips: UserTips
) {
  const userDocRef = doc(db, "users", userId);
  try {
    console.log(tips.tips)
    await updateDoc(userDocRef, {
      historyOfTips: arrayUnion(tips.tips),
    });
    console.log("Palpites adicionados ao usuário...");
  } catch (error) {
    console.error("Erro ao adicionar palpites ao usuário:", error);
  }
}

export const getUserByAuthId = async (authUid: string) => {
  const usersCollectionRef = collection(db, "users");
  const userQuery = query(usersCollectionRef, where("authUid", "==", authUid));
  const querySnapshot = await getDocs(userQuery);

  if (!querySnapshot.empty) {
    const userDoc = querySnapshot.docs[0];
    return { id: userDoc.id, ...userDoc.data() };
  } else {
    throw new Error("Usuário não encontrado...");
  }
};
