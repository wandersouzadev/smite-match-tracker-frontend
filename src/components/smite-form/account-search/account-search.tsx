import { smiteFormState } from "@/recoil/atoms/smite-form";
import { MagnifyingGlass } from "phosphor-react";
import React, { useRef } from "react";
import { useRecoilState } from "recoil";
import Styles from "./account-search.module.scss";

export const SmiteFormAccountSearch: React.FC = () => {
  const [smiteForm, setSmiteForm] = useRecoilState(smiteFormState);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSmiteSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputRef.current?.value) {
      return;
    }
    setSmiteForm({
      ...smiteForm,
      nameOrId: inputRef.current!.value,
      step: 2
    });
    inputRef.current!.value = "";
  };

  const handleCustomPlatformLabel = (platformId: string) => {
    switch (platformId) {
      case "22":
        return "Insert your Nintendo Switch gamer name";
      case "9":
        return "Insert your PSN gamer name";
      case "10":
        return "Insert your XboxLive gamer name";
      default:
        return "Insert your Smite PC player name";
    }
  };

  return (
    <form className={Styles.form} onSubmit={handleSmiteSearch}>
      <label htmlFor="smite-search">
        {handleCustomPlatformLabel(smiteForm.platform!)}
      </label>
      <div className={Styles.control}>
        <input
          type="text"
          name="smite-search"
          id="smite-search"
          autoComplete="off"
          // eslint-disable-next-line
          autoFocus
          ref={inputRef}
        />
        <button type="submit">
          <MagnifyingGlass size={20} />
        </button>
      </div>
    </form>
  );
};
