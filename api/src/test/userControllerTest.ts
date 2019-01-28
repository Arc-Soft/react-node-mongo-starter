import 'mocha';
import 'should';
import { mainApp, register, randomEmail } from './configTest';
import * as randomstring from 'randomstring';
import * as request from 'supertest';
import * as doc from 'test2doc';
import { CLIENT } from '../app/client/clientSchema';

const app = mainApp.app;

doc.group('Users').is((doc) => {
  describe('User controller', () => {
    doc.action('Register user').is((doc) => {
      it('succeds on user registration', (done) => {
        const email = randomEmail();
        const password = randomstring.generate(5);
        request(app)
        .post(doc.post('/user'))
        .send(doc.reqBody({ email, password, type: 'client' }, 'Available types: client, trainer'))
        .expect(200)
        .end((err, res) => {
          const body = doc.resBody(res.body);
          body.desc('Registered user').should.not.be.empty();
          body.should.have.property('_id');
          body.should.have.property('user');
          done();
        });
      });
    });

    doc.action('Login user').is((doc) => {
      it('succeds on user login', (done) => {
        const email = randomEmail();
        const password = randomstring.generate(5);
        register(app, email, password, CLIENT).end(() => {
          request(app)
            .post(doc.post('/login'))
            .send(doc.reqBody({ email, password }, 'Login and password'))
            .expect(200)
            .end((err, res) => {
              const body = doc.resBody(res.body);
              body.desc('Authorization token').should.not.be.empty();
              body.should.have.property('token');
              done();
            });
        });
      });
    });
  });
});
