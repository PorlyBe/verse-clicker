import React, { FC } from "react";
import { Body, StarWrapper, YouBadge } from "./styled";
import { formatNumber } from "../../../helpers/formatNumber";
import Cursor from "../../Icons/Cursor";
import Star from "../../Icons/Star";
import useUsername from "../../../hooks/useUsername";

interface Props {
  address: string;
  isUser: boolean;
  index: string | number;
  stats: {
    Earned: number;
    Clicked: number;
    Spent: number;
  };
}

const Row: FC<Props> = ({ address, isUser, index, stats: item }) => {
  const userName = useUsername(address);

  return (
    <Body key={address}>
      <div>{index}</div>
      <div>
        {userName} {isUser && <YouBadge>🌟</YouBadge>}
      </div>
      <div>
        {formatNumber(Number(item.Clicked))} <Cursor size="0.875rem" />
      </div>
      <div>
        {formatNumber(Number(item.Earned))}
        <StarWrapper>
          <Star size="0.875rem" />
        </StarWrapper>
      </div>
    </Body>
  );
};

export default Row;
