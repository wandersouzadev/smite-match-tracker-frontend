import "@/styles/global.scss";
import { OverlayTemplate } from "@/template/video-overlay";
import React from "react";
import { createRoot } from "react-dom/client";
import { RecoilRoot } from "recoil";

const container = document.getElementById("app");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <OverlayTemplate />
    </RecoilRoot>
  </React.StrictMode>
);
