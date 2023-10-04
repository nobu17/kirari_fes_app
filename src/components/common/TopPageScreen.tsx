import * as React from "react";
import { Flex, Image, Stack, Text, Spinner, Center } from "@chakra-ui/react";

export default function TopPageScreen() {
  const imageUrl: string = `${process.env.PUBLIC_URL}/private_images/poster2022.jpg`;
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
              キラリ☆輝け!青春大爆発!!
            </Text>
          </Stack>

          <Stack spacing={4}>
            {/* <Text textStyle="p">
              ステージ発表動画、展示作品などがご覧いただけます
              <br />
            </Text> */}
            <Text textStyle="p">公開期間：11月11日(金) 〜 12月31日(土)</Text>
          </Stack>
        </Stack>
      </Flex>
    </Stack>
  );
}
