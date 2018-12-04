import {email, maxLength, minLength} from 'app/helpers/form-validation';

describe('Form validation helpers', () => {

  // EMAIL

  it('should recognize invalid email address', () => {
    const invalidEmail = 'invalid email';
    const isValidEmail = email(invalidEmail);

    expect(isValidEmail).toBe('Invalid email address');
  });

  it('should recognize valid email address', () => {
    const validEmail = 'valid@email.com';
    const isValidEmail = email(validEmail);

    expect(isValidEmail).toBe(undefined);
  });

  // MAX LENGTH

  it('should recognize value with length above allowed max', () => {
    const maxLengthCount = 5;
    const valueAboveMax = '123456'
    const expectedValue = `Must be ${maxLengthCount} characters or less`
    const result = maxLength(maxLengthCount)(valueAboveMax);

    expect(result).toBe(expectedValue);
  });

  it('should recognize value with allowed max length', () => {
    const maxLengthCount = 5;
    const valueAboveMax = '12345'
    const result = maxLength(maxLengthCount)(valueAboveMax);

    expect(result).toBe(undefined);
  });

  // MIN LENGTH

  it('should recognize value with length below allowed min', () => {
    const minLengthCount = 5;
    const valueBelowMin = '1234'
    const expectedValue = `Must be ${minLengthCount} characters or more`
    const result = minLength(minLengthCount)(valueBelowMin);

    expect(result).toBe(expectedValue);
  });

  it('should recognize value with allowed min length', () => {
    const minLengthCount = 5;
    const valueBelowMin = '12345'
    const result = minLength(minLengthCount)(valueBelowMin);

    expect(result).toBe(undefined);
  });

});
