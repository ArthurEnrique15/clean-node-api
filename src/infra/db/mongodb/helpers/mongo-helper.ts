import { Collection, MongoClient } from 'mongodb';

import { AccountModel } from '../../../../domain/models/account';

export const MongoHelper = {
  client: null as unknown as MongoClient,

  async connect(url: string) {
    this.client = await MongoClient.connect(url);
  },

  async disconnect() {
    await this.client.close();
  },

  getCollection(name: string): Collection {
    return this.client.db().collection(name);
  },

  map(collection: any): AccountModel {
    const { _id: id, ...collectionWithoutId } = collection;

    return {
      id: id.toString(),
      ...collectionWithoutId,
    };
  },
};
