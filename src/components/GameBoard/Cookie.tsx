import React, { FC } from "react";
import styled from "styled-components";

import verseLogo from "../../assets/verse-logo.png";
import cookie from "../../assets/cookie.png";

const CookieWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 64px;
`;

const VerseImage = styled.img`
  opacity: 0.9;
`;

const ClickButton = styled.button`
  max-width: 512px;
  width: 100%;
  position: relative;
  background: none;
  border: none;
  outline: none;

  & :hover {
    transform: scale(1.01);
  }

  & :active {
    transform: scale(0.99);
    opacity: 0.7;
  }

  &::after {
    position: absolute;
    content: "";

    background-image: url(${cookie});
    background-size: 100%;
    background-repeat: no-repeat;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }

  &:hover::after {
    transform: scale(1.01);
  }
  &:active::after {
    transform: scale(0.99);
  }
`;

const Cookie: FC = () => {
  return (
    <CookieWrapper>
      <ClickButton
        onClick={() => {
          console.log("clickit");
        }}
      >
        <VerseImage src={verseLogo} title="Verse Logo" />
      </ClickButton>
    </CookieWrapper>
  );
};

export default Cookie;
