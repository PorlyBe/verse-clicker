import React, { FC, useCallback, useMemo } from "react";
import { formatNumber } from "../../../../helpers/formatNumber";
import { Amount, Button, Cost, Image } from "./styled";
import { useTrackedState } from "../../../../context/store";
import { Title } from "../../../Title";
import { Text } from "../../../Text";
import Star from "../../../Icons/Star";
import Building from "../../../../classes/Building";
import { useProduction } from "../../../../hooks/useProduction";
import { useSocketCtx } from "../../../../context/SocketContext";
import {
  getBuildingsCost,
  getMaxBuilding,
} from "../../../../helpers/buildingHelpers";

import placeholder from "../../../../assets/placeholder.png";

interface Props {
  building: Building;
  index: number;
}

export const BuildingButton: FC<Props> = ({ building, index }) => {
  const { player, purchaseAmount } = useTrackedState();
  const { socket } = useSocketCtx();

  const { production } = useProduction(building);

  const buyBuilding = useCallback(
    (amount: number | "max") => {
      if (amount === "max") return;
      socket.emit("buy_building", { index, amount });
    },
    [building, index],
  );

  const { amount, cost } = useMemo(() => {
    if (purchaseAmount !== "max") {
      return {
        amount: purchaseAmount,
        cost: getBuildingsCost(purchaseAmount, building.cost),
      };
    }

    return getMaxBuilding(player.cookies, building.cost);
  }, [player.cookies, building.cost]);

  return (
    <Button
      disabled={player.cookies < cost}
      $unaffordable={player.cookies < cost}
      $locked={building.locked}
      onClick={() => {
        buyBuilding(amount);
      }}
    >
      <Amount>Owned: {building.amount}</Amount>

      <Image
        src={
          building.locked
            ? placeholder
            : `${process.env.PUBLIC_URL}/buildings/${building.image}`
        }
        style={{ height: "100%" }}
        alt={building.name}
      />

      <Title style={{ gridArea: "name", marginTop: "0.5rem" }}>
        {building.name}
      </Title>
      <Text style={{ gridArea: "desc" }}>{building.desc}</Text>
      <Text style={{ gridArea: "info", marginBottom: "0.5rem" }}>
        {formatNumber(production)}/sec
        <span style={{ color: "#899bb5" }}> each building, </span>
        {formatNumber(production * building.amount)}/sec
        <span style={{ color: "#899bb5" }}> overall</span>
      </Text>

      <Cost $unaffordable={player.cookies < cost}>
        <span>x{amount || 1}</span>
        <div>
          <Star size={12} />
        </div>
        {formatNumber(cost)}
      </Cost>
    </Button>
  );
};

export default BuildingButton;
