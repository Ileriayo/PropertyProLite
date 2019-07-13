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
        res.body.should.be.a('object');
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
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@gmail.com',
        phone_number: '08123456789',
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
        first_name: 'John',
        last_name: 'Doe',
        email: 'john !@gmail.com',
        phone_number: '08123456789',
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
        first_name: 'Jo',
        last_name: 'Do',
        email: 'john@gmail.com',
        phone_number: '08123456789',
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
        image_url: 'https://cloudinary.com/wef84r3nnf',
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        done();
      });
  });
});

describe('GET /api/v1/property', () => {
  it('Should get all property ad', (done) => {
    const req = chai.request(app)
      .get('/api/v1/property/');
    req.set('cookie', cookie)
      .type('form')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('data');
        done();
      });
  });
});

describe('GET /api/v1/property/<:property-id>/', () => {
  it('Should get one property by id', (done) => {
    const req = chai.request(app)
      .get('/api/v1/property/1');
    req.set('cookie', cookie)
      .type('form')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('data');
        done();
      });
  });

  it('Should return an empty array in the data for invalid id', (done) => {
    const req = chai.request(app)
      .get('/api/v1/property/<!>');
    req.set('cookie', cookie)
      .type('form')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('data');
        done();
      });
  });
});

describe('PATCH /api/v1/property/<:property-id>/', () => {
  it('Should update a property price', (done) => {
    const req = chai.request(app)
      .patch('/api/v1/property/1');
    req.set('cookie', cookie)
      .type('form')
      .send({
        price: 4000000,
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('data');
        done();
      });
  });
});

describe('PATCH /api/v1/property/<:property-id>/sold', () => {
  it('Should mark a property as sold', (done) => {
    const req = chai.request(app)
      .patch('/api/v1/property/1/sold');
    req.set('cookie', cookie)
      .type('form')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('data');
        done();
      });
  });
});

describe('DELETE /api/v1/property/<:property-id>/', () => {
  it('Should delete an agent\'s property', (done) => {
    const req = chai.request(app)
      .delete('/api/v1/property/1');
    req.set('cookie', cookie)
      .type('form')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('data');
        done();
      });
  });
});
