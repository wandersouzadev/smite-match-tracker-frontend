import { GlobalStyles } from "@/styles/global-styles";
import { theme } from "@/styles/theme";
import { ConfigTemplate } from "@/template/config";
import React from "react";
import { createRoot } from "react-dom/client";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import "../styles/global.scss";

const container = document.getElementById("app");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <ConfigTemplate />
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>
);
