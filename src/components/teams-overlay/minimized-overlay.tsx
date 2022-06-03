import { minimizedState } from "@/recoil/atoms/system";
import React from "react";
import { useRecoilState } from "recoil";
import * as S from "./styles";

export const MinimizedOverlay: React.FC = () => {
  const [minimized, setMinimized] = useRecoilState(minimizedState);
  const handleExtClick = () => {
    setMinimized(false);
    setTimeout(() => {
      if (!minimized) {
        setMinimized(true);
      }
    }, 120000);
  };
  return (
    <S.MinimizedTeamWrapper onClick={handleExtClick}>
      <S.MinimizedImg
        src="logo-min.png"
        alt="Smite Logo"
        width={100}
        height={100}
      />
    </S.MinimizedTeamWrapper>
  );
};
