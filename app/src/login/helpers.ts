import { getFromLocalStorage, saveToLocalStorage, removeFromLocalStorage } from 'app/helpers/local-storage';
import { User } from './reducer';

export const getUserFromLocalStorage = () => {
  const user = getFromLocalStorage('user');
  return user ? JSON.parse(user) : null;
};
export const saveUserToLocalStorage = (user: User) => saveToLocalStorage('user', JSON.stringify(user));
export const removeUserFromLocalStorage = () => removeFromLocalStorage('user');
