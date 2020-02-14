import chai from 'chai';
import chaiHttp from 'chai-http';
const expect = chai.expect;
import { server } from '../../server';
import DestinationMaster from '../../models/master/destinationMaster';

chai.use(chaiHttp);

describe('Destination Master', () => {
  beforeEach(done => {
    //Before each test we empty the database in your case
    DestinationMaster.remove({}, err => {
      done();
    });
  });

  /*
   * Test the /GET route
   */
  describe('/GET destination', () => {
    it('it should GET all the brands', done => {
      chai
        .request(server)
        .get('/destination')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.length).to.equal(0);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });

  /*
   * Test the /POST route
   */
  describe('/POST destination', () => {
    it('it should not POST a destination without code', done => {
      let destination = {
        name: 'Test',
      };
      chai
        .request(server)
        .post('/destination')
        .send(destination)
        .end((err, res) => {
          expect(res.status).to.equal(500);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('errors');
          expect(res.body.errors).to.have.property('code');
          expect(res.body.errors.code)
            .to.have.property('kind')
            .to.equal('required');
          done();
        });
    });
    it('it should not POST a destination without name', done => {
      let destination = {
        code: 'TEST',
      };
      chai
        .request(server)
        .post('/destination')
        .send(destination)
        .end((err, res) => {
          expect(res.status).to.equal(500);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('errors');
          expect(res.body.errors).to.have.property('name');
          expect(res.body.errors.name)
            .to.have.property('kind')
            .to.equal('required');
          done();
        });
    });
    it('it should not POST a destination with a code already exists', done => {
      let newVendor = new DestinationMaster({ code: 'TEST', name: 'Test' });
      newVendor.save();

      let destination = {
        code: 'TEST',
        name: 'Test',
      };
      chai
        .request(server)
        .post('/destination')
        .send(destination)
        .end((err, res) => {
          expect(res.status).to.equal(500);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('This code is already exists!');
          done();
        });
    });
    it('it should POST a destination', done => {
      let destination = {
        code: 'TEST',
        name: 'Test',
      };
      chai
        .request(server)
        .post('/destination')
        .send(destination)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('_id');
          expect(res.body).to.have.property('code');
          expect(res.body).to.have.property('name');
          expect(res.body).to.have.property('createdAt');
          expect(res.body).to.have.property('updatedAt');
          done();
        });
    });
  });

  /*
   * Test the /GET/:code route
   */
  describe('/GET/:code destination', () => {
    it('it should not GET a destination with a wrong code', done => {
      let newBrand = new DestinationMaster({ code: 'TEST', name: 'Test' });
      newBrand.save((err, destination) => {
        chai
          .request(server)
          .get('/destination/' + 'wrongCode')
          .send(destination)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.empty;
            done();
          });
      });
    });

    it('it should GET a destination with a right code', done => {
      let newBrand = new DestinationMaster({ code: 'TEST', name: 'Test' });
      newBrand.save((err, destination) => {
        chai
          .request(server)
          .get('/destination/' + destination.code)
          .send(destination)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.equal(1);
            done();
          });
      });
    });
  });

  /*
   * Test the /PUT/:id route
   */
  describe('/PUT/:id destination', () => {
    it('it should not UPDATE a destination with wrong _id', done => {
      let newBrand = new DestinationMaster({ code: 'TEST', name: 'Test' });
      newBrand.save((err, destination) => {
        chai
          .request(server)
          .put('/destination/' + 'wrongId')
          .send({ code: 'TEST', name: 'Test 1' })
          .end((err, res) => {
            expect(res.status).to.equal(500);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message');
            expect(res.body)
              .to.have.property('kind')
              .to.equal('ObjectId');
            done();
          });
      });
    });
    it('it should UPDATE a destination with right id', done => {
      let newBrand = new DestinationMaster({ code: 'TEST', name: 'Test' });
      newBrand.save((err, destination) => {
        chai
          .request(server)
          .put('/destination/' + destination._id)
          .send({ code: 'TEST', name: 'Test 1' })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('_id');
            expect(res.body).to.have.property('code');
            expect(res.body).to.have.property('name');
            expect(res.body).to.have.property('createdAt');
            expect(res.body)
              .to.have.property('updatedAt')
              .not.equal(destination.updatedAt);
            done();
          });
      });
    });
  });

  /*
   * Test the /DELETE/:id route
   */
  describe('/DELETE/:id destination', () => {
    it('it should not DELETE a destination with wrong _id', done => {
      let newBrand = new DestinationMaster({ code: 'TEST', name: 'Test' });
      newBrand.save((err, destination) => {
        chai
          .request(server)
          .delete('/destination/' + 'wrongId')
          .end((err, res) => {
            expect(res.status).to.equal(500);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message');
            expect(res.body)
              .to.have.property('kind')
              .to.equal('ObjectId');
            done();
          });
      });
    });
    it('it should DELETE a destination with right id', done => {
      let newBrand = new DestinationMaster({ code: 'TEST', name: 'Test' });
      newBrand.save((err, destination) => {
        chai
          .request(server)
          .delete('/destination/' + destination._id)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('_id');
            expect(res.body).to.have.property('code');
            expect(res.body).to.have.property('name');
            expect(res.body).to.have.property('createdAt');
            expect(res.body).to.have.property('updatedAt');
            done();
          });
      });
    });
  });
});
