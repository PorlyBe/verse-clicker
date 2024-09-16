import axios from "axios";

import { GameMode } from "../context/reducers/network";

export type TSignatureData = {
  message: `0x${string}`;
  signature: `0x${string}`;
};

const getPrestigeSignature = async (address: string, roomName: GameMode) => {
  try {
    if (!address) return;
    const url = `${
      process.env.REACT_APP_WEBSOCKET_SERVER || "http://localhost:3001/"
    }sign`;

    const { data } = await axios.post<TSignatureData>(url, {
      address,
      roomName,
    });

    return data;
  } catch (error) {
    console.log("Error getting sign", error);
  }
};

export default getPrestigeSignature;
