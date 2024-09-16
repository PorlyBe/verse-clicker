import React, { FC } from "react";

import Mouse from "../../Icons/Mouse";
import Upgrades from "../../Icons/Upgrades";
import Tabs, { TabButton } from "../../Tabs";

interface Props {
  setSelectedTab: (tab: number) => void;
  selectedTab: number;
}

const BuildingUpgradeTabs: FC<Props> = ({ setSelectedTab, selectedTab }) => {
  return (
    <>
      <Tabs
        tabs={[
          <TabButton
            key="buildings"
            $isSelected={selectedTab === 0}
            type="button"
            onClick={() => setSelectedTab(0)}
          >
            <Mouse size={32} />
            Tools
          </TabButton>,
          <TabButton
            key="upgrades"
            $isSelected={selectedTab === 1}
            type="button"
            onClick={() => setSelectedTab(1)}
          >
            <Upgrades />
            Upgrades
          </TabButton>,
          <TabButton
            key="prestige"
            $isSelected={selectedTab === 2}
            type="button"
            onClick={() => setSelectedTab(2)}
          >
            <Upgrades />
            Prestige
          </TabButton>,
        ]}
      />
    </>
  );
};

export default BuildingUpgradeTabs;
