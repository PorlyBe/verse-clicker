import Building from "../classes/Building";

export const getBuildingsCost = (amount: number, cost: number) => {
  let bulkCost = cost;
  let tempPrice = cost;
  for (let i = 0; i < amount - 1; i++) {
    bulkCost += Math.round((tempPrice *= 1.15));
  }
  return bulkCost;
};

export const getBuildingCount = (buildings: Building[]) => {
  return buildings.reduce((prev, curr) => prev + curr.amount, 0);
};
