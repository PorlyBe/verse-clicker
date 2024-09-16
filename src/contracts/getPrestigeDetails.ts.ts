import { PRESTIGE_SEPOLIA_ADDRESS } from "./constants";
import { prestigeABI } from "./prestige";

const getPrestigeDetails = (chainId?: number) => {
  switch (chainId) {
    /*     case 1:
      return {
        address: VERSE_BURN_ENGINE_ETHEREUM_ADDRESS,
      };
    case 5:
      return {
        address: VERSE_BURN_ENGINE_GOERLI_ADDRESS,
      };
    case 137:
      return {
        address: VERSE_BURN_ENGINE_POLYGON_ADDRESS,
      }; */
    case 11155111:
      return {
        address: PRESTIGE_SEPOLIA_ADDRESS,
        abi: prestigeABI as unknown as typeof prestigeABI,
      };
    default:
      return undefined;
  }
};

export default getPrestigeDetails;
