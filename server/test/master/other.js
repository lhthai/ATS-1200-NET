import chai from 'chai';
import chaiHttp from 'chai-http';
const expect = chai.expect;
import { server } from '../../server';
import OtherMaster from '../../models/master/otherMaster';

chai.use(chaiHttp);

describe('Other Master', () => {
  beforeEach(done => {
    //Before each test we empty the database in your case
    OtherMaster.remove({}, err => {
      done();
    });
  });

  /*
   * Test the /GET route
   */
  describe('/GET other', () => {
    it('it should GET all the brands', done => {
      chai
        .request(server)
        .get('/other')
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
  describe('/POST other', () => {
    it('it should not POST a other without code', done => {
      let other = {
        name: 'Test',
      };
      chai
        .request(server)
        .post('/other')
        .send(other)
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
    it('it should not POST a other without name', done => {
      let other = {
        code: 'TEST',
      };
      chai
        .request(server)
        .post('/other')
        .send(other)
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
    it('it should not POST a other with a code already exists', done => {
      let newVendor = new OtherMaster({ code: 'TEST', name: 'Test' });
      newVendor.save();

      let other = {
        code: 'TEST',
        name: 'Test',
      };
      chai
        .request(server)
        .post('/other')
        .send(other)
        .end((err, res) => {
          expect(res.status).to.equal(500);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('This code is already exists!');
          done();
        });
    });
    it('it should POST a other', done => {
      let other = {
        code: 'TEST',
        name: 'Test',
      };
      chai
        .request(server)
        .post('/other')
        .send(other)
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
  describe('/GET/:code other', () => {
    it('it should not GET a other with a wrong code', done => {
      let newBrand = new OtherMaster({ code: 'TEST', name: 'Test' });
      newBrand.save((err, other) => {
        chai
          .request(server)
          .get('/other/' + 'wrongCode')
          .send(other)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.empty;
            done();
          });
      });
    });

    it('it should GET a other with a right code', done => {
      let newBrand = new OtherMaster({ code: 'TEST', name: 'Test' });
      newBrand.save((err, other) => {
        chai
          .request(server)
          .get('/other/' + other.code)
          .send(other)
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
  describe('/PUT/:id other', () => {
    it('it should not UPDATE a other with wrong _id', done => {
      let newBrand = new OtherMaster({ code: 'TEST', name: 'Test' });
      newBrand.save((err, other) => {
        chai
          .request(server)
          .put('/other/' + 'wrongId')
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
    it('it should UPDATE a other with right id', done => {
      let newBrand = new OtherMaster({ code: 'TEST', name: 'Test' });
      newBrand.save((err, other) => {
        chai
          .request(server)
          .put('/other/' + other._id)
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
              .not.equal(other.updatedAt);
            done();
          });
      });
    });
  });

  /*
   * Test the /DELETE/:id route
   */
  describe('/DELETE/:id other', () => {
    it('it should not DELETE a other with wrong _id', done => {
      let newBrand = new OtherMaster({ code: 'TEST', name: 'Test' });
      newBrand.save((err, other) => {
        chai
          .request(server)
          .delete('/other/' + 'wrongId')
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
    it('it should DELETE a other with right id', done => {
      let newBrand = new OtherMaster({ code: 'TEST', name: 'Test' });
      newBrand.save((err, other) => {
        chai
          .request(server)
          .delete('/other/' + other._id)
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
