import React from "react";
import Styles from "./error.module.scss";

interface Props {
  message?: string;
}

export const Error: React.FC<Props> = ({
  message = "Temporarily unavailable"
}) => {
  return <div className={Styles.wrapper}>{message}</div>;
};
