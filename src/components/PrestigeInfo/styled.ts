import styled, { css } from "styled-components";

export const Wrapper = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  background: black;
  display: flex;
  flex-direction: column;
  background: black;

  left: 0;
  width: 100%;
  height: 100%;

  z-index: 88;
  transition: bottom 0.25s ease-in-out;

  ${({ $isOpen }) =>
    $isOpen
      ? css`
          bottom: 0;
        `
      : css`
          bottom: -100%;
        `}

  @media (min-width: 768px) {
    height: unset;

    position: relative;
    background: transparent;

    display: flex;
    gap: 1rem;
    max-width: calc(100vw);
    overflow-x: auto;
    overflow-y: visible;
    padding: 1rem;
    padding: 0;

    gap: 0.5rem;
    flex-direction: column;

    padding-bottom: unset;
    padding-left: unset;
    padding-right: 1rem;
    max-width: unset;
    overflow: visible;
  }
`;
