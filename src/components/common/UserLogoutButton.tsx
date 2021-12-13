import React from "react";
import { Button } from "@chakra-ui/react";
import { useUserAuth } from "../../contexts/UserAuthContext";

export default function UserLogoutButton() {
  const { state, logout } = useUserAuth();
  const handleClick = () => {
      logout()
  };
  if (!state.isAuthrized) {
    return <></>;
  }
  return (
    <Button
      fontSize={"sm"}
      fontWeight={600}
      color={"white"}
      bg={"pink.400"}
      onClick={handleClick}
      _hover={{
        bg: "pink.300",
      }}
    >
      ログアウト
    </Button>
  );
}
