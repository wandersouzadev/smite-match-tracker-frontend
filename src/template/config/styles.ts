import styled from "styled-components";
import { theme } from "../../styles/theme";

export const ConfigPageWrapper = styled.div`
  background-color: ${theme.colors.mauve1};
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 700px) {
    display: grid;
    height: 100vh;
    grid-template-columns: minmax(350px, 20vw) 1fr;
    grid-template-rows: 1fr;
  }
`;

export const Aside = styled.aside`
  background-color: ${(props) => props.theme.colors.mauve3};
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;

  @media (min-width: 700px) {
    height: initial;
  }
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4rem;
`;
