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

type StageInfo = {
  name: string;
  kindName: string;
  title: string;
  message: string;
  movieUrl: string;
};

type StageEditFormFormProps = {
  stage: StageInfo;
  isLoading: boolean;
  onStageInfoChanged: callbackAuthorInfo;
  onDelete: VoidFunction;
};
interface callbackAuthorInfo {
  (stageInfo: StageInfo): void;
}

export default function StageEditForm(props: StageEditFormFormProps) {
  return (
    <Center>
      <Box
        m={2}
        p={4}
        borderColor="blue"
        borderWidth="2px"
        borderRadius="lg"
        maxW="1100px"
      >
        <Center mb={2}>
          <FormControl maxW="960px">
            <FormLabel>団体名：</FormLabel>
            <Input
              maxW="960px"
              type="text"
              placeholder="団体名"
              value={props.stage.name}
              onChange={(e) => {
                const newValue = {
                  ...props.stage,
                  ...{ name: e.target.value },
                };
                props.onStageInfoChanged(newValue);
              }}
            />
          </FormControl>
        </Center>
        <Center mb={2}>
          <FormControl maxW="960px">
            <FormLabel>分類：</FormLabel>
            <Input
              maxW="960px"
              type="text"
              placeholder="分類"
              value={props.stage.kindName}
              onChange={(e) => {
                const newValue = {
                  ...props.stage,
                  ...{ kindName: e.target.value },
                };
                props.onStageInfoChanged(newValue);
              }}
            />
          </FormControl>
        </Center>
        <Center mb={2}>
          <FormControl maxW="960px">
            <FormLabel>ステージタイトル：</FormLabel>
            <Input
              maxW="960px"
              type="text"
              placeholder="ステージタイトル"
              value={props.stage.title}
              onChange={(e) => {
                const newValue = {
                  ...props.stage,
                  ...{ title: e.target.value },
                };
                props.onStageInfoChanged(newValue);
              }}
            />
          </FormControl>
        </Center>
        <Center mb={2}>
          <FormControl maxW="960px">
            <FormLabel>Youtube Url：</FormLabel>
            <Input
              maxW="960px"
              type="text"
              placeholder="Youtube Url"
              value={props.stage.movieUrl}
              onChange={(e) => {
                const newValue = {
                  ...props.stage,
                  ...{ movieUrl: e.target.value },
                };
                props.onStageInfoChanged(newValue);
              }}
            />
          </FormControl>
        </Center>
        <Center mb={2}>
          <FormControl maxW="960px">
            <FormLabel>紹介文：</FormLabel>
            <Textarea
              maxW="960px"
              placeholder="紹介文"
              rows={5}
              value={props.stage.message}
              onChange={(e) => {
                const newValue = {
                  ...props.stage,
                  ...{ message: e.target.value },
                };
                props.onStageInfoChanged(newValue);
              }}
            />
          </FormControl>
        </Center>
        <Center>
          <Box
            w="960px"
            align="center"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
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
  );
}
