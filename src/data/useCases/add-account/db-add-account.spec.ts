/* eslint-disable @typescript-eslint/no-unused-vars */
import { DbAddAccount } from './db-add-account';
import { Encrypter } from './db-add-account-protocols';

interface SutTypes {
  sut: DbAddAccount;
  encrypterStub: Encrypter;
}

const makeEncrypter = () => {
  class EncrypterStub implements Encrypter {
    async encrypt(value: string): Promise<string> {
      return new Promise((resolve) => resolve('hashed_password'));
    }
  }

  return new EncrypterStub();
};

const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter();
  const sut = new DbAddAccount(encrypterStub);

  return {
    sut,
    encrypterStub,
  };
};

describe('DbAddAccount UseCase', () => {
  test('Should call Encrypter with correct password', async () => {
    const { sut, encrypterStub } = makeSut();

    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt');

    const accountData = {
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'valid_password',
    };

    await sut.add(accountData);

    expect(encryptSpy).toHaveBeenCalledWith(accountData.password);
  });

  test('Should throw if Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut();

    // mockando uma dependência do sut, fazendo ela retornar uma exception
    jest
      .spyOn(encrypterStub, 'encrypt')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );

    const accountData = {
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'valid_password',
    };

    // espera que ao chamar o sut e a dependência retornar uma exception, o sut dê um throw na exception (que é tratada no SignUpController)
    const promise = sut.add(accountData);
    await expect(promise).rejects.toThrow();
  });
});