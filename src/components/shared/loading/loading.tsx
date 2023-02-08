import React from "react";
import Styles from "./loading.module.scss";

interface Props {
  children: React.ReactNode;
}

export const Loading: React.FC<Props> = ({ children }) => {
  return <div className={Styles.wrapper}>{children}</div>;
};
