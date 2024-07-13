import { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import { getActualTipsFromUser, getUserByAuthId } from "../firebase/user";


const ActualTips = () => {
  const { userAuth } = useAuthContext();

  useEffect(() => {
    handleUserActualTips();
  }, []);

  const handleUserActualTips = async () => {
    if (!userAuth) return;
    const userDoc = await getUserByAuthId(userAuth.uid);
    await getActualTipsFromUser(userDoc.id);
  };

  return (
    <div className="flex flex-col h-full w-full bg-neutral-900">
      <span className="text-white p-2">A rodada já está em andamento, por favor espere o início da próxima rodada para fazer seus palpites.</span>  
    </div>
  );
};

export default ActualTips;
