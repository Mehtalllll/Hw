export const ClassNames = (...str: string[]) => {
  return str.filter(Boolean).join(' ').trim();
};
