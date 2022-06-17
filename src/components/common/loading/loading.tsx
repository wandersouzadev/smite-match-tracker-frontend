import React from "react";
import { SpinnerDiamond } from "spinners-react";
import Styles from "./styles.module.scss";

export const Loading: React.FC = () => {
  return (
    <div
      className={Styles.wrapper}
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <SpinnerDiamond color="#ada176" />
    </div>
  );
};
