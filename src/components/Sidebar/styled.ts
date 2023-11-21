import styled from "styled-components";

export const Wrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.75rem;
  gap: 0.5rem;
  z-index: 50;

  top: 50%;
  transform: translateY(-50%);

  right: 0;

  @media (min-width: 768px) {
    left: 0;
    right: unset;
  }
`;

export const SidebarButton = styled.button`
  background: linear-gradient(180deg, #425472 0%, #313e57 100%);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  outline: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;

  @media (min-width: 768px) {
    left: 0;
    right: unset;
    padding: 1rem;
    box-shadow: 0px 0px 2rem 0px #2fa9ee33;
    & > svg {
      height: 1.25rem;
      width: 1.25rem;
    }
  }
`;
