import React, { FC, useState } from "react";

import PointsDisplay from "./PointsDisplay/PointsDisplay";
import Cookie from "./Cookie";
import Advertisement from "../Advertisement";
import Boosts from "../Boosts/Boosts";
import Stats from "./Stats/Stats";

import ShopList from "../Shop/ShopList";
import UpgradesList from "../Shop/UpgradesList";
import PurchaseAmount from "./PurchaseAmount";
import {
  MainSection,
  ShopSection,
  StyledGameBoard,
  TabContent,
  TabsWrapper,
} from "./styled";
import UpgradeAll from "./UpgradeAll";
import BuildingUpgradeTabs from "./BuildingUpgradeTabs";

const GameBoard: FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);

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
            setSelectedTab={setSelectedTab}
            selectedTab={selectedTab}
          />
          {selectedTab === 0 ? <PurchaseAmount /> : <UpgradeAll />}
        </TabsWrapper>

        <TabContent>
          {selectedTab === 0 ? <ShopList /> : <UpgradesList />}
        </TabContent>
        <Advertisement />
      </ShopSection>
    </StyledGameBoard>
  );
};

export default GameBoard;
