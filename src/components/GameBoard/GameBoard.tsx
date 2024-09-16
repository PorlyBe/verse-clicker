import React, { FC, useState } from "react";

import Advertisement from "../Advertisement";
import Boosts from "../Boosts/Boosts";
import PrestigeInfo from "../PrestigeInfo";
import ShopList from "../Shop/ShopList";
import UpgradesList from "../Shop/UpgradesList";
import BuildingUpgradeTabs from "./BuildingUpgradeTabs";
import Cookie from "./Cookie";
import PointsDisplay from "./PointsDisplay/PointsDisplay";
import PurchaseAmount from "./PurchaseAmount";
import Stats from "./Stats/Stats";
import UpgradeAll from "./UpgradeAll";
import {
  MainSection,
  ShopSection,
  StyledGameBoard,
  TabContent,
  TabsWrapper,
} from "./styled";

const GameBoard: FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const [toggleOpen, setToggleOpen] = useState(false);

  return (
    <StyledGameBoard>
      <MainSection>
        <Stats />
        <PointsDisplay />
        <Cookie />
        <Boosts />
      </MainSection>
      <ShopSection>
        <TabsWrapper>
          <BuildingUpgradeTabs
            setSelectedTab={(tabId) => {
              setSelectedTab(tabId);
              setToggleOpen(true);
            }}
            selectedTab={selectedTab}
          />
          {selectedTab === 0 ? <PurchaseAmount /> : <UpgradeAll />}
        </TabsWrapper>

        <TabContent>
          {selectedTab === 0 && (
            <ShopList toggleOpen={toggleOpen} setToggleOpen={setToggleOpen} />
          )}

          {selectedTab === 1 && (
            <UpgradesList
              toggleOpen={toggleOpen}
              setToggleOpen={setToggleOpen}
            />
          )}

          {selectedTab === 2 && (
            <PrestigeInfo
              toggleOpen={toggleOpen}
              setToggleOpen={setToggleOpen}
            />
          )}
        </TabContent>
      </ShopSection>
      <Boosts mobileVersion />
      <Advertisement mobileVersion />
    </StyledGameBoard>
  );
};

export default GameBoard;
