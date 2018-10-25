
const MOLEHILL_DOMAIN = 'molehill';

export const saveToLocalStorage = (key: string, value: string): void => {
  localStorage.setItem(`${MOLEHILL_DOMAIN}.${key}`, value);
};

export const getFromLocalStorage = (key: string): string | null => {
  return localStorage.getItem(`${MOLEHILL_DOMAIN}.${key}`);
};
