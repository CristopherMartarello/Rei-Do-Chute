'use client'
import { useRouter } from "next/navigation";
import Home from "./components/Home";
import { useAuthContext } from "./context/AuthContext";
import { useEffect } from "react";

export default function App() {

  const { userAuth, logout } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    console.log(userAuth);
    if (!userAuth) {
      router.push("/signIn");
    }
  }, [userAuth, router]);

  return (
    <>
      {userAuth && (
        <div>
          <Home />
        </div>
      )}
    </>
  ); 
}
