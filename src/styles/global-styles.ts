import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle({
  "*": {
    margin: 0,
    padding: 0,
    boxSizing: "border-box"
  },

  body: {
    color: "white",
    fontFamily: "Open Sans, sans-serif",
    scrollBehavior: "smooth",
    scrollbarColor: "#6969dd #e0e0e0",
    scrollbarWidth: "thin",
    WebkitScrollSnapType: "none"
  }
});
