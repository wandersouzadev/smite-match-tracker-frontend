import { theme } from "@/styles/theme";
import styled from "styled-components";

export interface TeamTheme {
  isRanked: boolean;
  colors: {
    primary: string;
    secondary: string;
    background: string;
  };
}

export const TeamsOverlayWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  /* background-color: ${theme.colors.mauve1}; */
`;

export const TeamTable = styled.table<TeamTheme>`
  color: ${theme.colors.mauve12};

  & tbody tr {
    background-color: ${(props) => props.colors.secondary};
  }

  & tbody td:nth-child(2) {
    width: 40%;
  }

  & tbody tr:nth-child(odd) {
    background-color: ${(props) => props.colors.primary};
  }

  & tbody td {
    text-align: center;
    span {
      font-weight: initial;
    }
  }
`;

export const TeamHead = styled.thead``;

export const TeamBody = styled.tbody``;

export const GodThumb = styled.img`
  width: 3rem;
  height: 3rem;
  vertical-align: bottom;
  object-fit: cover;
  object-position: top;
`;

export const GodPlayerName = styled.div<{ isRanked: boolean }>`
  font-size: ${(props) => (props.isRanked ? "0.7rem" : "1rem")};
`;
export const MMR = styled.div`
  font-size: 0.8rem;
  font-weight: bold;
`;
export const WinLose = styled.div`
  font-size: 0.7rem;
  font-weight: bold;
`;

export const Region = styled.div``;

export const Text = styled.p<{ size: string }>`
  font-size: ${(props) => props.size};
  font-weight: bold;
`;

export const TextSpan = styled.span`
  font-weight: normal;
`;

export const MinimizedTeamWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;

  img {
    cursor: pointer;

    &:hover {
      border: solid 2px ${theme.colors.violet8};
    }
  }
`;

export const MinimizedImg = styled.img`
  cursor: pointer;
`;

export const MatchQueueData = styled.div``;

export const CloseButton = styled.span`
  position: absolute;
  border: none;
  outline: none;
  right: -25px;
  top: 0;
  cursor: pointer;
`;
