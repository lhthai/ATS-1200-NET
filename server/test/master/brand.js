import chai from 'chai';
import chaiHttp from 'chai-http';
import { server } from '../../server';
import BrandMaster from '../../models/master/brandMaster';

const { expect } = chai;

chai.use(chaiHttp);

describe('Brand Master', () => {
  beforeEach(done => {
    // Before each test we empty the database in your case
    BrandMaster.remove({}, err => {
      done();
    });
  });

  /*
   * Test the /GET route
   */
  describe('/GET brand', () => {
    it('it should GET all the brands', done => {
      chai
        .request(server)
        .get('/brand')
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
  describe('/POST brand', () => {
    it('it should not POST a brand without code', done => {
      const brand = {
        name: 'Test',
      };
      chai
        .request(server)
        .post('/brand')
        .send(brand)
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
    it('it should not POST a brand without name', done => {
      const brand = {
        code: 'TEST',
      };
      chai
        .request(server)
        .post('/brand')
        .send(brand)
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
    it('it should not POST a brand with a code already exists', done => {
      const newBrand = new BrandMaster({ code: 'TEST', name: 'Test' });
      newBrand.save();

      const brand = {
        code: 'TEST',
        name: 'Test',
      };
      chai
        .request(server)
        .post('/brand')
        .send(brand)
        .end((err, res) => {
          expect(res.status).to.equal(500);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('This code is already exists!');
          done();
        });
    });
    it('it should POST a brand', done => {
      const brand = {
        code: 'TEST',
        name: 'Test',
      };
      chai
        .request(server)
        .post('/brand')
        .send(brand)
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
  describe('/GET/:code brand', () => {
    it('it should not GET a brand with a wrong code', done => {
      const newBrand = new BrandMaster({ code: 'TEST', name: 'Test' });
      newBrand.save((err, brand) => {
        chai
          .request(server)
          .get('/brand/' + 'wrongCode')
          .send(brand)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.empty;
            done();
          });
      });
    });

    it('it should GET a brand with a right code', done => {
      const newBrand = new BrandMaster({ code: 'TEST', name: 'Test' });
      newBrand.save((err, brand) => {
        chai
          .request(server)
          .get(`/brand/${brand.code}`)
          .send(brand)
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
  describe('/PUT/:id brand', () => {
    it('it should not UPDATE a brand with wrong _id', done => {
      const newBrand = new BrandMaster({ code: 'TEST', name: 'Test' });
      newBrand.save((err, brand) => {
        chai
          .request(server)
          .put('/brand/' + 'wrongId')
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
    it('it should UPDATE a brand with right id', done => {
      const newBrand = new BrandMaster({ code: 'TEST', name: 'Test' });
      newBrand.save((err, brand) => {
        chai
          .request(server)
          .put(`/brand/${brand._id}`)
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
              .not.equal(brand.updatedAt);
            done();
          });
      });
    });
  });

  /*
   * Test the /DELETE/:id route
   */
  describe('/DELETE/:id brand', () => {
    it('it should not DELETE a brand with wrong _id', done => {
      const newBrand = new BrandMaster({ code: 'TEST', name: 'Test' });
      newBrand.save((err, brand) => {
        chai
          .request(server)
          .delete('/brand/' + 'wrongId')
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
    it('it should DELETE a brand with right id', done => {
      const newBrand = new BrandMaster({ code: 'TEST', name: 'Test' });
      newBrand.save((err, brand) => {
        chai
          .request(server)
          .delete(`/brand/${brand._id}`)
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
