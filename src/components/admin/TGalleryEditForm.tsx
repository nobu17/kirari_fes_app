import * as React from "react";
import {
  FormControl,
  Input,
  Box,
  Center,
  FormLabel,
  Button,
  Textarea,
} from "@chakra-ui/react";
import ImageUpload from "../common/ImageUpload";
import { TGalleryInfo } from "../../lib/TGalleryApi";

type TGalleryEditFormProps = {
  info: TGalleryInfo;
  isLoading: boolean;
  onTGalleryChanged: callbackStaffInfo;
  onImageFileChanged: callbackImageInfo;
  onDelete: VoidFunction;
};
interface callbackStaffInfo {
  (staff: TGalleryInfo): void;
}
interface callbackImageInfo {
  (imageFile: File): void;
}

export default function TGalleryEditForm(props: TGalleryEditFormProps) {
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
              <FormLabel>タイトル：</FormLabel>
              <Input
                maxW="960px"
                type="text"
                placeholder="タイトル"
                value={props.info.title}
                onChange={(e) => {
                  const newValue = {
                    ...props.info,
                    ...{ title: e.target.value },
                  };
                  props.onTGalleryChanged(newValue);
                }}
              />
            </FormControl>
          </Center>
          <Center>
            <FormControl maxW="960px">
              <FormLabel>説明：</FormLabel>
              <Textarea
                maxW="960px"
                rows={5}
                placeholder="説明"
                value={props.info.message}
                onChange={(e) => {
                  const newValue = {
                    ...props.info,
                    ...{ message: e.target.value },
                  };
                  props.onTGalleryChanged(newValue);
                }}
              />
            </FormControl>
          </Center>
          <ImageUpload
            imageUploading={props.isLoading}
            imageUrl={props.info.imageUrl}
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
