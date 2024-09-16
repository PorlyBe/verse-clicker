import React, { FC, useEffect, useMemo, useState } from "react";
import { maxUint256 } from "viem";
import {
  useAccount,
  useChainId,
  useContractReads,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";

import { useTrackedState } from "../../context/store";
import { PRESTIGE_SEPOLIA_ADDRESS } from "../../contracts/constants";
import getPrestigeDetails from "../../contracts/getPrestigeDetails.ts";
import getVerseTokenDetails from "../../contracts/getVerseTokenDetails";
import { formatNumber } from "../../helpers/formatNumber";
// import getPrestigeData from "../../helpers/getPrestigeData";
import getPrestigeSignature from "../../helpers/getPrestigeSignature";
import { H1 } from "../H1";
import Unlocks from "./Unlocks";
import { Wrapper } from "./styled";

interface Props {
  toggleOpen?: boolean;
  setToggleOpen?: (open: boolean) => void;
}

const PrestigeInfo: FC<Props> = ({ toggleOpen, setToggleOpen }) => {
  const { address } = useAccount();
  const chainId = useChainId();
  const { gameMode, player } = useTrackedState();
  const prestigeContractDetails = getPrestigeDetails(chainId);
  const verseContractDetails = getVerseTokenDetails(chainId);
  const [isOpen, setIsOpen] = useState(false);

  const { data, refetch } = useContractReads({
    contracts: [
      {
        ...prestigeContractDetails,
        functionName: "balanceOf",
        args: address ? [address, 0n] : [PRESTIGE_SEPOLIA_ADDRESS, 0n],
      },
      {
        ...prestigeContractDetails,
        functionName: "nonces",
        args: address ? [address] : [PRESTIGE_SEPOLIA_ADDRESS],
      },
      {
        ...verseContractDetails,
        functionName: "allowance",
        args: address ? [address, PRESTIGE_SEPOLIA_ADDRESS] : [],
      },
      {
        ...prestigeContractDetails,
        functionName: "uri",
        args: [0],
      },
    ],
  });

  const { write, data: writeData } = useContractWrite({
    ...prestigeContractDetails,
    functionName: "increasePrestigeLevel",
  });

  const { writeAsync: writeAuthorize } = useContractWrite({
    ...verseContractDetails,
    functionName: "approve",
  });

  const { status } = useWaitForTransaction(writeData);

  useEffect(() => {
    if (status === "success") {
      refetch();
    }
  }, [status]);

  /*   useEffect(() => {
    console.log(data);

    const getTokenData = async () => {
      if (!data) return;

      if (typeof data[3].result === "string") {
        const level = await getPrestigeData(data?.[3]?.result, 0);
        const points = await getPrestigeData(data?.[3]?.result, 1);
        console.log(level, points);
      }
    };

    getTokenData();
  }, [data]); */

  const allowance = useMemo(() => {
    return data?.[2].result;
  }, [data]);

  useEffect(() => {
    if (toggleOpen && setToggleOpen) {
      setIsOpen(true);

      setToggleOpen(false);
    }
  }, [toggleOpen]);

  return (
    <Wrapper $isOpen={isOpen}>
      <H1>Current Prestige</H1>

      <div>Your prestige: {player.prestige.level}</div>

      {player.prestige.level > 0 && <Unlocks />}
      <hr />
      <button
        type="button"
        disabled={player.cookies < player.prestige.cost || !allowance}
        onClick={async () => {
          if (!address) return;
          const signData = await getPrestigeSignature(address, gameMode);
          console.log("prestige", signData);
          if (!signData) return;

          const res = write({
            args: [signData?.signature, signData?.message],
          });

          console.log(res);
        }}
      >
        Prestige
      </button>
      {!allowance && (
        <button
          type="button"
          onClick={async () => {
            if (!prestigeContractDetails) return;

            const tx = await writeAuthorize({
              args: [prestigeContractDetails.address, maxUint256],
            });

            console.log(tx);
          }}
        >
          Authorize VERSE spend
        </button>
      )}
      <div>Available Prestige: {player.prestige.amounts.availableAmount}</div>

      <div>
        Next prestige requirement:{" "}
        {formatNumber(player.prestige.amounts.nextCost, 3)} total earned
      </div>
      <div>Status: {status}</div>
    </Wrapper>
  );
};

export default PrestigeInfo;
