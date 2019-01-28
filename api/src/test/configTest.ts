import 'mocha';
import { App } from '../app/config/app';
import * as request from 'supertest';
import * as randomstring from 'randomstring';
import * as doc from 'test2doc';
import * as mongoose from 'mongoose';

export const mainApp = new App();

before((done) => {
  mainApp.mongoSetup('test').then(() => {
    mainApp.start();
    done();
  });
});

after(() => {
  doc.emit('public/api-documentation.apib');
});

afterEach(() => {
  mongoose.connection.db.dropDatabase();
});

export const register = (app, email, password, type) => {
  return request(app)
    .post('/user')
    .send({ email, password, type })
    .expect(200);
};

export const login = (app, type, done) => {
  const email = randomEmail();
  const password = randomstring.generate(5);
  return register(app, email, password, type).end((err, registerResponse) => {
    request(app)
      .post('/login')
      .send({ email, password })
      .expect(200)
      .end((err, res) => {
        done(res.body, registerResponse.body);
      });
  });
};

export const randomEmail = () => {
  return randomstring.generate(5) + '@' + randomstring.generate(4) + '.' + randomstring.generate(3);
};
