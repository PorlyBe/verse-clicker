import React, { FC, Suspense, lazy, useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useAccount, useNetwork, useSignMessage } from "wagmi";

import { CURRENT_CAMPAIGN } from "./constants";
import { useSocketCtx } from "./context/SocketContext";
import { GameMode } from "./context/reducers/network";
import { useDispatch, useTrackedState } from "./context/store";
import { getGameMode } from "./helpers/gameMode";
import useCampaignInfo from "./hooks/useCampaignInfo";
import { useLocalStorage } from "./hooks/useLocalStorage";
import useSocketEvents from "./hooks/useSocketEvents";
import Leaderboard from "./views/Leaderboard";
import ProtectedRoute from "./views/ProtectedRoute";

const Main = lazy(() => import("./views/Main"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Main />
      </ProtectedRoute>
    ),
  },
  {
    path: "/leaderboard",
    element: <Leaderboard />,
  },
]);

const App: FC = () => {
  useCampaignInfo();

  const dispatch = useDispatch();

  const { socket, isConnected: isSocketConnected } = useSocketCtx();
  const { loading, setLoading } = useSocketEvents();
  const { getStorageItem, setStorageItem } = useLocalStorage();

  const { chain } = useNetwork();
  const { gameMode, settings, campaign } = useTrackedState();

  useEffect(() => {
    if (!settings.sign?.uuid) {
      const uuid = getStorageItem("uuid") || uuidv4();
      dispatch({ type: "SET_SIGN_UUID", payload: uuid });
      setStorageItem("uuid", uuid || "");
    }

    if (!settings.sign?.signature) {
      console.log("MUST SIGN");
    }
  }, [settings.sign]);

  const { status, address } = useAccount({
    onConnect: ({ address: addr }) => {
      if (!addr) return;
      console.log("Web3 Connected");

      setLoading(false);
    },
    onDisconnect: () => {
      setLoading(true);
      dispatch({ type: "RESET_GAME" });
      console.log("Web3 Disconnected");
    },
  });

  useEffect(() => {
    // setting the campaign query to match game mode
    const search = new URLSearchParams(location.search);
    const campaignQuery = search.get("campaign");

    if (status !== "connected" || !chain || !socket) return;
    setLoading(true);

    const newGameMode = getGameMode(campaignQuery);
    if (
      !campaignQuery ||
      campaignQuery !== gameMode ||
      newGameMode !== gameMode
    ) {
      search.set("campaign", gameMode);
      const url = `${window.location.origin}${window.location.pathname}?${search}`;
      window.history.pushState("", "", url);
    }

    if (status !== "connected" || !chain) return;

    setLoading(true);
    dispatch({ type: "RESET_GAME" });

    if (gameMode !== CURRENT_CAMPAIGN && gameMode !== chain.name) {
      console.log("Setting game mode", newGameMode, gameMode);
      dispatch({ type: "SET_GAME_MODE", payload: chain.name as GameMode });
      socket.disconnect();
      return;
    }

    if (
      status === "connected" &&
      gameMode === CURRENT_CAMPAIGN &&
      campaign.campaignPhase !== "DURING"
    ) {
      console.log("Not in campaign period");
      dispatch({ type: "SET_GAME_MODE", payload: chain.name as GameMode });
      socket.disconnect();
      return;
    }

    if (
      !(
        chain.name === "Ethereum" ||
        chain.name === "Polygon" ||
        chain.name === "Goerli" ||
        chain.name === "Sepolia"
      )
    ) {
      console.log("Wrong chain", chain.name);
      socket.disconnect();
      return;
    }

    if (!settings.sign?.signature) {
      socket.disconnect();
      return;
    }

    socket.disconnect();
    socket.connect();
  }, [status, chain, address, gameMode, settings.sign]);

  return (
    <Suspense>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default App;
