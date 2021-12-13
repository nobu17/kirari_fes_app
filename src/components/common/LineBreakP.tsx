import React from "react";
import { Text } from "@chakra-ui/react";

type LineBreakPProps = {
  strings: string;
};

export default function LineBreakP(props: LineBreakPProps) {
  const texts = props.strings.split("\n").map((item, index) => {
    return (
      <React.Fragment key={index}>
        {item}
        <br />
      </React.Fragment>
    );
  });
  return (
    <Text textStyle="p" align="left">
      {texts}
    </Text>
  );
}
