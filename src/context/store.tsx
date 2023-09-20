import { Reducer } from "react";
import { createContainer } from "react-tracked";
import { useReducerAsync } from "use-reducer-async";
import { AsyncAction, asyncActionHandlers } from "./asyncActionHandlers";
import { reducer } from "./reducer";
import Player from "../classes/Player";
import Building from "../classes/Building";
import buildings from "./buildings";
import { GameSavedAction, LoadSaveAction } from "./reducers/saving";

export type State = {
  save?: string;

  settings: {
    frameRate: number;
    recalculateCPS: boolean;
    key: string;
  };

  player: Player;
  buildings: Building[];

  query: string;
  pending: boolean;
  error: Error | null;
};

export type Action =
  | GameSavedAction
  | LoadSaveAction
  | { type: "CLICK_COOKIE" }
  | { type: "SPEND_COOKIE"; payload: number }
  | { type: "RESET_GAME" }

  // ASYNC ACTION STATES
  | { type: "STARTED" }
  | { type: "FAILED"; error: Error }
  | { type: "QUERY_CHANGED"; query: string };

export const initialState: State = {
  settings: {
    frameRate: 30,
    recalculateCPS: true,
    key: "cookieclicker",
  },

  // GAME
  player: new Player(),
  buildings,

  // ASYNC
  pending: false,
  error: null,
  query: "",
};

const useValue = () => {
  return useReducerAsync<Reducer<State, Action>, AsyncAction>(
    reducer,
    initialState,
    asyncActionHandlers,
  );
};

export const {
  Provider,
  useTrackedState,
  useUpdate: useDispatch,
} = createContainer(useValue);
