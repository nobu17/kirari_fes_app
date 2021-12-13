import * as React from "react";
import { useHistory } from "react-router-dom";
import { Box, Center, keyframes } from "@chakra-ui/react";
import LineBreak from "../common/LineBreak"

type EventProps = {
  title: string;
  explaination: string;
  linkUrl: string;
  color: string;
};

const fade = keyframes`
  from {opacity: 0; transform: translateY(20px);}
  to {opacity: 1; transform: translateY(0);}
`;


export default function EventCard(props: EventProps) {
  const animation = `${fade} 0.8s linear`;
  const history = useHistory();
  const handleClick = (linkUrl: string) => {
    window.scrollTo(0, 0);
    if (!linkUrl) {
      history.push("/");
      return;
    }
    if (linkUrl.startsWith("http")) {
      window.open(linkUrl, "_blank");
    } else {
      history.push(linkUrl);
    }
  };
  return (
    <Center m={1}>
      <Box
        animation={animation}
        w="90%"
        minH="200px"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        bg={props.color}
        onClick={() => handleClick(props.linkUrl)}
        transitionDuration="0.5s"
        _hover={{
          transform: "scale(1.1)",
          transitionDuration: "0.5s",
          color: "red.500",
          opacity: "0.6",
        }}
      >
        <Box p="6">
          <Box>
            <Box mb="4" textStyle="event_title">
              {props.title}
            </Box>
          </Box>
          <Box mb="1" textAlign="center" textStyle="event_contents">
            <LineBreak msg={props.explaination}></LineBreak>
          </Box>
          <Box></Box>
        </Box>
      </Box>
    </Center>
  );
}
