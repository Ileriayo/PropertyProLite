import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../index';

chai.use(chaiHttp);
chai.should();

let authToken;
let propertyId;
const testUser = {
  email: `yr${(Math.random() * 20)}n@gmail.com`,
  password: 'awesomepassword124',
};

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
        email: testUser.email,
        phone_number: '08123456789',
        address: '22 Fosoke Street, S/L, Lagos',
        password: testUser.password,
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        authToken = res.body.data.token;
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
        email: `fake${Math.random(4)}@fake.com`,
        password: 'mygreatpassword',
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
        email: testUser.email,
        password: testUser.password,
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        authToken = res.body.data.token;
        done();
      });
  });
});

describe('POST /api/v1/property', () => {
  it('Should create property ad', (done) => {
    const req = chai.request(app)
      .post('/api/v1/property/');
    req.set('Authorization', `Bearer ${authToken}`)
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
        propertyId = res.body.data.id;
        done();
      });
  });

  it('Should upload an image to cloudinary', (done) => {
    const req = chai.request(app)
      .post('/api/v1/property/');
    req.set('Authorization', authToken)
      .field({
        price: 3000000,
        state: 'Lagos',
        city: 'Isale Eko',
        address: '954, Mountain hill',
        type: 'Mini Flat',
        image_url: 'https://cloudinary.com/wef84r3nnf',
      })
      .attach('image_url', './UI/img/property1.jpg')
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        propertyId = res.body.data.id;
        done();
      });
  });

  it('Should reject an invalid property image file type', (done) => {
    const req = chai.request(app)
      .post('/api/v1/property/');
    req.set('Authorization', authToken)
      .field({
        price: 3000000,
        state: 'Lagos',
        city: 'Isale Eko',
        address: '954, Mountain hill',
        type: 'Mini Flat',
      })
      .attach('image_url', './UI/css/style.css')
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        done();
      });
  });
});

describe('GET /api/v1/property', () => {
  it('Should get all property ad', (done) => {
    const req = chai.request(app)
      .get('/api/v1/property');
    req.set('Authorization', authToken)
      .type('form')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('data');
        done();
      });
  });
});

describe('GET /api/v1/property?type=<:property-type>', () => {
  it('Should get properties by type', (done) => {
    const req = chai.request(app)
      .get('/api/v1/property?type=Bungalow');
    req.set('Authorization', authToken)
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
      .get(`/api/v1/property/${propertyId}`);
    req.set('Authorization', authToken)
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
      .get('/api/v1/property/0');
    req.set('Authorization', authToken)
      .type('form')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('data');
        done();
      });
  });
});

describe('PATCH /api/v1/property/<:property-id>', () => {
  it('Should update a property price', (done) => {
    const req = chai.request(app)
      .patch(`/api/v1/property/${propertyId}`);
    req.set('Authorization', authToken)
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
      .patch(`/api/v1/property/${propertyId}/sold`);
    req.set('Authorization', authToken)
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
      // .delete('/api/v1/property/1');
      .delete(`/api/v1/property/${propertyId}`);
    req.set('Authorization', authToken)
      .type('form')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('data');
        done();
      });
  });
});
