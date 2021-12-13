import * as React from "react";
import {
  Center,
  Image,
  Box,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Spinner,
  keyframes,
} from "@chakra-ui/react";
import { useState } from "react";
import { ImageInfo } from "../../hooks/UseGallery";
import { getImageUrl, getFallbackImageUrl } from "../../lib/Utility";
import { LazyLoadImage } from "react-lazy-load-image-component";

type ImageListProps = {
  imageList: ImageInfo[];
};

let defaultImage: ImageInfo = {
  imageUrl: "",
  thumbNailUrl: "",
  authorInfo: "",
};

const fade = keyframes`
  from {opacity: 0;}
  to {opacity: 1;}
`;

export default function ImageList(props: ImageListProps) {
  const animation = `${fade} 1s linear`;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentImage, setCurrentImage] = useState<ImageInfo>(defaultImage);
  const handleClick = (info: ImageInfo): void => {
    setCurrentImage(info);
    onOpen();
  };
  return (
    <>
      <Box
        padding={[0, 4]}
        w="100%"
        mx="auto"
        maxW="1500px"
        animation={animation}
        sx={{ columnCount: [3, 4, 5], columnGap: "8px" }}
      >
        {props.imageList.map((i, index) => (
          <Box
            key={index + i.imageUrl}
            onClick={() => handleClick(i)}
            w="100%"
            src={`${process.env.PUBLIC_URL}/images/noimage.png`}
            borderRadius="xl"
            d="inline-block"
            overflow="hidden"
            _hover={{
              "transition-duration": "0.5s",
              color: "red.500",
              opacity: "0.6",
            }}
          >
            <Center>
              <Image
                src={i.thumbNailUrl}
                // loading="lazy"
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
                // fallbackSrc={getFallbackImageUrl()}
              />
              {/* <LazyLoadImage
                placeholderSrc={getFallbackImageUrl()}
                placeholder={
                  <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="red.500"
                    size="xl"
                  />
                }
                src={getImageUrl(i.thumbNailUrl)}
              ></LazyLoadImage> */}
            </Center>
            {/* <Image
              src={getImageUrl(i.imageUrl)}
              fallbackSrc={getFallbackImageUrl()}
              loading="lazy"
            ></Image> */}
          </Box>
        ))}
      </Box>
      {/* <SimpleGrid columns={[3, 4, 5]} spacing="20px" transitionDuration="2s" animation={animation}>
        {props.imageList.map((i, index) => (
          <Box key={index + i.imageUrl} onClick={() => handleClick(i)}>
            <Center
              overflow="hidden"
              _hover={{
                transform: "scale(1.1)",
                "transition-duration": "0.5s",
                color: "red.500",
                opacity: "0.6",
              }}
            >
              <LazyLoadImage
                placeholderSrc={getFallbackImageUrl()}
                src={getImageUrl(i.imageUrl)}
              ></LazyLoadImage>
            </Center>

            <Text fontSize="md">{i.authorInfo}</Text>
          </Box>
        ))}
      </SimpleGrid> */}

      <Modal
        blockScrollOnMount={true}
        onClose={onClose}
        size="3xl"
        isOpen={isOpen}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{currentImage.authorInfo}</ModalHeader>
          <ModalCloseButton _focus={{ boxShadow: "none" }} />
          <ModalBody mb={4}>
            <Center>
              <Image
                align="center"
                objectFit="cover"
                htmlWidth="100%"
                src={currentImage.imageUrl}
                fallback={
                  <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="red.500"
                    size="xl"
                  />
                }
                // fallbackSrc={getFallbackImageUrl()}
              />
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
