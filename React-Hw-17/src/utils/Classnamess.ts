export const ClassNames = (...clases: string[]): string => {
  return clases.filter(Boolean).join(' ');
};
