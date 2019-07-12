import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../index';

chai.use(chaiHttp);
chai.should();

let cookie;

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
        phoneNumber: '08123456789',
        address: '22 Fosoke Street, S/L, Lagos',
        password: 'mygreatpassword',
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        cookie = res.header['set-cookie'];
        done();
      });
  });

  it('Should check for email pattern', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .type('form')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john !@gmail.com',
        phoneNumber: '08123456789',
        address: '22 Fosoke Street, S/L, Lagos',
        password: 'mygreatpassword',
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should check field length', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .type('form')
      .send({
        firstName: 'Jo',
        lastName: 'Do',
        email: 'john@gmail.com',
        phoneNumber: '08123456789',
        address: '22 Fosoke Street, S/L, Lagos',
        password: 'mygreatpassword',
      })
      .end((err, res) => {
        res.should.have.status(400);
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
  it('Should return 401 for non-existing user', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .type('form')
      .send({
        email: 'no-user@gmail.com',
        password: 'mygreatpassword',
      })
      .end((err, res) => {
        res.should.have.status(401);
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
        cookie = res.header['set-cookie'];
        done();
      });
  });
});

describe('POST /api/v1/property', () => {
  it('Should create property ad', (done) => {
    const req = chai.request(app)
      .post('/api/v1/property/');
    req.set('cookie', cookie)
      .type('form')
      .send({
        price: 3000000,
        state: 'Lagos',
        city: 'Isale Eko',
        address: '954, Mountain hill',
        type: 'Mini Flat',
        imageUrl: 'https://cloudinary.com/wef84r3nnf',
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        done();
      });
  });

  // it('Should handle price in string format', (done) => {
  //   const req = chai.request(app)
  //     .post('/api/v1/property/');
  //   req.set('cookie', cookie)
  //     .type('form')
  //     .send({
  //       price: '3000000',
  //       state: 'Lagos',
  //       city: 'Isale Eko',
  //       address: '954, Mountain hill',
  //       type: 'Mini Flat',
  //       imageUrl: 'https://cloudinary.com/wef84r3nnf',
  //     })
  //     .end((err, res) => {
  //       res.should.have.status(201);
  //       res.body.should.be.a('object');
  //       done();
  //     });
  // });
});
