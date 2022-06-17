import "@/styles/global.scss";
import { ConfigTemplate } from "@/template/config";
import React from "react";
import { createRoot } from "react-dom/client";
import { RecoilRoot } from "recoil";

const container = document.getElementById("app");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <ConfigTemplate />
    </RecoilRoot>
  </React.StrictMode>
);
