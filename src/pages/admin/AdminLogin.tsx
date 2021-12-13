import React from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Center,
} from "@chakra-ui/react";
import { useAdminAuth } from "../../contexts/AdminAuthContext";

type FormData = {
  email: string;
  password: string;
};

export default function AdminLogin() {
  const history = useHistory();
  const { login } = useAdminAuth();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    mode: "all",
  });
  async function onSubmit(values: FormData) {
    const result = await login(values.email, values.password);
    reset({ email: values.email, password: "" });
    console.log(result);
    if (result.isSucessful) {
      history.push("/admin");
    } else {
      alert("ログインに失敗しました。");
    }
  }
  return (
    <>
      <h1>管理ログイン</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Center>
          <FormControl maxW="960px" isInvalid={!!errors.email}>
            <Center m={2}>
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </Center>
            <FormLabel>Email</FormLabel>
            <Input
              maxW="960px"
              id="email"
              placeholder="email"
              {...register("email", {
                required: "Emailの入力が必要です。",
              })}
            />
          </FormControl>
        </Center>
        <Center>
          <FormControl maxW="960px" isInvalid={!!errors.password}>
            <Center m={2}>
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </Center>
            <FormLabel>パスワード</FormLabel>
            <Input
              maxW="960px"
              type="password"
              id="password"
              placeholder="パスワード"
              {...register("password", {
                required: "パスワードの入力が必要です。",
              })}
            />
          </FormControl>
        </Center>
        <Button
          mt={4}
          colorScheme="teal"
          isLoading={isSubmitting}
          type="submit"
        >
          ログインする
        </Button>
      </form>
    </>
  );
}
