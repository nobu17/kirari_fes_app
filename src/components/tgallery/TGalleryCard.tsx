import * as React from "react";
import {
  SimpleGrid,
  Box,
  Text,
  Center,
  Image,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import LineBreakP from "../common/LineBreakP";
import { getImageUrl, getFallbackImageUrl } from "../../lib/Utility";

type TGalleryProps = {
  title: string;
  message: string;
  imageUrl: string;
};

export default function StaffCard(props: TGalleryProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Center>
      <Box
        w="90%"
        align="center"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        m={3}
      >
        <SimpleGrid columns={{ sm: 1, md: 1, lg: 2 }}>
          <Center
            onClick={() => {
              onOpen();
            }}
            overflow="hidden"
            transitionDuration="0.5s"
            _hover={{
              transform: "scale(1.1)",
              "transition-duration": "0.5s",
              color: "red.500",
              opacity: "0.6",
            }}
          >
            <Image
              objectFit="cover"
              align="center"
              src={getImageUrl(props.imageUrl)}
              fallbackSrc={getFallbackImageUrl()}
              loading="lazy"
            />
          </Center>
          <Box p="6">
            <Text textStyle="h3" lineHeight="tight">
              {props.title}
            </Text>
            <Box m={2}>
              <LineBreakP strings={props.message}></LineBreakP>
            </Box>
          </Box>
        </SimpleGrid>
        <Modal onClose={onClose} size="3xl" isOpen={isOpen}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{props.title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody mb={4}>
              <Center>
                <Image
                  align="center"
                  objectFit="cover"
                  htmlWidth="100%"
                  src={props.imageUrl}
                  fallbackSrc={getFallbackImageUrl()}
                  loading="lazy"
                />
              </Center>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    </Center>
  );
}
