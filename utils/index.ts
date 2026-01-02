export const calcMacrosFulfilled = (goal: number, tracked: number) => {
  return (tracked / goal) * 100;
};

export const calcMacrosLeft = (goal: number, tracked: number) => {
  return goal - tracked;
};

export const calcHydrationCup = (servingAmt: number) => {
  return Math.floor(servingAmt / 250);
};
