"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _server = require("../../server");

var _vendorMaster = _interopRequireDefault(require("../../models/master/vendorMaster"));

var expect = _chai["default"].expect;

_chai["default"].use(_chaiHttp["default"]);

describe('Vendor Master', function () {
  beforeEach(function (done) {
    //Before each test we empty the database in your case
    _vendorMaster["default"].remove({}, function (err) {
      done();
    });
  });
  /*
   * Test the /GET route
   */

  describe('/GET vendor', function () {
    it('it should GET all the brands', function (done) {
      _chai["default"].request(_server.server).get('/vendor').end(function (err, res) {
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

  describe('/POST vendor', function () {
    it('it should not POST a vendor without code', function (done) {
      var vendor = {
        name: 'Test'
      };

      _chai["default"].request(_server.server).post('/vendor').send(vendor).end(function (err, res) {
        expect(res.status).to.equal(500);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('errors');
        expect(res.body.errors).to.have.property('code');
        expect(res.body.errors.code).to.have.property('kind').to.equal('required');
        done();
      });
    });
    it('it should not POST a vendor without name', function (done) {
      var vendor = {
        code: 'TEST'
      };

      _chai["default"].request(_server.server).post('/vendor').send(vendor).end(function (err, res) {
        expect(res.status).to.equal(500);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('errors');
        expect(res.body.errors).to.have.property('name');
        expect(res.body.errors.name).to.have.property('kind').to.equal('required');
        done();
      });
    });
    it('it should not POST a vendor with a code already exists', function (done) {
      var newVendor = new _vendorMaster["default"]({
        code: 'TEST',
        name: 'Test'
      });
      newVendor.save();
      var vendor = {
        code: 'TEST',
        name: 'Test'
      };

      _chai["default"].request(_server.server).post('/vendor').send(vendor).end(function (err, res) {
        expect(res.status).to.equal(500);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('This code is already exists!');
        done();
      });
    });
    it('it should POST a vendor', function (done) {
      var vendor = {
        code: 'TEST',
        name: 'Test'
      };

      _chai["default"].request(_server.server).post('/vendor').send(vendor).end(function (err, res) {
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

  describe('/GET/:code vendor', function () {
    it('it should not GET a vendor with a wrong code', function (done) {
      var newBrand = new _vendorMaster["default"]({
        code: 'TEST',
        name: 'Test'
      });
      newBrand.save(function (err, vendor) {
        _chai["default"].request(_server.server).get('/vendor/' + 'wrongCode').send(vendor).end(function (err, res) {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.empty;
          done();
        });
      });
    });
    it('it should GET a vendor with a right code', function (done) {
      var newBrand = new _vendorMaster["default"]({
        code: 'TEST',
        name: 'Test'
      });
      newBrand.save(function (err, vendor) {
        _chai["default"].request(_server.server).get('/vendor/' + vendor.code).send(vendor).end(function (err, res) {
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

  describe('/PUT/:id vendor', function () {
    it('it should not UPDATE a vendor with wrong _id', function (done) {
      var newBrand = new _vendorMaster["default"]({
        code: 'TEST',
        name: 'Test'
      });
      newBrand.save(function (err, vendor) {
        _chai["default"].request(_server.server).put('/vendor/' + 'wrongId').send({
          code: 'TEST',
          name: 'Test 1'
        }).end(function (err, res) {
          expect(res.status).to.equal(500);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message');
          expect(res.body).to.have.property('kind').to.equal('ObjectId');
          done();
        });
      });
    });
    it('it should UPDATE a vendor with right id', function (done) {
      var newBrand = new _vendorMaster["default"]({
        code: 'TEST',
        name: 'Test'
      });
      newBrand.save(function (err, vendor) {
        _chai["default"].request(_server.server).put('/vendor/' + vendor._id).send({
          code: 'TEST',
          name: 'Test 1'
        }).end(function (err, res) {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('_id');
          expect(res.body).to.have.property('code');
          expect(res.body).to.have.property('name');
          expect(res.body).to.have.property('createdAt');
          expect(res.body).to.have.property('updatedAt').not.equal(vendor.updatedAt);
          done();
        });
      });
    });
  });
  /*
   * Test the /DELETE/:id route
   */

  describe('/DELETE/:id vendor', function () {
    it('it should not DELETE a vendor with wrong _id', function (done) {
      var newBrand = new _vendorMaster["default"]({
        code: 'TEST',
        name: 'Test'
      });
      newBrand.save(function (err, vendor) {
        _chai["default"].request(_server.server)["delete"]('/vendor/' + 'wrongId').end(function (err, res) {
          expect(res.status).to.equal(500);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message');
          expect(res.body).to.have.property('kind').to.equal('ObjectId');
          done();
        });
      });
    });
    it('it should DELETE a vendor with right id', function (done) {
      var newBrand = new _vendorMaster["default"]({
        code: 'TEST',
        name: 'Test'
      });
      newBrand.save(function (err, vendor) {
        _chai["default"].request(_server.server)["delete"]('/vendor/' + vendor._id).end(function (err, res) {
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