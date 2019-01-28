import { Mockgoose } from 'mockgoose';
import * as mongoose from 'mongoose';

export class MongoConfig {

  public setup(dbType?) {
    return new Promise((resolve, reject) => {
      mongoose.Promise = global.Promise;
      if (dbType && dbType === 'test') {
        const mockgoose = new Mockgoose(mongoose);
        mockgoose.prepareStorage().then(() => {
          console.info('Prepared local fake mongo');
          mongoose.connect('some/fake/url', { useNewUrlParser: true }).then(
            () => {
              console.info('Registered local mongo');
              return resolve(mongoose);
            },
          );
        });
      } else {
        mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }).then(
          (instance) => {
            console.info('Registered remote mongo');
            return resolve(instance);
          },
          (err) => {
            console.error('Error during connection to mongo', err);
            return reject(err);
          },
        );
      }
    });
  }
}
