import chai from 'chai';
import chaiHttp from 'chai-http';
const expect = chai.expect;
import { server } from '../../server';
import VendorMaster from '../../models/master/vendorMaster';

chai.use(chaiHttp);

describe('Vendor Master', () => {
  beforeEach(done => {
    //Before each test we empty the database in your case
    VendorMaster.remove({}, err => {
      done();
    });
  });

  /*
   * Test the /GET route
   */
  describe('/GET vendor', () => {
    it('it should GET all the brands', done => {
      chai
        .request(server)
        .get('/vendor')
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
  describe('/POST vendor', () => {
    it('it should not POST a vendor without code', done => {
      let vendor = {
        name: 'Test',
      };
      chai
        .request(server)
        .post('/vendor')
        .send(vendor)
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
    it('it should not POST a vendor without name', done => {
      let vendor = {
        code: 'TEST',
      };
      chai
        .request(server)
        .post('/vendor')
        .send(vendor)
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
    it('it should not POST a vendor with a code already exists', done => {
      let newVendor = new VendorMaster({ code: 'TEST', name: 'Test' });
      newVendor.save();

      let vendor = {
        code: 'TEST',
        name: 'Test',
      };
      chai
        .request(server)
        .post('/vendor')
        .send(vendor)
        .end((err, res) => {
          expect(res.status).to.equal(500);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('This code is already exists!');
          done();
        });
    });
    it('it should POST a vendor', done => {
      let vendor = {
        code: 'TEST',
        name: 'Test',
      };
      chai
        .request(server)
        .post('/vendor')
        .send(vendor)
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
  describe('/GET/:code vendor', () => {
    it('it should not GET a vendor with a wrong code', done => {
      let newBrand = new VendorMaster({ code: 'TEST', name: 'Test' });
      newBrand.save((err, vendor) => {
        chai
          .request(server)
          .get('/vendor/' + 'wrongCode')
          .send(vendor)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.empty;
            done();
          });
      });
    });

    it('it should GET a vendor with a right code', done => {
      let newBrand = new VendorMaster({ code: 'TEST', name: 'Test' });
      newBrand.save((err, vendor) => {
        chai
          .request(server)
          .get('/vendor/' + vendor.code)
          .send(vendor)
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
  describe('/PUT/:id vendor', () => {
    it('it should not UPDATE a vendor with wrong _id', done => {
      let newBrand = new VendorMaster({ code: 'TEST', name: 'Test' });
      newBrand.save((err, vendor) => {
        chai
          .request(server)
          .put('/vendor/' + 'wrongId')
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
    it('it should UPDATE a vendor with right id', done => {
      let newBrand = new VendorMaster({ code: 'TEST', name: 'Test' });
      newBrand.save((err, vendor) => {
        chai
          .request(server)
          .put('/vendor/' + vendor._id)
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
              .not.equal(vendor.updatedAt);
            done();
          });
      });
    });
  });

  /*
   * Test the /DELETE/:id route
   */
  describe('/DELETE/:id vendor', () => {
    it('it should not DELETE a vendor with wrong _id', done => {
      let newBrand = new VendorMaster({ code: 'TEST', name: 'Test' });
      newBrand.save((err, vendor) => {
        chai
          .request(server)
          .delete('/vendor/' + 'wrongId')
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
    it('it should DELETE a vendor with right id', done => {
      let newBrand = new VendorMaster({ code: 'TEST', name: 'Test' });
      newBrand.save((err, vendor) => {
        chai
          .request(server)
          .delete('/vendor/' + vendor._id)
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
