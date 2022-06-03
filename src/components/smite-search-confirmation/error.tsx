import { ConfigFormState } from "@/recoil/atoms/config-form-state";
import { ArrowClockwise } from "phosphor-react";
import React from "react";
import { useSetRecoilState } from "recoil";
import * as S from "./styles";

export const FormError: React.FC = () => {
  const setFormState = useSetRecoilState(ConfigFormState);

  return (
    <S.FormErrorWrapper>
      <h1>Error, make sure your profile is not blocked</h1>
      <ArrowClockwise
        size={32}
        cursor="pointer"
        width={70}
        height={70}
        onClick={() => setFormState(false)}
      />
    </S.FormErrorWrapper>
  );
};
