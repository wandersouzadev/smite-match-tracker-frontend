import { ConfigFormState } from "@/recoil/atoms/config-form-state";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { Confirmation } from "./confirmation";
import { SearchForm } from "./search-form";
import * as S from "./styles";

export const SmiteSearchConfirmation: React.FC = () => {
  // const [formState, setFormState] = useState(false);
  const [smiteSearchAccount, setSmiteSearchAccount] = useState<string>();
  const formState = useRecoilValue(ConfigFormState);
  return (
    <S.SmiteSearchConfirmationWrapper>
      {formState ? (
        <Confirmation
          smiteSearchAccount={smiteSearchAccount}
          setSmiteSearchAccount={setSmiteSearchAccount}
        />
      ) : (
        <SearchForm setSmiteSearchAccount={setSmiteSearchAccount} />
      )}
    </S.SmiteSearchConfirmationWrapper>
  );
};
