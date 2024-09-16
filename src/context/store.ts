import { Dispatch, Reducer, useCallback, useEffect, useReducer } from "react";
import { createContainer } from "react-tracked";

import buildings from "../buildings";
import Building from "../classes/Building";
import { getGameMode } from "../helpers/gameMode";
import { CampaignInfo, CampaignPhase } from "../hooks/useCampaignInfo";
import reducer, { Action } from "./reducer";
import { BonusData } from "./reducers/bonusData";
import { LeaderboardStats } from "./reducers/leaderboard";
import { GameMode } from "./reducers/network";
import { Player } from "./reducers/player";
import { ReturnData } from "./reducers/returnData";
import { SignData } from "./reducers/sign";

const storageKey = "verse-clicker";

export type State = {
  isConnected: boolean;
  player: Player;
  verseHolder: boolean;

  buildings: Building[];
  currentBuilding?: string;
  returnData?: ReturnData;
  gameMode: GameMode;
  error?: string;
  purchaseAmount: number | "max";
  settings: {
    sound: boolean;
    campaignBanner: boolean;
    sign: Record<string, SignData>;
  };
  isWallet: boolean;

  leaderboardAddresses: string[];
  leaderboardStats: LeaderboardStats;
  leaderboardUpdated?: number;
  bonusData: BonusData[];

  campaign: {
    campaignInfo?: CampaignInfo;
    campaignPhase?: CampaignPhase;
  };
};

const search = new URLSearchParams(location.search);
const isWallet = search.get("origin") === "wallet";
const campaign = search.get("campaign");

const gameMode = getGameMode(campaign);

export const initialState: State = {
  isConnected: false,
  verseHolder: false,
  currentBuilding: buildings.Ethereum[0].name,
  buildings: buildings.Ethereum,
  player: {
    cookies: 0,
    cpc: 0,
    cps: 0,
    stats: {
      Earned: 0,
      Clicked: 0,
      Spent: 0,
    },
    verseHolder: false,
    isFarming: false,
    isStaking: false,
    isGuildMember: false,
    clickBase: 1,
    productionBase: 1,
    prestige: {
      level: 0,
      unlocked: 0,
      cost: 1000000000000,
      amounts: {
        availableAmount: 0,
        availableCost: 1000000000000,
        nextCost: 10000000000000,
      },
    },
  },
  gameMode,
  purchaseAmount: 1,
  settings: { sound: true, campaignBanner: true, sign: {} },
  isWallet,
  leaderboardAddresses: [],
  leaderboardStats: [],
  bonusData: [],
  campaign: {},
};

const init = (): State => {
  try {
    const stored = window.localStorage.getItem(storageKey);
    if (!stored) throw new Error("localstorage not found");

    const persistedState = JSON.parse(stored);

    const settings = {
      sound:
        typeof persistedState?.settings?.sound === "boolean"
          ? persistedState.settings.sound
          : initialState.settings.sound,
      campaignBanner:
        typeof persistedState?.settings?.campaignBanner === "boolean"
          ? persistedState.settings.campaignBanner
          : initialState.settings.campaignBanner,
      sign:
        typeof persistedState?.settings?.sign === "object"
          ? persistedState.settings.sign
          : initialState.settings.sign,
    };

    return {
      ...initialState,
      settings,
    };
  } catch (e) {
    // ignore
  }

  return initialState;
};

const useValue = (): readonly [State, Dispatch<Action>] => {
  const [state, dispatch] = useReducer<Reducer<State, Action>, State>(
    reducer,
    initialState,
    init,
  );

  useEffect(() => {
    const persistedState = { settings: state.settings };
    window.localStorage.setItem(storageKey, JSON.stringify(persistedState));
  }, [state.settings]);

  /* useEffect(() => {
    console.log("state", state);
  }, [state]); */

  const dispatchWithLogging = useCallback((action: Action) => {
    // console.log("action", action);
    dispatch(action);
  }, []);

  return [state, dispatchWithLogging];
};

export const {
  Provider: ContextProvider,
  useTrackedState,
  useUpdate: useDispatch,
} = createContainer(useValue);
