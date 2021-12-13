import * as React from "react";
import { SimpleGrid, Text, Image, Center } from "@chakra-ui/react";
import PageTitle from "../components/common/PageTitle";
import { getFallbackImageUrl } from "../lib/Utility";
import useEnviroment from "../hooks/UseEnviroment";
import LineBreak from "../components/common/LineBreak";

export default function Greeting() {
  const { getEnv } = useEnviroment();
  const imageUrl: string = `${process.env.PUBLIC_URL}/private_images/kocho.jpg`;
  const message: string | undefined = getEnv("REACT_APP_GREETING_MESSAGE");
  const author: string | undefined = getEnv("REACT_APP_GREETING_AUTHOR");
  return (
    <>
      <PageTitle title="ごあいさつ" />
      <SimpleGrid columns={{ sm: 1, md: 1, lg: 2 }} spacing="20px" mr={[0, 6]}>
        <Center>
          <Image
            minH={["200px", "500px"]}
            align="center"
            src={imageUrl}
            fallbackSrc={getFallbackImageUrl()}
          />
        </Center>
        <Text align="left" textStyle="greeting">
          <LineBreak msg={message as string} />
        </Text>
        <Text></Text>
        <Text as="span" align="right" mr={5} textStyle="p">
          <LineBreak msg={author as string} />
        </Text>
      </SimpleGrid>
    </>
  );
}
