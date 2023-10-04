import { extendTheme } from "@chakra-ui/react";
import { theme as chakraTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    ...chakraTheme.fonts,
    heading: "M PLUS Rounded 1c",
    body: "M PLUS Rounded 1c",
  },
  textStyles: {
    h2: {
      fontSize: ["1.75rem", "2.5rem"],
    },
    h3: {
      fontSize: ["1.25rem", "1.5rem"],
      fontWeight: "semibold",
    },
    admenu: {
      fontSize: ["1.5rem", "1.75rem"],
      fontWeight: "semibold",
      color: "blue",
    },
    p: {
      fontSize: ["1rem", "1.25rem"],
    },
    greeting: {
      fontSize: ["1rem", "1.25rem"],
      lineHeight: ["1.7em", "1.9em"]
    },    
    menu: {
      fontSize: ["1rem", "1.1rem"],
      fontWeight: "bold",
    },
    event_title: {
      fontSize: ["1.25rem", "1.7rem"],
    },
    event_contents: {
      fontSize: ["1rem", "1.25rem"],
    },
    error: {
      fontSize: ["1rem", "1.25rem"],
      color: "red",
    },
    keyword: {
      fontSize: ["1.5rem", "3rem"],
      color: "#610081",
    },
  },
});
export default theme;
