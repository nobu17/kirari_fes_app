import React, { useRef } from "react";
import { SimpleGrid, Box, Center, SlideFade } from "@chakra-ui/react";
import { useInViewport } from "react-in-viewport";
import LineBreakP from "../common/LineBreakP";

type StageProps = {
  name: string;
  kindName: string;
  title: string;
  message: string;
  movieUrl: string;
  bg: string;
};

export default function StageCard(props: StageProps) {
  const ref = useRef(null);
  const { enterCount } = useInViewport(
    ref,
    { rootMargin: "-100px" },
    { disconnectOnLeave: false },
    {}
  );
  return (
    <SlideFade in={enterCount > 0} offsetY="20px">
      <Center>
        <Box
          w="90%"
          align="center"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          ref={ref}
        >
          <SimpleGrid columns={{ sm: 1, md: 1, lg: 2 }}>
            <Box display={{ base: "flex", md: "none" }} textAlign="center">
              <iframe
                width="100%"
                src={props.movieUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </Box>
            <Box display={{ base: "none", md: "flex" }}>
              <iframe
                width="560"
                height="315"
                src={props.movieUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </Box>
            <Box p="6">
              <Box mt="1" textStyle="h3" as="h4" lineHeight="tight">
                {props.name}
              </Box>
              <Box mt="1" textStyle="p">
                {props.kindName}
              </Box>
              <Box mt="1" textStyle="p" lineHeight="tight">
                {props.title}
              </Box>
              <Box m={2}>
                <LineBreakP strings={props.message}></LineBreakP>
              </Box>
            </Box>
          </SimpleGrid>
        </Box>
      </Center>
    </SlideFade>
  );
}
