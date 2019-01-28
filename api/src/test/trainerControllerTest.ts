import 'mocha';
import 'should';
import { mainApp, login } from './configTest';
import * as request from 'supertest';
import * as doc from 'test2doc';
import { TRAINER } from '../app/trainer/trainerSchema';
import { registerClient } from './clientControllerTest';

const app = mainApp.app;

doc.group('Trainer').is((doc) => {
  describe('Trainer controller', () => {
    doc.action('Assign client to trainer').is((doc) => {
      it('succeds on client assign to trainer', (done) => {
        login(app, TRAINER, (res) => {
          registerClient(res.token, (clients) => {
            request(app)
              .put(doc.put('/trainers/assign-client'))
              .set(doc.reqHeaders({ Authorization: 'Bearer ' + res.token }))
              .send(doc.reqBody({ clientId: clients[0]._id }, 'Client to assign'))
              .expect(200)
              .end((err, res) => {
                if (err) console.error(err);
                const body = doc.resBody(res.body, 'Trainer with assigned client');
                body.should.have.property('clients').and.not.empty();
                done();
              });
          });
        });
      });
    });

    doc.action('Get trainer profile').is((doc) => {
      it('succeds on trainer profile retrieval', (done) => {
        login(app, TRAINER, (res, registeredProfile) => {
          request(app)
            .get(doc.get('/trainers/profile'))
            .set(doc.reqHeaders({ Authorization: 'Bearer ' + res.token }))
            .expect(200)
            .end((err, res) => {
              if (err) console.error(err);
              const body = doc.resBody(res.body, 'Trainer profile');
              body._id.should.be.exactly(registeredProfile._id);
              done();
            });
        });
      });
    });

    doc.action('Get trainer clients').is((doc) => {
      it('succeds on trainer clients retrieval', (done) => {
        assignClientToTrainer((token) => {
          request(app)
            .get(doc.get('/trainers/clients'))
            .set(doc.reqHeaders({ Authorization: 'Bearer ' + token }))
            .expect(200)
            .end((err, res) => {
              if (err) console.error(err);
              const body = doc.resBody(res.body, 'Trainer clients');
              body[0]._id.should.not.be.empty();
              done();
            });
        });
      });
    });

    doc.action('Get trainer specific client').is((doc) => {
      it('succeds on trainer client retrieval', (done) => {
        assignClientToTrainer((token, clientId) => {
          request(app)
            .get(doc.get('/trainers/clients/' + clientId))
            .set(doc.reqHeaders({ Authorization: 'Bearer ' + token }))
            .expect(200)
            .end((err, res) => {
              if (err) console.error(err);
              const body = doc.resBody(res.body, 'Trainer client');
              body._id.should.not.be.empty();
              done();
            });
        });
      });
    });
  });
});

const assignClientToTrainer = (done) => {
  login(app, TRAINER, (loginResponse) => {
    registerClient(loginResponse.token, (clients) => {
      request(app)
        .put('/trainers/assign-client')
        .set('Authorization', 'Bearer ' + loginResponse.token)
        .send({ clientId: clients[0]._id })
        .expect(200)
        .end(() => {
          done(loginResponse.token, clients[0]._id);
        });
    });
  });
};
