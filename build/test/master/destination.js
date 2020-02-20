"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _server = require("../../server");

var _destinationMaster = _interopRequireDefault(require("../../models/master/destinationMaster"));

var expect = _chai["default"].expect;

_chai["default"].use(_chaiHttp["default"]);

describe('Destination Master', function () {
  beforeEach(function (done) {
    //Before each test we empty the database in your case
    _destinationMaster["default"].remove({}, function (err) {
      done();
    });
  });
  /*
   * Test the /GET route
   */

  describe('/GET destination', function () {
    it('it should GET all the brands', function (done) {
      _chai["default"].request(_server.server).get('/destination').end(function (err, res) {
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

  describe('/POST destination', function () {
    it('it should not POST a destination without code', function (done) {
      var destination = {
        name: 'Test'
      };

      _chai["default"].request(_server.server).post('/destination').send(destination).end(function (err, res) {
        expect(res.status).to.equal(500);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('errors');
        expect(res.body.errors).to.have.property('code');
        expect(res.body.errors.code).to.have.property('kind').to.equal('required');
        done();
      });
    });
    it('it should not POST a destination without name', function (done) {
      var destination = {
        code: 'TEST'
      };

      _chai["default"].request(_server.server).post('/destination').send(destination).end(function (err, res) {
        expect(res.status).to.equal(500);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('errors');
        expect(res.body.errors).to.have.property('name');
        expect(res.body.errors.name).to.have.property('kind').to.equal('required');
        done();
      });
    });
    it('it should not POST a destination with a code already exists', function (done) {
      var newVendor = new _destinationMaster["default"]({
        code: 'TEST',
        name: 'Test'
      });
      newVendor.save();
      var destination = {
        code: 'TEST',
        name: 'Test'
      };

      _chai["default"].request(_server.server).post('/destination').send(destination).end(function (err, res) {
        expect(res.status).to.equal(500);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('This code is already exists!');
        done();
      });
    });
    it('it should POST a destination', function (done) {
      var destination = {
        code: 'TEST',
        name: 'Test'
      };

      _chai["default"].request(_server.server).post('/destination').send(destination).end(function (err, res) {
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

  describe('/GET/:code destination', function () {
    it('it should not GET a destination with a wrong code', function (done) {
      var newBrand = new _destinationMaster["default"]({
        code: 'TEST',
        name: 'Test'
      });
      newBrand.save(function (err, destination) {
        _chai["default"].request(_server.server).get('/destination/' + 'wrongCode').send(destination).end(function (err, res) {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.empty;
          done();
        });
      });
    });
    it('it should GET a destination with a right code', function (done) {
      var newBrand = new _destinationMaster["default"]({
        code: 'TEST',
        name: 'Test'
      });
      newBrand.save(function (err, destination) {
        _chai["default"].request(_server.server).get('/destination/' + destination.code).send(destination).end(function (err, res) {
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

  describe('/PUT/:id destination', function () {
    it('it should not UPDATE a destination with wrong _id', function (done) {
      var newBrand = new _destinationMaster["default"]({
        code: 'TEST',
        name: 'Test'
      });
      newBrand.save(function (err, destination) {
        _chai["default"].request(_server.server).put('/destination/' + 'wrongId').send({
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
    it('it should UPDATE a destination with right id', function (done) {
      var newBrand = new _destinationMaster["default"]({
        code: 'TEST',
        name: 'Test'
      });
      newBrand.save(function (err, destination) {
        _chai["default"].request(_server.server).put('/destination/' + destination._id).send({
          code: 'TEST',
          name: 'Test 1'
        }).end(function (err, res) {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('_id');
          expect(res.body).to.have.property('code');
          expect(res.body).to.have.property('name');
          expect(res.body).to.have.property('createdAt');
          expect(res.body).to.have.property('updatedAt').not.equal(destination.updatedAt);
          done();
        });
      });
    });
  });
  /*
   * Test the /DELETE/:id route
   */

  describe('/DELETE/:id destination', function () {
    it('it should not DELETE a destination with wrong _id', function (done) {
      var newBrand = new _destinationMaster["default"]({
        code: 'TEST',
        name: 'Test'
      });
      newBrand.save(function (err, destination) {
        _chai["default"].request(_server.server)["delete"]('/destination/' + 'wrongId').end(function (err, res) {
          expect(res.status).to.equal(500);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message');
          expect(res.body).to.have.property('kind').to.equal('ObjectId');
          done();
        });
      });
    });
    it('it should DELETE a destination with right id', function (done) {
      var newBrand = new _destinationMaster["default"]({
        code: 'TEST',
        name: 'Test'
      });
      newBrand.save(function (err, destination) {
        _chai["default"].request(_server.server)["delete"]('/destination/' + destination._id).end(function (err, res) {
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