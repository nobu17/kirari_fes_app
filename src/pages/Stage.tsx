import * as React from "react";
import { SimpleGrid, Center, Spinner, Text } from "@chakra-ui/react";
import StageCard from "../components/stage/StageCard";
import PageTitle from "../components/common/PageTitle";
import useStage from "../hooks/UseStage";

type StageInfo = {
  name: string;
  kindName: string;
  title: string;
  message: string;
  movieUrl: string;
};

const stageId = "1";

export default function Stage() {
  const { stages, error, loading } = useStage(stageId);

  const getErrorMessage = (error: Error | undefined) => {
    if (error) {
      return (
        <Text textStyle="error">
          エラーが発生しました。お手数ですがリロードしていただくか、しばらく時間をおいてアクセスしてください。
        </Text>
      );
    }
  };

  const getStage = (loading: boolean, stages: StageInfo[]) => {
    const getColor = (index: number) => {
      return index % 2 === 0 ? "#FAF5FF" : "#F0FFF4";
    };
    if (loading) {
      return (
        <Center>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Center>
      );
    } else {
      return (
        <>
          <SimpleGrid columns={{ sm: 1, md: 1, lg: 1 }} spacing="20px">
            {stages.map((m, index) => (
              <StageCard key={index} bg={getColor(index)} {...m}></StageCard>
            ))}
          </SimpleGrid>
        </>
      );
    }
  };

  return (
    <>
      <PageTitle title="ステージ発表"></PageTitle>
      {getErrorMessage(error)}
      {getStage(loading, stages)}
    </>
  );
}
