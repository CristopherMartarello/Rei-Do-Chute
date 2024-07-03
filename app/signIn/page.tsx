"use client";
import {
  Button,
  Card,
  CardBody,
  Input,
  Link,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { FirebaseError } from "firebase/app";
import Image from "next/image";
import { FormEvent, useState } from "react";
import signUp from "../firebase/signUp";
import { useRouter } from "next/navigation";
import signIn from "../firebase/signIn";

const FormLogin = () => {
  const [selected, setSelected] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSelectionChange = (key: any) => {
    setSelected(key);
  };

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const { result, error } = await signIn(email, password);

      if (error) {
        const firebaseError = error as FirebaseError;
        if (firebaseError.message) {
          throw new Error(firebaseError.message);
        } else {
          throw new Error("Unknown Error");
        }
      }

      console.log(result);
      return router.push("/");
    } catch (e) {
      console.log("Error:", e);
    }
  };

  const handleUserRegister = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const { result, error } = await signUp(name, email, password);

      if (error) {
        const firebaseError = error as FirebaseError;
        if (firebaseError.message) {
          console.log(firebaseError.message);
          throw new Error(firebaseError.message);
        } else {
          throw new Error("Unknown Error");
        }
      }

      console.log(result);
      return router.push("/");
    } catch (e) {
      console.log("Error", e);
    }
  };

  return (
    <div className="flex flex-col w-full bg-zinc-900 h-screen justify-center items-center">
      <Image
        src={"/LogoReiDoChute.png"}
        alt={"Logo Rei do Chute"}
        width={175}
        height={175}
      />
      <Card className="max-w-full w-[340px] h-[400px] m-2 bg-zinc-800">
        <CardBody className="overflow-hidden gap-5">
          <Tabs
            fullWidth
            size="md"
            aria-label="Tabs form"
            color="warning"
            selectedKey={selected}
            onSelectionChange={handleSelectionChange}
          >
            <Tab key="login" title="Login">
              <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
                <Input
                  isRequired
                  label="E-mail"
                  placeholder="Digite o seu e-mail"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  isRequired
                  label="Senha"
                  placeholder="Digite a sua senha"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <p className="text-center text-small">
                  <span className="text-white">Precisa criar uma conta? </span>
                  <Link
                    size="sm"
                    onPress={() => setSelected("sign-up")}
                    className="text-yellow-600 hover:cursor-pointer"
                  >
                    Cadastrar-se
                  </Link>
                </p>
                <div className="flex gap-2 justify-end">
                  <Button fullWidth className="bg-yellow-600" type="submit">
                    <span className="font-semibold">Entrar</span>
                  </Button>
                </div>
              </form>
            </Tab>
            <Tab key="sign-up" title="Cadastro">
              <form onSubmit={handleUserRegister} className="flex flex-col gap-4 h-[300px]">
              <Input
                  isRequired
                  label="Name"
                  placeholder="Digite o seu nome"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  isRequired
                  label="Email"
                  placeholder="Digite o seu email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  isRequired
                  label="Password"
                  placeholder="Digite a sua senha"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <p className="text-center text-small">
                  <span className="text-white">Já tem uma conta? </span>
                  <Link
                    size="sm"
                    onPress={() => setSelected("login")}
                    className="text-yellow-600 hover:cursor-pointer"
                  >
                    Entre aqui
                  </Link>
                </p>
                <div className="flex gap-2 justify-end">
                  <Button fullWidth className="bg-yellow-600" type="submit">
                    <span className="font-semibold">Cadastrar-se</span>
                  </Button>
                </div>
              </form>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
};

export default FormLogin;
