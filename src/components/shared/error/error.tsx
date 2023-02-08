import React from "react";
import Styles from "./error.module.scss";

interface Props {
  message?: string;
}

export const Error: React.FC<Props> = ({ message }) => {
  return (
    <div className={Styles.wrapper}>{message || "Temporarily unavailable"}</div>
  );
};
