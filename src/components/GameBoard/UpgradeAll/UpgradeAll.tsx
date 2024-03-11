import React, { FC, useCallback, useMemo } from "react";
import styled from "styled-components";

import { useAudio } from "../../../context/AudioProvider";
import { useSocketCtx } from "../../../context/SocketContext";
import { useTrackedState } from "../../../context/store";
import useUpgradesList from "../../../hooks/useUpgradesList";
import { Button } from "../../Button";
import { ModifiedUpgrade } from "../../Shop/UpgradesList/UpgradeButton";

export const Wrapper = styled.div<{ $show: boolean }>`
  display: ${({ $show }) => ($show ? "flex" : "none")};

  @media (min-width: 768px) {
    display: flex;
  }
`;

interface Props {
  mobileVersion?: boolean;
}

const UpgradeAll: FC<Props> = ({ mobileVersion = false }) => {
  const { socket } = useSocketCtx();
  const { player } = useTrackedState();
  const { playBuy } = useAudio();
  const upgradesList = useUpgradesList();

  const buyUpgrade = useCallback(
    (bIndex: number, uIndex: number) => {
      if (!socket) return;
      socket.emit("buy_upgrade", {
        building: bIndex,
        upgrade: uIndex,
      });
    },
    [socket],
  );

  const availableUpgrades = useMemo(() => {
    let availableCookies = player.cookies;

    return upgradesList.reduce((prev: ModifiedUpgrade[], upgrade) => {
      if (availableCookies > upgrade.cost) {
        availableCookies = availableCookies - upgrade.cost;

        return [...prev, upgrade];
      }
      return prev;
    }, []);
  }, [player.cookies, upgradesList]);

  const buyAllUpgrades = () => {
    if (availableUpgrades.length === 0) return;

    availableUpgrades.forEach((upgrade) => {
      buyUpgrade(upgrade.bIndex, upgrade.uIndex);
    });

    if (playBuy) playBuy();
  };

  return (
    <Wrapper $show={mobileVersion}>
      <Button
        $size="small"
        onClick={buyAllUpgrades}
        disabled={availableUpgrades.length === 0}
      >
        Buy all available
      </Button>
    </Wrapper>
  );
};

export default UpgradeAll;
