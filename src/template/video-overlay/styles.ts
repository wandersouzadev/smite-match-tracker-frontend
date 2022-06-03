import styled from "styled-components";

export const OverlayWrapper = styled.div`
  display: absolute;
  margin: 6rem 0.5rem;
  max-width: 90vw;

  @media (min-width: 700px) {
    max-width: 35vw;
    min-width: max-content;
    height: 75vh;
  }

  @media (max-width: 400px) {
    display: none;
  }
`;
