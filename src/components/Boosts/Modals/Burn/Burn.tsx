import React, { FC, useEffect, useState } from "react";
import LinkButton from "src/components/LinkButton";
import { generateBurnEngineUrl } from "src/helpers/links";
import { formatEther } from "viem";
import {
  useAccount,
  useContractWrite,
  useNetwork,
  useWaitForTransaction,
} from "wagmi";

import verseIcon from "../../../../assets/verse-icon.png";
import { useSocketCtx } from "../../../../context/SocketContext";
import { useTrackedState } from "../../../../context/store";
import getVerseTokenDetails from "../../../../contracts/getVerseTokenDetails";
import { logAmplitudeEvent } from "../../../../helpers/analytics";
import { formatNumber } from "../../../../helpers/formatNumber";
import { getBurnEngineExplorerLink } from "../../../../helpers/getBurnEngineExplorerLink";
import useVerseBalance from "../../../../hooks/useVerseBalance";
import { Container } from "../../../Container";
import { H3 } from "../../../H3";
import { Label } from "../../../Label";
import { Link } from "../../../Link";
import BurnEngineLink from "../../../Links/BurnEngineLink";
import PointsIcon from "../../../PointsIcon";
import Tabs, { TabButton } from "../../../Tabs";
import WarningChip from "../../../WarningChip";
import { Divider, Footnote, Icon, ModalWrapper, Price } from "../../styled";
import LoadingStates from "./LoadingStates";

export const BURN_LIST = [
  { title: "1 hour", value: 10000, hours: 1 },
  { title: "12 hours", value: 200000, hours: 12 },
  { title: "24 hours", value: 800000, hours: 24 },
];

const calculateBurnBonus = (burnAmount: number) => {
  if (burnAmount < 10_000) {
    return 0;
  } else if (10_000 <= burnAmount && burnAmount < 200_000) {
    return 3600; // 1 hour
  } else if (200_000 <= burnAmount && burnAmount < 800_000) {
    return 43200; // 12 hours
  } else {
    return 86400; // 24 hours
  }
};

const Burn: FC = () => {
  const { socket } = useSocketCtx();
  const { address } = useAccount();
  const { isWallet } = useTrackedState();
  const { chain } = useNetwork();
  const { data: readData, error } = useVerseBalance();
  const [newCookies, setNewCookies] = useState<number>();
  const { player } = useTrackedState();
  const verseTokenDetails = getVerseTokenDetails(chain?.id);

  const [balanceData, setBalanceData] = useState<{
    formatted: string;
    value: bigint;
  }>();

  const {
    data: txData,
    isLoading: isPendingWallet,
    isSuccess: isTxSent,
  } = useContractWrite({
    address: verseTokenDetails?.address,
    abi: verseTokenDetails?.abi,
    functionName: "transfer",
    chainId: chain?.id,
  });

  const { isSuccess: isTxConfirmed } = useWaitForTransaction(txData);

  const [showLoading, setShowLoading] = useState(false);

  const [selectedTab, setSelectedTab] = useState(0);
  const selectedBurn = BURN_LIST[selectedTab];

  const insufficientVerse = balanceData?.value
    ? selectedBurn.value > Number(formatEther(balanceData.value))
    : true;

  useEffect(() => {
    if (!readData) return;
    setBalanceData({ value: readData, formatted: formatEther(readData) });
  }, [readData, error]);

  useEffect(() => {
    if (isPendingWallet || isTxSent || isTxConfirmed) {
      setShowLoading(true);

      logAmplitudeEvent({
        name: "verse clicker burn",
        "blockchain address": address || "",
        blockchain: chain?.nativeCurrency.symbol,
        result: selectedBurn.value,
        txId: txData?.hash || "",
      });
    } else {
      setShowLoading(false);
    }
  }, [isPendingWallet, isTxSent, isTxConfirmed]);

  useEffect(() => {
    if (txData) {
      socket.emit("burn");
    }
  }, [txData]);

  useEffect(() => {
    const onBonus = (data: number) => {
      setNewCookies(data);
    };
    socket.on("bonus", onBonus);

    return () => {
      socket.off("bonus", onBonus);
    };
  }, []);

  return (
    <ModalWrapper>
      {showLoading ? (
        <LoadingStates
          isPendingWallet={isPendingWallet}
          isTxSent={isTxSent}
          isTxConfirmed={isTxConfirmed}
          newCookies={newCookies}
          selectedTab={selectedTab}
          txHash={txData?.hash}
        />
      ) : (
        <>
          <H3>Contribute VERSE to get an instant boost</H3>
          <Label>
            View the <BurnEngineLink /> for more information
          </Label>

          <Container>
            <Label $color="secondary">Boost duration</Label>
            <Tabs
              center
              mobileVersion
              tabs={BURN_LIST.map((button, i) => (
                <TabButton
                  key={i}
                  $mobileVersion
                  $isSelected={selectedTab === i}
                  type="button"
                  onClick={() => setSelectedTab(i)}
                >
                  {button.title}
                </TabButton>
              ))}
            />
            <Label $color="secondary">Quantity required</Label>
            <Price>
              <Icon src={verseIcon} />
              <Label $color={insufficientVerse ? "warning" : undefined}>
                {selectedBurn.value.toLocaleString()} VERSE
              </Label>
            </Price>
            <Label $color="secondary">Points you will receive</Label>

            <Price>
              <Label $color={insufficientVerse ? "warning" : undefined}>
                {formatNumber(
                  player.cps * calculateBurnBonus(selectedBurn.value),
                )}{" "}
              </Label>
              <PointsIcon size="0.75rem" />
            </Price>
            <Divider />
            <Label $color="secondary">
              Available:{" "}
              {balanceData?.formatted
                ? Number(balanceData.formatted).toLocaleString()
                : "0.00"}{" "}
              VERSE
            </Label>
          </Container>
          {insufficientVerse && (
            <WarningChip
              link={
                isWallet
                  ? "bitcoincom://buy/ETH_BLOCKCHAIN-ERC_20_PROTOCOL-0x249cA82617eC3DfB2589c4c17ab7EC9765350a18"
                  : `https://buy.bitcoin.com/verse/`
              }
            >
              You don&#39;t have enough VERSE. Buy now!
            </WarningChip>
          )}

          {!insufficientVerse && (
            <LinkButton
              href={generateBurnEngineUrl(isWallet)}
              target={isWallet ? "_self" : "_blank"}
              rel="noreferrer"
            >
              Burn VERSE
            </LinkButton>
          )}
          <Footnote>
            <Label $color="secondary">
              This transaction will send the specified VERSE to{" "}
              <Link
                href={getBurnEngineExplorerLink(chain?.id || 1)}
                target="_blank"
                rel="noreferrer"
              >
                this contract
              </Link>
              , making the sent VERSE permanently inaccessible.
            </Label>
          </Footnote>
        </>
      )}
    </ModalWrapper>
  );
};

export default Burn;
