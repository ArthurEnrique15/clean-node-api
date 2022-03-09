import { MongoClient } from 'mongodb';

export const MongoHelper = {
  client: new MongoClient(process.env.MONGO_URL),
  async connect() {
    await this.client.connect();
  },
  async disconnect() {
    await this.client.close();
  },
};
