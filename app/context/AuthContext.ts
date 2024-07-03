//Criando o contexto para o processo de autenticação, verificar se o usuário de fato está logado para prosseguir com as rotas
//Criando o contexto serve para compartilhar as informações de maneira global no nosso projeto, consigo acessar de qualquer componente que esteja envolvido por ele

'use client'

import { createContext, useContext } from 'react';
import { User } from 'firebase/auth';

interface AuthContextProps {
    userAuth: User | null;
    logout: () => void
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const useAuthContext = () => useContext(AuthContext);