import React, { FC } from "react";
import styled from "styled-components";

const StyledFooter = styled.footer`
  display: flex;
  justify-content: flex-end;
  min-height: 20rem;

  padding: 1rem;
  flex-direction: column;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

const Footer: FC = () => {
  return (
    <StyledFooter>
      <Wrapper>
        <div>Copyright 2023</div>
      </Wrapper>
    </StyledFooter>
  );
};

export default Footer;
