import React from "react";
import Styles from "./error.module.scss";

export const Error: React.FC = () => {
  return <div className={Styles.wrapper}>Temporarily unavailable</div>;
};
