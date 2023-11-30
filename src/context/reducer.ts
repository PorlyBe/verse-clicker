import { Reducer } from "react";
import { State } from "./store";
import { SetPlayerAction, setPlayer } from "./reducers/player";
import {
  SetBuildingAction,
  UpdateBuildingsAction,
  setBuilding,
  updateBuildings,
} from "./reducers/building";
import {
  SetLeaderboardAddressesAction,
  SetLeaderboardStatsAction,
  SetLeaderboardUpdated,
  setLeaderboardAddresses,
  setLeaderboardStats,
  setLeaderboardUpdated,
} from "./reducers/leaderboard";
import { SetNetworkAction, setNetwork } from "./reducers/network";
import { SetErrorAction, setError } from "./reducers/error";
import { SetReturnDataAction, setReturnData } from "./reducers/returnData";
import {
  SetPurchaseAmountAction,
  setPurchaseAmount,
} from "./reducers/purchaseAmount";
import { SetSettingsAction, setSettings } from "./reducers/settings";
import { resetGame } from "./reducers/reset";

export type Action =
  | SetNetworkAction
  | SetPlayerAction
  | SetBuildingAction
  | SetLeaderboardStatsAction
  | SetLeaderboardAddressesAction
  | UpdateBuildingsAction
  | SetReturnDataAction
  | SetErrorAction
  | SetErrorAction
  | SetSettingsAction
  | SetPurchaseAmountAction
  | SetLeaderboardUpdated
  | { type: "RESET_GAME" };

const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case "RESET_GAME":
      return resetGame(state);
    case "SET_NETWORK":
      return setNetwork(state, action.payload);
    case "SET_PLAYER_DATA":
      return setPlayer(state, action.payload);
    case "SET_BUILDING":
      return setBuilding(state, action.payload);
    case "SET_LEADERBOARD_UPDATED":
      return setLeaderboardUpdated(state, action.payload);
    case "SET_LEADERBOARD_STATS":
      return setLeaderboardStats(state, action.payload);
    case "SET_LEADERBOARD_ADDRESSES":
      return setLeaderboardAddresses(state, action.payload);
    case "UPDATE_BUILDINGS":
      return updateBuildings(state, action.payload);
    case "SET_ERROR":
      return setError(state, action.payload);
    case "SET_RETURN_DATA":
      return setReturnData(state, action.payload);
    case "SET_PURCHASE_AMOUNT":
      return setPurchaseAmount(state, action.payload);
    case "SET_SETTINGS":
      return setSettings(state, action.payload);
    default:
      return state;
  }
};

export default reducer;
