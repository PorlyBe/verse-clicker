import styled from "styled-components";

export const LeaderboardWrapper = styled.div`
  margin: 0 auto auto auto;
  width: 100%;
  flex-direction: column;
  display: flex;
  justify-content: space-between;
  background: #030c14;
  box-shadow: 0px 2px 60px 0px #2fa9ee33;
  border-radius: 1rem;
  padding: 1rem;
  z-index: 1000;
  @media (min-width: 768px) {
    width: 90%;
  }
`;

export const LeaderboardContent = styled.div`
  @media (min-width: 768px) {
    margin-right: -1.5rem;
    padding: 0.25rem 0 0 0;
    max-height: 90vh;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 0.25rem;
      background-color: #000;
      border-radius: 0.5rem;
      right: -1.5rem;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #313e57;
      border-radius: 0.5rem;
    }
  }
`;

export const YouBadge = styled.div`
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  grid-area: none;

  top: -1.25rem;

  right: 12.5rem;
  padding: 0.25rem 0.5rem;
  flex: 0;
  height: 1.5rem;
  width: 1.5rem;
  z-index: 999;

  border-radius: 50%;
  color: #c5cedb;
  background: linear-gradient(180deg, #425472 0%, #313e57 100%);
`;

export const Header = styled.div`
  display: grid;
  grid-template-columns: 1rem auto 5rem 5rem;

  font-size: 0.875rem;
  font-weight: 600;
  text-align: right;
  margin-bottom: 1rem;
  padding-right: 1.5rem;

  & > :nth-child(1),
  & > :nth-child(2) {
    text-align: left;
  }

  & > div {
    color: #899bb5;
  }
`;

export const StarWrapper = styled.div`
  & > svg {
    filter: drop-shadow(0px 2px 10px #ffb800);
    transform: translateZ(0);
  }
`;

export const Timer = styled.div`
  font-size: 0.875rem;
  font-weight: 400;
  color: #899bb5;
  text-align: center;
`;

export const Body = styled.div`
  position: relative;
  display: grid;
  width: 100%;
  margin-bottom: 1rem;

  font-size: 0.875rem;
  font-weight: 600;

  grid-template-columns: 0.5rem auto 5.5rem 5.5rem;
  gap: 0.75rem;

  & > ${YouBadge} {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & > :nth-child(3),
  & > :nth-child(4) {
    display: flex;
    gap: 0.25rem;
    justify-content: flex-end;
    align-items: center;
    font-family: monospace;
  }

  @media (min-width: 768px) {
    padding-right: 1.5rem;
  }
`;
