import {getUserFromLocalStorage, saveUserToLocalStorage, removeUserFromLocalStorage} from 'app/login/helpers';

describe('Login helpers', () => {

  it('should save, load and remove user from localStorage', () => {
    const user = {id: 1};
    saveUserToLocalStorage(user);
    let loadedUser = getUserFromLocalStorage();

    expect(loadedUser).toEqual(user);

    removeUserFromLocalStorage();
    loadedUser = getUserFromLocalStorage();
    
    expect(loadedUser).toBe(null);
  });

});