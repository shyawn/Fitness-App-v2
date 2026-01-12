export const calcMacrosFulfilled = (goal: number, tracked: number) => {
  return (tracked / goal) * 100;
};

export const calcMacrosLeft = (goal: number, tracked: number) => {
  return goal - tracked;
};

export const calcHydrationCup = (servingAmt: number) => {
  return Math.floor(servingAmt / 250);
};

export const hydrationServingRange = () => {
  const values = [];

  for (let i = 250; i <= 2000; i += 50) {
    values.push(i);
  }

  for (let i = 2500; i <= 4000; i += 500) {
    values.push(i);
  }

  return values.map((val) => ({
    value: val,
  }));
};

export const heightRange = () => {
  const values = [];

  for (let i = 60; i <= 210; i += 1) {
    values.push(i);
  }
  return values.map((val) => ({
    value: val,
    label: `${val} cm`,
  }));
};

export const weightRange = () => {
  const values = [];

  for (let i = 60; i <= 210; i += 1) {
    values.push(i);
  }
  return values.map((val) => ({
    value: val,
    label: `${val} kg`,
  }));
};

export const getParamValue = (param: string | string[] | undefined): string => {
  if (!param) return "";
  return Array.isArray(param) ? param[0] : param;
};

export const isEmptyWorkoutInput = (value: string) => {
  return value === "" || Number(value) === 0;
};

export const formatJoinDate = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
};
