import React, { FC } from "react";
import { useConnect } from "wagmi";

import injectedLogo from "../../../assets/injected.svg";
import mmLogo from "../../../assets/mm-logo.png";
import rabbyLogo from "../../../assets/rabby.svg";
import wcLogo from "../../../assets/wc-logo.png";
import { Button } from "../../Button";

interface Props {
  closeModal: () => void;
}

const getConnectorIcon = (name: string) => {
  switch (name) {
    case "WalletConnect":
      return wcLogo;
    case "Rabby Wallet":
      return rabbyLogo;
    case "MetaMask":
      return mmLogo;
    default:
      return injectedLogo;
  }
};

const ConnectorsList: FC<Props> = ({ closeModal }) => {
  const { connect, connectors } = useConnect();
  return (
    <>
      {connectors.map((connector) => {
        return (
          <Button
            key={connector.id}
            $size="small"
            $design="tertiary"
            onClick={() => {
              connect({
                chainId: 1,
                connector,
              });
              if (connector.id === "walletConnect") {
                closeModal();
              }
            }}
          >
            <img
              src={getConnectorIcon(connector.name)}
              alt={connector.name}
              height={24}
              width={24}
              style={{ borderRadius: "50%" }}
            />
            <div style={{ marginLeft: "0.5rem" }}>{connector.name}</div>
          </Button>
        );
      })}
    </>
  );
};

export default ConnectorsList;
