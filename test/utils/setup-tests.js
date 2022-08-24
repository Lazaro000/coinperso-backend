import config from '#Config/config.js';
import { MongoMemoryReplSet } from 'mongodb-memory-server';
import { bootstrap } from '../../src/bootstrap.js';

export const setupTests = (test) => {
  let mongo;

  test.before(async () => {
    mongo = await MongoMemoryReplSet.create({
      replSet: {
        count: 1,
        dbName: 'coinperso',
      },
    });

    config.DB.URI = mongo.getUri();

    await bootstrap({ PORT: config.PORT });
  });

  test.after.always(async () => {
    if (mongo) await mongo.stop(true);
  });
};
