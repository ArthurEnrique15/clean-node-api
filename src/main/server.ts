import { MongoHelper } from '../infra/db/mongodb/helpers/mongo-helper';

import app from './config/app';
import env from './config/env';

try {
  MongoHelper.connect(env.mongoUrl);
} catch (error) {
  console.error(error);
}

app.listen(env.port, () =>
  console.log(`Server running at http://localhost:${env.port}`)
);
