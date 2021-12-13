import * as React from "react";
import { Box } from "@chakra-ui/react";

type PageTitleProps = {
    title: string
  };

export default function PageTitle(props:PageTitleProps) {
  return (
    <>
      <Box my={3} textStyle="h2" color={'blue.400'}>{props.title}</Box>
    </>
  );
}
