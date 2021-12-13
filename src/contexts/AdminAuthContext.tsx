import * as React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { AdminAuthService, AdminAuthResult } from "../lib/AdminAuth";
import { Center, SimpleGrid, Spinner } from "@chakra-ui/react";

// data define
type StateType = {
  isAuthrized: boolean;
  uid: string;
};

type ContextType = {
  state: StateType;
  login: (email: string, password: string) => Promise<AdminAuthResult>;
  logout: () => Promise<void>;
};

const service = new AdminAuthService();
const initialState = { isAuthrized: false, uid: "" };

const AdminAuthContext = createContext({} as ContextType);

export function useAdminAuth(): ContextType {
  return useContext(AdminAuthContext);
}

export const AdminAuthProvider = ({ children }: any) => {
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(true);

  async function login(
    email: string,
    password: string
  ): Promise<AdminAuthResult> {
    const result = await service.sign(email, password);
    setState({ isAuthrized: result.isSucessful, uid: result.uid });
    return result;
  }

  async function logout(): Promise<void> {
    try {
      await service.signOut();
      setState({ ...state, isAuthrized: false });
    } catch (err) {
      console.error("failed to logout");
    }
  }

  useEffect(() => {
    service.onAuthStateChange((result) => {
      setLoading(false);
      setState({ isAuthrized: result.isSucessful, uid: result.uid });
    });
  }, []);

  const values = {
    state,
    loading,
    login,
    logout,
  };

  if (loading) {
    return (
      <Center my={9}>
        <SimpleGrid>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </SimpleGrid>
      </Center>
    );
  }

  return (
    <AdminAuthContext.Provider value={values}>
      {!loading && children}
    </AdminAuthContext.Provider>
  );
};
