import "@/styles/global.scss";
import { MobileTemplate } from "@/template/mobile";
import React from "react";
import { createRoot } from "react-dom/client";
import { RecoilRoot } from "recoil";

const container = document.getElementById("app");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <MobileTemplate />
    </RecoilRoot>
  </React.StrictMode>
);
