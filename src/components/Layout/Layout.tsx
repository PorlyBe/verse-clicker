import React, { FC, PropsWithChildren } from "react";
import { ThemeProvider } from "styled-components";

import { AudioProvider } from "../../context/AudioProvider";
import { useTrackedState } from "../../context/store";
import Banner from "../Banners/Banner";
import { themes } from "../themes";
import { ContentsWrapper, GlobalStyle } from "./styled";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const {
    gameMode: network,
    campaign: { campaignPhase },
    settings: { campaignBanner },
  } = useTrackedState();

  return (
    <ThemeProvider theme={themes[network]}>
      <AudioProvider>
        <ContentsWrapper>
          <GlobalStyle />
          {campaignBanner && campaignPhase !== "AFTER" && <Banner />}
          {children}
        </ContentsWrapper>
      </AudioProvider>
    </ThemeProvider>
  );
};

export default Layout;
