import { ConfigFormState } from "@/recoil/atoms/config-form-state";
import { MagnifyingGlass } from "phosphor-react";
import React, { FormEvent } from "react";
import { useSetRecoilState } from "recoil";
import * as S from "./styles";

interface Props {
  setSmiteSearchAccount: (state: string) => void;
}

export const SearchForm: React.FC<Props> = ({ setSmiteSearchAccount }) => {
  const setFormState = useSetRecoilState(ConfigFormState);

  const handleSmiteSearch = (e: FormEvent) => {
    e.preventDefault();
    setFormState(true);
  };
  return (
    <S.Form onSubmit={handleSmiteSearch}>
      <S.Label htmlFor="smite-search">SMITE ACCOUNT</S.Label>
      <S.InputGroup>
        <S.Input
          onChange={(e) => setSmiteSearchAccount(e.target.value)}
          type="text"
          name="smite-search"
          id="smite-search"
          autoComplete="off"
        />
        <S.InputButton type="submit">
          <MagnifyingGlass size={20} />
        </S.InputButton>
      </S.InputGroup>
    </S.Form>
  );
};
