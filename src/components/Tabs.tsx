import React, { FC, ReactElement } from "react";
import styled, { css } from "styled-components";

const TabsWrapper = styled.div<{
  $mobileVersion?: boolean;
  $center?: boolean;
}>`
  width: 100%;
  display: grid;
  grid-auto-flow: column;
  gap: 0.75rem;

  padding: 0 0.75rem;
  grid-template-columns: repeat(2, 1fr);
  justify-content: center;

  @media (min-width: ${({ $mobileVersion }) => ($mobileVersion ? 0 : 768)}px) {
    background: linear-gradient(180deg, #425472 0%, #313e57 100%);
    padding: 0.25rem;
    border-radius: 2.25rem;
    gap: 0.3rem;
    width: fit-content;
    align-self: ${({ $center }) => ($center ? "center" : "flex-end")};
  }
`;

export const TabButton = styled.button<{
  $isSelected: boolean;
  $mobileVersion?: boolean;
}>`
  outline: none;
  border: none;

  background: linear-gradient(180deg, #425472 0%, #313e57 100%);
  color: #c5cedb;
  border-radius: 0.75rem;

  font-size: 1.125rem;
  font-weight: 600;
  text-align: center;

  padding: 1rem 0.5rem;
  display: flex;
  gap: 1rem;
  width: 100%;
  max-width: 15rem;
  justify-content: center;
  align-items: center;
  justify-self: center;

  & > svg {
    color: #586f91;
  }

  @media (min-width: ${({ $mobileVersion }) => ($mobileVersion ? 0 : 768)}px) {
    padding: 0.5rem;
    border-radius: 2.25rem;

    font-size: min(2.5vw, 0.875rem);

    cursor: pointer;

    & > svg {
      display: none;
    }

    ${({ $isSelected }) =>
      $isSelected
        ? css`
            background: #0085ff;
            color: white;
          `
        : css`
            background: transparent;
            color: #899bb5;
          `};
  }
`;

interface Props {
  tabs: ReactElement[];
  mobileVersion?: boolean;
  center?: boolean;
}

const Tabs: FC<Props> = ({ tabs, mobileVersion, center }) => {
  return (
    <TabsWrapper $mobileVersion={mobileVersion} $center={center}>
      {tabs.map((t) => t)}
    </TabsWrapper>
  );
};

export default Tabs;
