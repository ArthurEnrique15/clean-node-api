import { AddAccountRepository } from '../../../../data/protocols/add-account-repository';
import { AccountModel } from '../../../../domain/models/account';
import { AddAccountModel } from '../../../../domain/useCases/add-account';
import { MongoHelper } from '../helpers/mongo-helper';

export class AccountMongoRepository implements AddAccountRepository {
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts');

    const { insertedId } = await accountCollection.insertOne(accountData);

    const {
      _id: id,
      name,
      email,
      password,
    } = await accountCollection.findOne({
      _id: insertedId,
    });

    const account = {
      id: id.toString(),
      name,
      email,
      password,
    };

    console.log(account);

    return account;
  }
}