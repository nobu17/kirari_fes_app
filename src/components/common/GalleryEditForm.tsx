import * as React from "react";
import {
  FormControl,
  Input,
  Box,
  Center,
  FormLabel,
  Button,
} from "@chakra-ui/react";
import ImageUpload from "./ImageUpload";

type GalleryEditFormProps = {
  authorInfo: string;
  imageUrl: string;
  isLoading: boolean;
  onAuthorInfoChanged: callbackAuthorInfo;
  onImageFileChanged: callbackImageInfo;
  onDelete: VoidFunction;
};
interface callbackAuthorInfo {
  (authorInfo: string): void;
}
interface callbackImageInfo {
  (imageFile: File): void;
}

export default function GalleryEditForm(props: GalleryEditFormProps) {
  return (
    <>
      <Center>
        <Box
          m={2}
          p={4}
          borderColor="blue"
          borderWidth="2px"
          borderRadius="lg"
          maxW="1100px"
        >
          <Center>
            <FormControl maxW="960px">
              <FormLabel>作者：</FormLabel>
              <Input
                maxW="960px"
                type="text"
                placeholder="作者"
                value={props.authorInfo}
                onChange={(e) => {
                  props.onAuthorInfoChanged(e.target.value);
                }}
              />
            </FormControl>
          </Center>
          <ImageUpload
            imageUploading={props.isLoading}
            imageUrl={props.imageUrl}
            onImageUploaded={(f) => {
              if (f != null) {
                props.onImageFileChanged(f);
              }
            }}
          ></ImageUpload>
          <Center>
            <Box
              w="960px"
              align="center"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              mb={2}
            >
              <Button
                colorScheme="red"
                isFullWidth
                isLoading={props.isLoading}
                onClick={(e) => props.onDelete()}
              >
                データ削除
              </Button>
            </Box>
          </Center>
        </Box>
      </Center>
    </>
  );
}
