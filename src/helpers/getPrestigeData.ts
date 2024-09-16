import axios from "axios";

export type TSignatureData = {
  message: `0x${string}`;
  signature: `0x${string}`;
};

const getPrestigeData = async (uri: string, tokenId: number) => {
  try {
    const url = uri.replace("{id}", tokenId.toString());

    const { data } = await axios.get(url);

    return data;
  } catch (error) {
    console.log("Error getting nft data", error);
  }
};

export default getPrestigeData;
