import * as React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { UserAuthResult, UserAuthService } from "../lib/UserAuth";
import { Center, Spinner, SimpleGrid } from "@chakra-ui/react";

// data define
type StateType = {
  isAuthrized: boolean;
};

type ContextType = {
  state: StateType;
  login: (passCode: string) => UserAuthResult;
  logout: () => void;
};

const service = new UserAuthService();
const initialState = { isAuthrized: false };

const UserAuthContext = createContext({} as ContextType);

export function useUserAuth(): ContextType {
  return useContext(UserAuthContext);
}

let isInitilized = false;
export const UserAuthProvider = ({ children }: any) => {
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);

  function login(passCode: string): UserAuthResult {
    const result = service.login(passCode);
    setState({ ...state, isAuthrized: result.isSucessful });
    return result;
  }

  function logout(): void {
    service.logout();
    setState({ ...state, isAuthrized: false });
  }

  useEffect(() => {
    setLoading(true);
    if (!isInitilized) {
      const result = service.getInitState();
      setState({ ...state, isAuthrized: result.isSucessful });
      isInitilized = true;
    }
    setLoading(false);
  }, []);

  const values = {
    state,
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
    <UserAuthContext.Provider value={values}>
      {!loading && children}
    </UserAuthContext.Provider>
  );
};
