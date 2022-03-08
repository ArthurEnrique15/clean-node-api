import bcrypt from 'bcrypt';

import { BcryptAdapter } from './bcrypt-adapter';

const SALT = 12;

const makeSut = () => {
  const sut = new BcryptAdapter(SALT);

  return sut;
};

describe('Bcrypt Adapter', () => {
  test('Should call bcrypt with correct values', async () => {
    const sut = makeSut();

    const hashSpy = jest.spyOn(bcrypt, 'hash');

    await sut.encrypt('any_value');

    expect(hashSpy).toHaveBeenCalledWith('any_value', SALT);
  });
});
