import bcrypt from 'bcrypt';

import { BcryptAdapter } from './bcrypt-adapter';

const salt = 12;

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return new Promise((resolve) => resolve('hashed_value'));
  },
}));

const makeSut = () => {
  const sut = new BcryptAdapter(salt);
  return sut;
};

describe('Bcrypt Adapter', () => {
  test('Should call bcrypt with correct values', async () => {
    const sut = makeSut();

    const hashSpy = jest.spyOn(bcrypt, 'hash');

    await sut.encrypt('any_value');

    expect(hashSpy).toHaveBeenCalledWith('any_value', salt);
  });

  test('Should return a hash on success', async () => {
    const sut = makeSut();

    const hashedValue = await sut.encrypt('any_value');

    expect(hashedValue).toBe('hashed_value');
  });
});
