import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../index';

chai.use(chaiHttp);
chai.should();
// require('dotenv').config();

describe('GET /', () => {
  it('Should get to the root directory of the app', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should return 404 for unknown directory', (done) => {
    chai.request(app)
      .get('/a')
      .end((err, res) => {
        res.should.have.status(404);
        // res.body.should.be.a('object');
        done();
      });
  });
});

describe('POST /api/v1/auth/signup', () => {
  it('Should sign up a new user', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .type('form')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@gmail.com',
        phoneNumber: 2348123456789,
        address: '22 Fosoke Street, S/L, Lagos',
        password: 'mygreatpassword',
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should check all required fields', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .type('form')
      .send({})
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        done();
      });
  });
});
describe('POST /api/v1/auth/signin', () => {
  it('Should sign in existing user', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .type('form')
      .send({
        email: 'john@gmail.com',
        password: 'mygreatpassword',
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should return 404 for non-existing user', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .type('form')
      .send({
        email: 'no-user@gmail.com',
        password: 'mygreatpassword',
      })
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should return 401 for wrong password', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .type('form')
      .send({
        email: 'john@gmail.com',
        password: 'wrongpassword',
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should check for required fields', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .type('form')
      .send({})
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        done();
      });
  });
});
