import * as React from "react";
import {
  SimpleGrid,
  Box,
  Text,
  Center,
  Image,
  keyframes,
  VStack,
} from "@chakra-ui/react";
import MovieDisplayButton from "../staff/MovieDisplayButton";
import LineBreakP from "../common/LineBreakP";
import { getImageUrl, getFallbackImageUrl } from "../../lib/Utility";

type StaffProps = {
  schoolName: string;
  members: string;
  message: string;
  imageUrl: string;
  movieUrl: string;
};

const fade = keyframes`
  from {opacity: 0; transform: translateY(20px);}
  to {opacity: 1; transform: translateY(0);}
`;

export default function StaffCard(props: StaffProps) {
  const animation = `${fade} 0.8s linear`;
  return (
    <Center>
      <Box
        animation={animation}
        w="90%"
        align="center"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
      >
        <SimpleGrid columns={{ sm: 1, md: 1, lg: 2 }}>
          <Center>
            <Image
              align="center"
              src={getImageUrl(props.imageUrl)}
              fallbackSrc={getFallbackImageUrl()}
              loading="lazy"
            />
          </Center>
          <VStack spacing={{ base: 3, md: 5 }} p="6">
            <VStack spacing={{ base: 3, md: 5 }}>
              <Text textStyle="h3" lineHeight="tight">
                {props.schoolName}
              </Text>
              {/* <Text textStyle="h3" lineHeight="tight">
                {props.members}
              </Text> */}
            </VStack>
            <VStack m={[2, 7]} spacing={{ base: 3, md: 10 }}>
              <LineBreakP strings={props.message}></LineBreakP>
              <Box m={6} align="center" fontSize="md">
                <MovieDisplayButton
                  title={props.schoolName}
                  movieUrl={props.movieUrl}
                ></MovieDisplayButton>
              </Box>
            </VStack>
          </VStack>
        </SimpleGrid>
      </Box>
    </Center>
  );
}
