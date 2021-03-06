import { DbAddAccount } from '../../data/useCases/add-account/db-add-account';
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter';
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account';
import { SignUpController } from '../../presentation/controllers/signup/signup';
import { Controller } from '../../presentation/protocols';
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter';
import { LogControllerDecorator } from '../decorators/log';

const salt = 12;

export const makeSignUpController = (): Controller => {
  const bcryptAdapter = new BcryptAdapter(salt);

  const accountMongoRepository = new AccountMongoRepository();

  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository);

  const emailValidatorAdapter = new EmailValidatorAdapter();

  const signUpController = new SignUpController(
    emailValidatorAdapter,
    dbAddAccount
  );

  return new LogControllerDecorator(signUpController);
};
