import { Collection, MongoClient } from 'mongodb';

export const MongoHelper = {
  client: null as unknown as MongoClient,
  url: null as string,

  async connect(url: string) {
    this.client = await MongoClient.connect(url);
  },

  async disconnect() {
    await this.client.close();
    this.client = null;
  },

  async getCollection(name: string): Promise<Collection> {
    if (this.client === null) {
      await this.client.connect(this.url);
    }

    const collection = await this.client.db().collection(name);

    return collection;
  },

  map(collection: any): any {
    const { _id: id, ...collectionWithoutId } = collection;

    return {
      id: id.toString(),
      ...collectionWithoutId,
    };
  },
};
