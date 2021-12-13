import * as React from "react";
import {
  Center,
  Box,
  SimpleGrid,
  Image,
  Text,
  Button,
  VStack,
} from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import { getImageUrl } from "../../lib/Utility";

interface callbackType {
  (file: File | null): void;
}

type ImageUploadProps = {
  imageUrl: string;
  onImageUploaded: callbackType;
  imageUploading: boolean;
};

export default function ImageUpload(props: ImageUploadProps) {
  const uuid = uuidv4();
  const handleButtonClick = () => {
    const up = document.getElementById(uuid);
    up?.click();
  };
  const handleOnChange = (files: FileList | null) => {
    if (files !== null) {
      const file = files[0];
      props.onImageUploaded(file);
    }
  };
  const message = props.imageUploading ? "アップロード中" : "画像選択";

  return (
    <>
      <Center>
        <Box
          w="960px"
          align="center"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
        >
          <SimpleGrid columns={{ sm: 1, md: 1, lg: 1 }}>
            <Center>
              <Image
                align="center"
                src={getImageUrl(props.imageUrl)}
                maxH="300px"
              />
            </Center>
            <VStack align="stretch">
              <Text m="1" textStyle="p" isTruncated>
                {props.imageUrl}
              </Text>
              <Button
                onClick={handleButtonClick}
                colorScheme="teal"
                isLoading={props.imageUploading}
              >
                {message}
                <input
                  id={uuid}
                  type="file"
                  hidden
                  accept="image/jpeg, image/jpg, image/png"
                  onChange={(e) => handleOnChange(e.target.files)}
                />
              </Button>
            </VStack>
          </SimpleGrid>
        </Box>
      </Center>
    </>
  );
}
