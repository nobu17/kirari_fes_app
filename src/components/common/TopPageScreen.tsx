import * as React from "react";
import { Flex, Image, Stack, Text, Spinner, Center } from "@chakra-ui/react";

export default function TopPageScreen() {
  const imageUrl: string = `${process.env.PUBLIC_URL}/private_images/poster.jpg`;
  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex flex={1}>
        <Image
          alt={"Poster Image"}
          objectFit={"cover"}
          src={imageUrl}
          fallback={
            <Center>
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="red.500"
                size="xl"
              />
            </Center>
          }
        />
      </Flex>
      <Flex p={1} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={{ base: 3, md: 20 }} mt={3}>
          <Stack>
            <Text textStyle="p">今年度スローガン</Text>
            <Text textStyle="keyword" fontWeight="semibold">
              「輝け青春の１ページ！！」
            </Text>
          </Stack>

          <Stack spacing={4}>
            <Text textStyle="p">
              今年の輝祭は各会場とオンラインでの同時開催で行います。
              <br />
            </Text>
            <Text textStyle="p">公開期間：11月12日(金) 〜 12月31日(金)</Text>
          </Stack>
        </Stack>
      </Flex>
    </Stack>
  );
}
