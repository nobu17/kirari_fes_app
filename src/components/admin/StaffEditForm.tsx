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
import { StaffInfo } from "../../lib/StaffApi";

type StaffEditFormProps = {
  staff: StaffInfo;
  isLoading: boolean;
  onStaffChanged: callbackStaffInfo;
  onImageFileChanged: callbackImageInfo;
  onDelete: VoidFunction;
};
interface callbackStaffInfo {
  (staff: StaffInfo): void;
}
interface callbackImageInfo {
  (imageFile: File): void;
}

export default function StaffEditForm(props: StaffEditFormProps) {
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
              <FormLabel>校舎名：</FormLabel>
              <Input
                maxW="960px"
                type="text"
                placeholder="校舎名"
                value={props.staff.schoolName}
                onChange={(e) => {
                  const newValue = {
                    ...props.staff,
                    ...{ schoolName: e.target.value },
                  };
                  props.onStaffChanged(newValue);
                }}
              />
            </FormControl>
          </Center>
          <Center>
            <FormControl maxW="960px">
              <FormLabel>メンバー名：</FormLabel>
              <Input
                maxW="960px"
                type="text"
                placeholder="メンバー名"
                value={props.staff.members}
                onChange={(e) => {
                  const newValue = {
                    ...props.staff,
                    ...{ members: e.target.value },
                  };
                  props.onStaffChanged(newValue);
                }}
              />
            </FormControl>
          </Center>
          <Center>
            <FormControl maxW="960px">
              <FormLabel>紹介文：</FormLabel>
              <Textarea
                maxW="960px"
                rows={3}
                placeholder="紹介文"
                value={props.staff.message}
                onChange={(e) => {
                  const newValue = {
                    ...props.staff,
                    ...{ message: e.target.value },
                  };
                  props.onStaffChanged(newValue);
                }}
              />
            </FormControl>
          </Center>
          <Center>
            <FormControl maxW="960px">
              <FormLabel>Youtube URL：</FormLabel>
              <Input
                maxW="960px"
                type="text"
                placeholder="Youtube URL"
                value={props.staff.movieUrl}
                onChange={(e) => {
                  const newValue = {
                    ...props.staff,
                    ...{ movieUrl: e.target.value },
                  };
                  props.onStaffChanged(newValue);
                }}
              />
            </FormControl>
          </Center>
          <ImageUpload
            imageUploading={props.isLoading}
            imageUrl={props.staff.imageUrl}
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
