import {saveToLocalStorage, getFromLocalStorage, removeFromLocalStorage} from 'app/helpers/local-storage';

describe('Local storage helpers', () => {

  it('should be able to read and write with local storage', () => {
    const key = 'testKey';
    const value = 'testValue';
  
    saveToLocalStorage(key, value);
    const valueFromLocalStorage = getFromLocalStorage(key);

    expect(valueFromLocalStorage).toBe(value);
  });

  it('should be able to remove value from local storage', () => {
    const key = 'testKey';
    const value = 'testValue';
  
    saveToLocalStorage(key, value);
    
    let valueFromLocalStorage = getFromLocalStorage(key);
    expect(valueFromLocalStorage).toBe(value);

    removeFromLocalStorage(key);
    valueFromLocalStorage = getFromLocalStorage(key);

    expect(valueFromLocalStorage).toBe(null);
  });

});
