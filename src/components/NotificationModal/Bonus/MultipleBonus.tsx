import React, { FC } from "react";
import { BonusData, TBonus } from "src/context/reducers/bonusData";

import { TxData } from "../../../context/reducers/returnData";
import Burn from "./Data/Burn";
import ScratcherClaim from "./Data/ScratcherClaim";
import ScratcherMint from "./Data/ScratcherMint";

/* const sample = {
  bonusBurnTxs: [
    {
      date: 1701136345476,
      burnAmount: 10000,
      txHash:
        "0x96c370bd3a32aa3658405b0ff74205ed91870efc1aded99389a90d451f4b5227",
      bonusAmount: 35396640,
    },
    {
      date: 1701136345476,
      burnAmount: 10000,
      txHash:
        "0x96c370bd3a32aa3658405b0ff74205ed91870efc1aded99389a90d451f4b5227",
      bonusAmount: 35396640,
    },
    {
      date: 1701136345476,
      burnAmount: 10000,
      txHash:
        "0x96c370bd3a32aa3658405b0ff74205ed91870efc1aded99389a90d451f4b5227",
      bonusAmount: 35396640,
    },
  ],
}; */

interface Props {
  txData?: TxData[];
  bonusData?: BonusData[];
  bonusType?: TBonus;
}

const MultipleBonus: FC<Props> = ({ txData, bonusData, bonusType }) => {
  const bonus = txData ?? bonusData;

  return (
    <>
      {bonusType === "burn" && <Burn bonusData={bonus} />}
      {bonusType === "scratcher" && <ScratcherClaim bonusData={bonus} />}
      {bonusType === "scratcher-mint" && <ScratcherMint bonusData={bonus} />}
    </>
  );
};

export default MultipleBonus;
