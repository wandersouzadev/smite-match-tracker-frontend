import "@/styles/global.scss";
import { theme } from "@/styles/theme";
import { OverlayTemplate } from "@/template/video-overlay";
import React from "react";
import { createRoot } from "react-dom/client";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";

const container = document.getElementById("app");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <OverlayTemplate />
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>
);
