import React from 'react';

export const usedebounce = (Value: string, delay: number = 500) => {
  const [debounceValue, setdebounceValue] = React.useState<string>();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setdebounceValue(Value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [Value, delay]);

  return debounceValue;
};
