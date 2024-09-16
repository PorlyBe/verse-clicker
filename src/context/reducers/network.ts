import buildings from "../../buildings";
import { State } from "../store";

export type GameMode = "Ethereum" | "Polygon" | "Sepolia";
export type LeaderboardGameMode = GameMode | "Christmas" | "LunarNewYear";

export type SetGameModeAction = { type: "SET_GAME_MODE"; payload: GameMode };

export const setNetwork = (
  state: State,
  payload: SetGameModeAction["payload"],
): State => {
  console.log(payload);
  return {
    ...state,
    gameMode: payload,
    buildings: buildings[payload],
    currentBuilding: buildings[payload][0].name,
  };
};
