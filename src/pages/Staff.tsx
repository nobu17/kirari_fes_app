import * as React from "react";
import { Center, Spinner, Text, SimpleGrid } from "@chakra-ui/react";
import StaffCard from "../components/staff/StaffCard";
import PageTitle from "../components/common/PageTitle";
import useStaff from "../hooks/UseStaff";
import { StaffInfo } from "../lib/StaffApi";

const staffId = "1";

export default function Staff() {
  const { staffs, loading, error } = useStaff(staffId);

  const getErrorMessage = (error: Error | undefined) => {
    if (error) {
      return (
        <Text textStyle="error">
          エラーが発生しました。お手数ですがリロードしていただくか、しばらく時間をおいてアクセスしてください。
        </Text>
      );
    }
  };

  const getStaff = (loading: boolean, staffs: StaffInfo[]) => {
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
            {staffs.map((m, index) => (
              <StaffCard key={index} {...m}></StaffCard>
            ))}
          </SimpleGrid>
        </>
      );
    }
  };

  return (
    <>
      <PageTitle title="実行委員"></PageTitle>
      {getErrorMessage(error)}
      {getStaff(loading, staffs)}
    </>
  );
}
