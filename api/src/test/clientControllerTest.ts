import 'mocha';
import 'should';
import { mainApp, login, randomEmail, register } from './configTest';
import * as request from 'supertest';
import * as doc from 'test2doc';
import { CLIENT } from '../app/client/clientSchema';
import * as randomstring from 'randomstring';

const app = mainApp.app;

doc.group('Client').is((doc) => {
  describe('Client controller', () => {
    doc.action('Get all clients').is((doc) => {
      it('succeds on all clients retrieval', (done) => {
        login(app, CLIENT, (res) => {
          request(app)
            .get(doc.get('/clients'))
            .set(doc.reqHeaders({ Authorization: 'Bearer ' + res.token }))
            .expect(200)
            .end((err, res) => {
              if (err) console.error(err);
              const body = doc.resBody(res.body);
              body[0].should.have.property('_id').and.not.empty();
              done();
            });
        });
      });
    });

    doc.action('Get client profile').is((doc) => {
      it('succeds on client profile retrieval', (done) => {
        login(app, CLIENT, (res, registeredProfile) => {
          request(app)
            .get(doc.get('/clients/profile'))
            .set(doc.reqHeaders({ Authorization: 'Bearer ' + res.token }))
            .expect(200)
            .end((err, res) => {
              if (err) console.error(err);
              const body = doc.resBody(res.body, 'Client profile');
              body._id.should.be.exactly(registeredProfile._id);
              done();
            });
        });
      });
    });
  });
});

export const registerClient = (token, done) => {
  const email = randomEmail();
  const password = randomstring.generate(5);
  register(app, email, password, CLIENT).end(() => {
    request(app)
      .get('/clients')
      .set('Authorization', 'Bearer ' + token)
      .expect(200)
      .end((err, res) => {
        done(res.body);
      });
  });
};
