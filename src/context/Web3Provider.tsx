import React, { FC, PropsWithChildren, useMemo } from "react";
import { WagmiConfig, configureChains, createConfig, sepolia } from "wagmi";
import { mainnet, polygon } from "wagmi/chains";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

import { WalletConnectConnector } from "./WalletConnectConnector";
import { useTrackedState } from "./store";

// const projectId = "8000cda0f00ad8e06049c5e030ddaa4c"; // Paul
const projectId = "1184cb8e8109ec7c4a9425c56b494e5e"; // Bcom

const {
  REACT_APP_POLYGON_NODE_HTTP_URL,
  REACT_APP_POLYGON_NODE_WSS_URL,
  REACT_APP_ETHEREUM_NODE_HTTP_URL,
  REACT_APP_ETHEREUM_NODE_WSS_URL,
  REACT_APP_SEPOLIA_NODE_HTTP_URL,
  REACT_APP_SEPOLIA_NODE_WSS_URL,
  REACT_APP_PUBLIC_URL,
} = process.env;

const url = "https://clicker.verse.bitcoin.com/";

const metadata = {
  name: "Verse Clicker",
  description: "Verse Clicker",
  url,
  icons: [`${REACT_APP_PUBLIC_URL || url}verse-moon.png`],
};

const Web3Provider: FC<PropsWithChildren> = ({ children }) => {
  const { isWallet } = useTrackedState();
  const config = useMemo(() => {
    const { chains, publicClient, webSocketPublicClient } = configureChains(
      [polygon, mainnet, sepolia],
      [
        jsonRpcProvider({
          rpc: (chain) => {
            switch (chain.id) {
              case 11155111: // sepolia
                return {
                  http: REACT_APP_SEPOLIA_NODE_HTTP_URL,
                  webSocket: REACT_APP_SEPOLIA_NODE_WSS_URL,
                };
              case 137: // polygon/matic
                return {
                  http: REACT_APP_POLYGON_NODE_HTTP_URL,
                  webSocket: REACT_APP_POLYGON_NODE_WSS_URL,
                };
              case 1: // ethereum
              default:
                return {
                  http: REACT_APP_ETHEREUM_NODE_HTTP_URL,
                  webSocket: REACT_APP_ETHEREUM_NODE_WSS_URL,
                };
            }
          },
        }),
      ],
    );

    const walletConnectConnector = new WalletConnectConnector({
      chains,
      options: {
        projectId,
        showQrModal: isWallet ? false : true,
        metadata,
        qrModalOptions: {
          themeMode: "dark",
          themeVariables: {
            "--wcm-overlay-background-color": "rgba(0, 0, 0, 0.3)",
            "--wcm-font-family": "Barlow",
          },
          explorerRecommendedWalletIds: [
            "107bb20463699c4e614d3a2fb7b961e66f48774cb8f6d6c1aee789853280972c",
          ],
        },
      },
    });

    walletConnectConnector.on("message", (ev) => {
      if (
        ev.type === "display_uri" &&
        typeof ev.data === "string" &&
        isWallet
      ) {
        const wcUrl = `bitcoincom://wc?uri=${encodeURIComponent(ev.data)}`;
        location.href = wcUrl;
      }
    });

    return createConfig({
      autoConnect: true,
      connectors: [
        walletConnectConnector,
        ...(isWallet
          ? []
          : [
              new MetaMaskConnector(),
              new InjectedConnector({
                chains,
                options: {
                  shimDisconnect: true,
                },
              }),
            ]),
      ],
      publicClient,
      webSocketPublicClient,
    });
  }, [isWallet]);

  return <WagmiConfig config={config}>{children}</WagmiConfig>;
};

export default Web3Provider;
