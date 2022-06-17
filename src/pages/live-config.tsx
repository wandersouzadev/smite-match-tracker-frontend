import "@/styles/global.scss";
import { LiveConfigTemplate } from "@/template/live-config";
import React from "react";
import { createRoot } from "react-dom/client";
import { RecoilRoot } from "recoil";

const container = document.getElementById("app");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <LiveConfigTemplate />
    </RecoilRoot>
  </React.StrictMode>
);
