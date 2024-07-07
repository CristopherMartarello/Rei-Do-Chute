'use client'
import { useRouter } from "next/navigation";
import Home from "./components/Home";
import { useAuthContext } from "./context/AuthContext";
import { useEffect, useState } from "react";
import { getActualMatches, Match, MatchDoc } from "./firebase/matches";

export default function App() {

  const { userAuth, logout } = useAuthContext();
  const router = useRouter();
  const [matches, setMatches] = useState<MatchDoc[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!userAuth) {
        router.push("/signIn");
      } else {
        try {
          const matchesData = await getActualMatches();
          setMatches(matchesData);
          console.log(matchesData);
        } catch (error) {
          console.error("Failed to get matches: ", error);
        }
      }
    };

    fetchData();
  }, [userAuth, router]);

  return (
    <>
      {userAuth && (
        <div>
          <Home matchData={matches} />
        </div>
      )}
    </>
  );
}
