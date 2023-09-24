import React, { FC } from "react";
import Main from "./views/Main";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { goerli, mainnet, polygon } from "wagmi/chains";
import { Provider } from "./context/store";
// import { infuraProvider } from "wagmi/providers/infura";

const chains = [mainnet, polygon, goerli];
const projectId = "8000cda0f00ad8e06049c5e030ddaa4c";

const { publicClient, webSocketPublicClient } = configureChains(chains, [
  // infuraProvider({ apiKey: "1f47d876b0094053881ae761371be771" }),
  w3mProvider({ projectId }),
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
  webSocketPublicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

const App: FC = () => {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <Provider>
          <Main />
        </Provider>
      </WagmiConfig>

      <Web3Modal
        projectId={projectId}
        ethereumClient={ethereumClient}
        defaultChain={mainnet}
        themeMode="dark"
        themeVariables={{
          "--w3m-button-border-radius": "2rem",
        }}
      />
    </>
  );
};

export default App;
