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
import Image from "next/image";
import { useState } from "react";

const FormLogin = () => {
  const [selected, setSelected] = useState("login");

  const handleSelectionChange = (key: any) => {
    setSelected(key);
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
              <form className="flex flex-col gap-4">
                <Input
                  isRequired
                  label="E-mail"
                  placeholder="Digite o seu e-mail"
                  type="email"
                />
                <Input
                  isRequired
                  label="Senha"
                  placeholder="Digite a sua senha"
                  type="password"
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
                  <Button fullWidth className="bg-yellow-600">
                    <span className="font-semibold">Entrar</span>
                  </Button>
                </div>
              </form>
            </Tab>
            <Tab key="sign-up" title="Cadastro">
              <form className="flex flex-col gap-4 h-[300px]">
                <Input
                  isRequired
                  label="Nome"
                  placeholder="Digite o seu nome"
                  type="password"
                />
                <Input
                  isRequired
                  label="E-mail"
                  placeholder="Digite o seu e-mail"
                  type="email"
                />
                <Input
                  isRequired
                  label="Senha"
                  placeholder="Digite a sua senha"
                  type="password"
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
                  <Button fullWidth className="bg-yellow-600">
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
