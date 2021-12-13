import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  Flex,
  Heading,
  Center,
  Stack,
  Text,
  SlideFade,
  keyframes,
} from "@chakra-ui/react";
import LineBreak from "../common/LineBreak";
import { Icon } from "@chakra-ui/react";
import { IconType } from "react-icons/lib";
import { useInViewport } from "react-in-viewport";

type EventSplitCardProps = {
  title: string;
  explaination: string;
  linkUrl: string;
  iconType: IconType;
  color: string;
};

const keyanime = keyframes`
0% , 100%{
    transform: rotate(10deg);
}
50%{
    transform: rotate(-10deg);
}
`;

export default function EventSpritCard(props: EventSplitCardProps) {
  const ref = useRef(null);
  const { enterCount } = useInViewport(
    ref,
    { rootMargin: "-50px" },
    { disconnectOnLeave: false },
    {}
  );
  const iconanimation = `${keyanime} 2s linear infinite;`;
  const history = useHistory();
  const handleClick = (linkUrl: string) => {
    window.scrollTo(0, 0);
    if (!linkUrl) {
      // history.push("/");
      alert("現在準備中です。後日公開予定です。");
      return;
    }
    if (linkUrl.startsWith("http")) {
      window.open(linkUrl, "_blank");
    } else {
      history.push(linkUrl);
    }
  };
  return (
    <SlideFade
      in={enterCount > 0}
      offsetY="20px"
    >
      <Center borderWidth="1px" borderRadius="lg" m={1} ref={ref}>
        <Flex p={8} flex={1} align={"center"} justify={"center"}>
          <Stack spacing={6} w={"full"} maxW={"lg"}>
            <Center>
              <Icon
                animation={iconanimation}
                onClick={() => handleClick(props.linkUrl)}
                as={props.iconType}
                color={props.color}
                w={20}
                h={20}
                _hover={{
                  transitionDuration: "0.5s",
                  opacity: "0.6",
                }}
              />
            </Center>

            <Heading fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}>
              <Text as={"span"} position={"relative"}>
                {props.title}
              </Text>
              <br />{" "}
            </Heading>
            <Text fontSize={{ base: "md", lg: "lg" }} color={"gray.900"}>
              <LineBreak msg={props.explaination} />
            </Text>
            <Stack direction={{ base: "column", md: "column" }} spacing={4}>
              <Button
                onClick={() => handleClick(props.linkUrl)}
                bg={"gray.900"}
                color={"white"}
                rounded={"md"}
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "lg",
                }}
              >
                詳細はこちら
              </Button>
            </Stack>
          </Stack>
        </Flex>
      </Center>
    </SlideFade>
  );
}
