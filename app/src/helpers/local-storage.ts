const MOLEHILL_DOMAIN = 'molehill';

export const saveToLocalStorage = (key: string, value: string) => {
  localStorage.setItem(`${MOLEHILL_DOMAIN}.${key}`, value);
};

export const getFromLocalStorage = (key: string): string | null => {
  return localStorage.getItem(`${MOLEHILL_DOMAIN}.${key}`);
};

export const removeFromLocalStorage = (key: string) => {
  return localStorage.removeItem(`${MOLEHILL_DOMAIN}.${key}`);
};
