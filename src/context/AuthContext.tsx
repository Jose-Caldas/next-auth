import { createContext, ReactNode } from "react";

//criar tipagem

type SignInCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>; // void sem retorno
  isAuthenticated: boolean; // verificar se o usuário está autenticado
};

type AuthProviderProps = {
  children: ReactNode;
};

//context
export const AuthContext = createContext({} as AuthContextData);

//Provider
export function AuthProvider({ children }: AuthProviderProps) {
  const isAuthenticated = false;

  // async devido Promise<void>
  async function signIn({ email, password }: SignInCredentials) {
    console.log(email, password);
  }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
