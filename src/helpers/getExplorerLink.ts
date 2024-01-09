export const getTxExplorerLink = (chainId: number, hash?: string) => {
  switch (chainId) {
    case 1:
      return `https://etherscan.io/tx/${hash}`;
    case 5:
      return `https://goerli.etherscan.io/tx/${hash}`;
    case 137:
      return `https://polygonscan.com/tx/${hash}`;
    case 11155111:
      return `https://sepolia.etherscan.com/tx/${hash}`;
    default:
      return "";
  }
};
