import { theme } from "@/styles/theme";
import styled from "styled-components";

export const InputButton = styled.button`
  background-color: transparent;
  border: none;
  border-bottom: 2px solid ${theme.colors.mauve12};
  transition: 0.4s ease all;
  cursor: pointer;
  color: ${theme.colors.mauve9};
`;

export const InputGroup = styled.div`
  display: flex;
`;

export const Input = styled.input`
  font-size: 1.2rem;
  color: inherit;
  background-color: inherit;
  border: none;
  border-bottom: 2px solid ${theme.colors.purple12};
  transition: 0.4s ease all;

  &:focus {
    outline: none;
  }
`;

export const Label = styled.label((props) => ({
  fontSize: "0.9rem",
  position: "absolute",
  transition: "0.4s ease all",
  color: props.theme.colors.mauve9,
  top: 0
}));

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const Form = styled.form`
  position: relative;
  &:focus-within {
    ${Label} {
      font-size: 0.6rem;
      top: -25px;
      color: ${theme.colors.violet9};
    }

    ${Input} {
      border-bottom: 2px solid ${theme.colors.violet9};
    }

    ${InputButton} {
      border-bottom: 2px solid ${theme.colors.violet9};
      color: ${theme.colors.violet9};
    }
  }
`;

export const SmiteSearchConfirmationWrapper = styled.div``;

export const ConfirmationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (min-width: 915px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1220px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const LabelDisabled = styled.label``;

export const InputDisabled = styled.input`
  background-color: ${theme.colors.mauve7};
  border: none;
  font-size: 1.4rem;
  padding: 0.5rem;
  color: ${theme.colors.mauve11};
  border-radius: 0.3rem;
  cursor: not-allowed;
`;

export const ActionsWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  gap: 2rem;

  @media (min-width: 915px) {
    grid-column: span 2;
  }

  @media (min-width: 1220px) {
    grid-column: span 3;
  }
`;

export const ActionsButton = styled.button<{ bgColor: string }>`
  background-color: ${(props) =>
    props.bgColor ? theme.colors.violet7 : theme.colors.mauve7};
  border: 0;
  padding: 2px;
  color: ${theme.colors.mauve12};
  cursor: pointer;
  outline: none;
  overflow: hidden;
  border-radius: 0.5rem;

  &:hover {
    background-color: ${(props) =>
      props.disabled ? theme.colors.mauve8 : theme.colors.violet5};
  }

  svg {
    width: 60px;
    height: 40px;
  }
`;

export const FormErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
