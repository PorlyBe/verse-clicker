import React, { useEffect } from "react";
import { memo } from "react-tracked";

import { useTrackedState } from "../../../context/store";
import { useAccount } from "wagmi";
import truncateEthAddress from "../../../helpers/truncateEthAddress";
import { formatNumber } from "../../../helpers/formatNumber";
import {
  Body,
  Header,
  LeaderboardWrapper,
  StarWrapper,
  YouBadge,
} from "./styled";

import Star from "../../Icons/Star";
import Cursor from "../../Icons/Cursor";
import Row from "./Row";

const Leaderboard = memo(() => {
  const { address } = useAccount();
  const { leaderboardAddresses, leaderboardStats } = useTrackedState();

  useEffect(() => {
    console.log(leaderboardAddresses);
  }, [leaderboardAddresses]);

  return (
    <LeaderboardWrapper>
      <Header>
        <div></div>
        <div>Address</div>
        <div>Clicks</div>
        <div>Earned</div>
      </Header>

      {leaderboardAddresses?.map((addr, index) => {
        const item = leaderboardStats[index];

        if (index >= 10) {
          if (addr === address) {
            return (
              <Row
                key={addr}
                address={addr}
                index="..."
                isUser={addr === address}
                stats={item}
              />
            );
          }

          return null;
        }

        return (
          <Row
            key={addr}
            address={addr}
            index={index + 1}
            isUser={addr === address}
            stats={item}
          />
        );
      })}
    </LeaderboardWrapper>
  );
});

export default Leaderboard;
