"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _server = require("../../server");

var _otherMaster = _interopRequireDefault(require("../../models/master/otherMaster"));

var expect = _chai["default"].expect;

_chai["default"].use(_chaiHttp["default"]);

describe('Other Master', function () {
  beforeEach(function (done) {
    //Before each test we empty the database in your case
    _otherMaster["default"].remove({}, function (err) {
      done();
    });
  });
  /*
   * Test the /GET route
   */

  describe('/GET other', function () {
    it('it should GET all the brands', function (done) {
      _chai["default"].request(_server.server).get('/other').end(function (err, res) {
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

  describe('/POST other', function () {
    it('it should not POST a other without code', function (done) {
      var other = {
        name: 'Test'
      };

      _chai["default"].request(_server.server).post('/other').send(other).end(function (err, res) {
        expect(res.status).to.equal(500);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('errors');
        expect(res.body.errors).to.have.property('code');
        expect(res.body.errors.code).to.have.property('kind').to.equal('required');
        done();
      });
    });
    it('it should not POST a other without name', function (done) {
      var other = {
        code: 'TEST'
      };

      _chai["default"].request(_server.server).post('/other').send(other).end(function (err, res) {
        expect(res.status).to.equal(500);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('errors');
        expect(res.body.errors).to.have.property('name');
        expect(res.body.errors.name).to.have.property('kind').to.equal('required');
        done();
      });
    });
    it('it should not POST a other with a code already exists', function (done) {
      var newVendor = new _otherMaster["default"]({
        code: 'TEST',
        name: 'Test'
      });
      newVendor.save();
      var other = {
        code: 'TEST',
        name: 'Test'
      };

      _chai["default"].request(_server.server).post('/other').send(other).end(function (err, res) {
        expect(res.status).to.equal(500);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('This code is already exists!');
        done();
      });
    });
    it('it should POST a other', function (done) {
      var other = {
        code: 'TEST',
        name: 'Test'
      };

      _chai["default"].request(_server.server).post('/other').send(other).end(function (err, res) {
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

  describe('/GET/:code other', function () {
    it('it should not GET a other with a wrong code', function (done) {
      var newBrand = new _otherMaster["default"]({
        code: 'TEST',
        name: 'Test'
      });
      newBrand.save(function (err, other) {
        _chai["default"].request(_server.server).get('/other/' + 'wrongCode').send(other).end(function (err, res) {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.empty;
          done();
        });
      });
    });
    it('it should GET a other with a right code', function (done) {
      var newBrand = new _otherMaster["default"]({
        code: 'TEST',
        name: 'Test'
      });
      newBrand.save(function (err, other) {
        _chai["default"].request(_server.server).get('/other/' + other.code).send(other).end(function (err, res) {
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

  describe('/PUT/:id other', function () {
    it('it should not UPDATE a other with wrong _id', function (done) {
      var newBrand = new _otherMaster["default"]({
        code: 'TEST',
        name: 'Test'
      });
      newBrand.save(function (err, other) {
        _chai["default"].request(_server.server).put('/other/' + 'wrongId').send({
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
    it('it should UPDATE a other with right id', function (done) {
      var newBrand = new _otherMaster["default"]({
        code: 'TEST',
        name: 'Test'
      });
      newBrand.save(function (err, other) {
        _chai["default"].request(_server.server).put('/other/' + other._id).send({
          code: 'TEST',
          name: 'Test 1'
        }).end(function (err, res) {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('_id');
          expect(res.body).to.have.property('code');
          expect(res.body).to.have.property('name');
          expect(res.body).to.have.property('createdAt');
          expect(res.body).to.have.property('updatedAt').not.equal(other.updatedAt);
          done();
        });
      });
    });
  });
  /*
   * Test the /DELETE/:id route
   */

  describe('/DELETE/:id other', function () {
    it('it should not DELETE a other with wrong _id', function (done) {
      var newBrand = new _otherMaster["default"]({
        code: 'TEST',
        name: 'Test'
      });
      newBrand.save(function (err, other) {
        _chai["default"].request(_server.server)["delete"]('/other/' + 'wrongId').end(function (err, res) {
          expect(res.status).to.equal(500);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message');
          expect(res.body).to.have.property('kind').to.equal('ObjectId');
          done();
        });
      });
    });
    it('it should DELETE a other with right id', function (done) {
      var newBrand = new _otherMaster["default"]({
        code: 'TEST',
        name: 'Test'
      });
      newBrand.save(function (err, other) {
        _chai["default"].request(_server.server)["delete"]('/other/' + other._id).end(function (err, res) {
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