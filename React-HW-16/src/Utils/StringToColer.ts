export const stringToColour = (str: string): string => {
  let hash = 0;
  if (str.length === 0) return hash.toString();
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }
  let color = '#';
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 255;
    value = Math.min(255, value + 100);
    color += ('00' + value.toString(16)).substr(-2);
  }

  return String(color);
};

export const StringTotextColor = (hash: string) => {
  const num = parseInt(hash.replace('#', ''), 16);
  return num < 5000000 ? 'white' : 'Black';
};
