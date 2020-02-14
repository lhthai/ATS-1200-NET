"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _server = require("../../server");

var _brandMaster = _interopRequireDefault(require("../../models/master/brandMaster"));

var expect = _chai["default"].expect;

_chai["default"].use(_chaiHttp["default"]);

describe('Brand Master', function () {
  beforeEach(function (done) {
    // Before each test we empty the database in your case
    _brandMaster["default"].remove({}, function (err) {
      done();
    });
  });
  /*
   * Test the /GET route
   */

  describe('/GET brand', function () {
    it('it should GET all the brands', function (done) {
      _chai["default"].request(_server.server).get('/brand').end(function (err, res) {
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

  describe('/POST brand', function () {
    it('it should not POST a brand without code', function (done) {
      var brand = {
        name: 'Test'
      };

      _chai["default"].request(_server.server).post('/brand').send(brand).end(function (err, res) {
        expect(res.status).to.equal(500);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('errors');
        expect(res.body.errors).to.have.property('code');
        expect(res.body.errors.code).to.have.property('kind').to.equal('required');
        done();
      });
    });
    it('it should not POST a brand without name', function (done) {
      var brand = {
        code: 'TEST'
      };

      _chai["default"].request(_server.server).post('/brand').send(brand).end(function (err, res) {
        expect(res.status).to.equal(500);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('errors');
        expect(res.body.errors).to.have.property('name');
        expect(res.body.errors.name).to.have.property('kind').to.equal('required');
        done();
      });
    });
    it('it should not POST a brand with a code already exists', function (done) {
      var newBrand = new _brandMaster["default"]({
        code: 'TEST',
        name: 'Test'
      });
      newBrand.save();
      var brand = {
        code: 'TEST',
        name: 'Test'
      };

      _chai["default"].request(_server.server).post('/brand').send(brand).end(function (err, res) {
        expect(res.status).to.equal(500);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('This code is already exists!');
        done();
      });
    });
    it('it should POST a brand', function (done) {
      var brand = {
        code: 'TEST',
        name: 'Test'
      };

      _chai["default"].request(_server.server).post('/brand').send(brand).end(function (err, res) {
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

  describe('/GET/:code brand', function () {
    it('it should not GET a brand with a wrong code', function (done) {
      var newBrand = new _brandMaster["default"]({
        code: 'TEST',
        name: 'Test'
      });
      newBrand.save(function (err, brand) {
        _chai["default"].request(_server.server).get('/brand/' + 'wrongCode').send(brand).end(function (err, res) {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.empty;
          done();
        });
      });
    });
    it('it should GET a brand with a right code', function (done) {
      var newBrand = new _brandMaster["default"]({
        code: 'TEST',
        name: 'Test'
      });
      newBrand.save(function (err, brand) {
        _chai["default"].request(_server.server).get("/brand/".concat(brand.code)).send(brand).end(function (err, res) {
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

  describe('/PUT/:id brand', function () {
    it('it should not UPDATE a brand with wrong _id', function (done) {
      var newBrand = new _brandMaster["default"]({
        code: 'TEST',
        name: 'Test'
      });
      newBrand.save(function (err, brand) {
        _chai["default"].request(_server.server).put('/brand/' + 'wrongId').send({
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
    it('it should UPDATE a brand with right id', function (done) {
      var newBrand = new _brandMaster["default"]({
        code: 'TEST',
        name: 'Test'
      });
      newBrand.save(function (err, brand) {
        _chai["default"].request(_server.server).put("/brand/".concat(brand._id)).send({
          code: 'TEST',
          name: 'Test 1'
        }).end(function (err, res) {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('_id');
          expect(res.body).to.have.property('code');
          expect(res.body).to.have.property('name');
          expect(res.body).to.have.property('createdAt');
          expect(res.body).to.have.property('updatedAt').not.equal(brand.updatedAt);
          done();
        });
      });
    });
  });
  /*
   * Test the /DELETE/:id route
   */

  describe('/DELETE/:id brand', function () {
    it('it should not DELETE a brand with wrong _id', function (done) {
      var newBrand = new _brandMaster["default"]({
        code: 'TEST',
        name: 'Test'
      });
      newBrand.save(function (err, brand) {
        _chai["default"].request(_server.server)["delete"]('/brand/' + 'wrongId').end(function (err, res) {
          expect(res.status).to.equal(500);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message');
          expect(res.body).to.have.property('kind').to.equal('ObjectId');
          done();
        });
      });
    });
    it('it should DELETE a brand with right id', function (done) {
      var newBrand = new _brandMaster["default"]({
        code: 'TEST',
        name: 'Test'
      });
      newBrand.save(function (err, brand) {
        _chai["default"].request(_server.server)["delete"]("/brand/".concat(brand._id)).end(function (err, res) {
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