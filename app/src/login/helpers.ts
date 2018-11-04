import { getFromLocalStorage, saveToLocalStorage } from 'app/helpers/local-storage';

export const getUserIdFromLocalStorage = () => getFromLocalStorage('userId');
export const saveUserIdToLocalStorage = (userId: string) => saveToLocalStorage('userId', userId);
