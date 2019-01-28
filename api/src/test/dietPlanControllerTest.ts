import 'mocha';
import 'should';
import { mainApp, login } from './configTest';
import * as randomstring from 'randomstring';
import * as request from 'supertest';
import * as doc from 'test2doc';
import { TRAINER } from '../app/trainer/trainerSchema';
import { registerClient } from './clientControllerTest';

const app = mainApp.app;

doc.group('Diet plan').is((doc) => {
  describe('Diet plan controller', () => {
    doc.action('Create diet plan').is((doc) => {
      it('succeds on diet plan creation', (done) => {
        login(app, TRAINER, (res) => {
          const description = randomstring.generate(20);
          request(app)
            .post(doc.post('/diet-plan'))
            .set(doc.reqHeaders({ Authorization: 'Bearer ' + res.token }))
            .send(doc.reqBody({ description }, 'Diet plan'))
            .expect(200)
            .end((err, res) => {
              if (err) console.error(err);
              const body = doc.resBody(res.body);
              body.should.have.property('_id').and.not.empty();
              body.should.have.property('trainer').and.not.empty();
              body.should.have.property('description').and.be.exactly(description);
              done();
            });
        });
      });
    });

    doc.action('Get diet plans for trainer').is((doc) => {
      it('succeds on diet plan retrieval', (done) => {
        const description = randomstring.generate(10);
        createDietPlan(description, (createdPlan) => {
          request(app)
            .get(doc.get('/diet-plan'))
            .set(doc.reqHeaders({ Authorization: 'Bearer ' + createdPlan.token }))
            .expect(200)
            .end((err, res) => {
              if (err) console.error(err);
              const body = doc.resBody(res.body);
              body.desc('List of user diet plans').should.not.be.empty();
              body[0].description.should.be.exactly(description);
              done();
            });
        });
      });
    });

    doc.action('Assign diet plan to client').is((doc) => {
      it('succeds on diet plan assign to client', (done) => {
        const description = randomstring.generate(10);
        createDietPlan(description, (createdPlan) => {
          registerClient(createdPlan.token, (clients) => {
            request(app)
              .put(doc.put('/diet-plan/assign-client'))
              .set(doc.reqHeaders({ Authorization: 'Bearer ' + createdPlan.token }))
              .send(doc.reqBody({ planId: createdPlan.id, clientId: clients[0]._id },
                                'Client to assign'))
              .expect(200)
              .end((err, res) => {
                if (err) console.error(err);
                const body = doc.resBody(res.body);
                body.desc('Assigned diet plan').should.not.be.empty();
                body.should.have.property('client').and.be.exactly(clients[0]._id);
                done();
              });
          });
        });
      });
    });
  });
});

const createDietPlan = (description, done) => {
  login(app, TRAINER, (res) => {
    request(app)
      .post('/diet-plan')
      .set('Authorization', 'Bearer ' + res.token)
      .send({ description })
      .expect(200)
      .end((err, response) => {
        done({ token: res.token, id: response.body._id });
      });
  });
};
