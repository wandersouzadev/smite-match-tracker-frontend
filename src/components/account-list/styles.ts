import { theme } from "@/styles/theme";
import styled from "styled-components";

export const AccountsWrapper = styled.div`
  margin: 0 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Title = styled.h2`
  text-align: center;
`;

export const Accounts = styled.ul`
  text-align: center;
  list-style: none;
  background-color: ${theme.colors.violet4};
`;

export const Account = styled.li`
  font-size: 1.2rem;
  padding: 0 0.2rem;
  padding-top: 0.5rem;

  &:nth-child(1) {
    padding: 0.2rem;
    border: solid 2px ${theme.colors.mauve12};
  }
`;

export const AccountWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const AccountInfo = styled.div`
  display: flex;
  gap: 1rem;
`;
export const AccountActions = styled.div`
  display: flex;
  gap: 1rem;
`;

export const ActionButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: white;

  &:hover {
    color: ${theme.colors.violet6};
  }
`;
