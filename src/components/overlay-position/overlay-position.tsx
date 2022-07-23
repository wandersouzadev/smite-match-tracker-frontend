import React from "react";
import { PositionsButton } from "./positions-button";
import Styles from "./styles.module.scss";

export const OverlayPosition: React.FC = () => {
  return (
    <div className={Styles.wrapper}>
      <PositionsButton position="top-left" />
      <PositionsButton position="top-right" />
      <PositionsButton position="left" />
      <PositionsButton position="right" />
      <PositionsButton position="bottom-left" />
      <PositionsButton position="bottom-right" />
    </div>
  );
};
