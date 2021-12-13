import React from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Input,
  FormControl,
  FormErrorMessage,
  Button,
  Center,
} from "@chakra-ui/react";
import { useUserAuth } from "../contexts/UserAuthContext";

type FormData = {
  passCode: string;
};

export default function UserLogin() {
  const history = useHistory();
  const { login } = useUserAuth();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    mode: "all",
  });
  function onSubmit(values: FormData) {
    const urlParams = window.location?.pathname.split("/");
    let urlParam = urlParams.slice(-1)[0];
    return new Promise(() => {
      setTimeout(() => {
        const result = login(values.passCode);
        reset();
        if (result.isSucessful) {
          if (urlParam) {
            history.push("/" + urlParam);
          } else {
            history.push("/");
          }
        } else {
          if (result.hasError()) {
            alert(
              "ログインに問題が発生しました。お手数ですがしばらく時間を置いてアクセスをお願いいたします。"
            );
          } else {
            alert("ログインに失敗しました。");
          }
        }
      }, 1000);
    });
  }
  return (
    <>
      <h1>パスコードを入力してください。</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.passCode}>
          <Center m={2}>
            <FormErrorMessage>
              {errors.passCode && errors.passCode.message}
            </FormErrorMessage>
          </Center>

          <Input
            maxW="960px"
            id="passCode"
            placeholder="パスコード"
            {...register("passCode", {
              required: "入力が必要です。",
            })}
          />
        </FormControl>
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
