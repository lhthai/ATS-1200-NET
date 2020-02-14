"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _server = require("../../server");

var _truckMaster = _interopRequireDefault(require("../../models/master/truckMaster"));

var expect = _chai["default"].expect;

_chai["default"].use(_chaiHttp["default"]);

describe('Truck Master', function () {
  beforeEach(function (done) {
    //Before each test we empty the database in your case
    _truckMaster["default"].remove({}, function (err) {
      done();
    });
  });
  /*
   * Test the /GET route
   */

  describe('/GET truck', function () {
    it('it should GET all the trucks', function (done) {
      _chai["default"].request(_server.server).get('/truck').end(function (err, res) {
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

  describe('/POST truck', function () {
    it('it should not POST a truck without truckNumber', function (done) {
      var truck = {
        brand: 'Toyota',
        brandCode: 'TOY',
        vendor: 'Tanaka',
        vendorCode: 'TSV',
        destination: 'Japan',
        destinationCode: 'JP',
        other: 'SUV',
        otherCode: 'SUV',
        emptyWeight: 100,
        maximumWeight: 200
      };

      _chai["default"].request(_server.server).post('/truck').send(truck).end(function (err, res) {
        expect(res.status).to.equal(500);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('errors');
        expect(res.body.errors).to.have.property('truckNumber');
        expect(res.body.errors.truckNumber).to.have.property('kind').to.equal('required');
        done();
      });
    });
    it('emptyWeight should be a number', function (done) {
      var truck = {
        truckNumber: '60A-41179',
        brand: 'Toyota',
        brandCode: 'TOY',
        vendor: 'Tanaka',
        vendorCode: 'TSV',
        destination: 'Japan',
        destinationCode: 'JP',
        other: 'SUV',
        otherCode: 'SUV',
        emptyWeight: 'TEST',
        maximumWeight: 200
      };

      _chai["default"].request(_server.server).post('/truck').send(truck).end(function (err, res) {
        expect(res.status).to.equal(500);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('errors');
        expect(res.body.errors).to.have.property('emptyWeight');
        expect(res.body.errors.emptyWeight).to.have.property('kind').to.equal('Number');
        done();
      });
    });
    it('maximumWeight should be a number', function (done) {
      var truck = {
        truckNumber: '60A-41179',
        brand: 'Toyota',
        brandCode: 'TOY',
        vendor: 'Tanaka',
        vendorCode: 'TSV',
        destination: 'Japan',
        destinationCode: 'JP',
        other: 'SUV',
        otherCode: 'SUV',
        emptyWeight: 100,
        maximumWeight: 'TEST'
      };

      _chai["default"].request(_server.server).post('/truck').send(truck).end(function (err, res) {
        expect(res.status).to.equal(500);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('errors');
        expect(res.body.errors).to.have.property('maximumWeight');
        expect(res.body.errors.maximumWeight).to.have.property('kind').to.equal('Number');
        done();
      });
    });
    it('it should POST a truck', function (done) {
      var truck = {
        truckNumber: '60A-41179',
        brand: 'Toyota',
        brandCode: 'TOY',
        vendor: 'Tanaka',
        vendorCode: 'TSV',
        destination: 'Japan',
        destinationCode: 'JP',
        other: 'SUV',
        otherCode: 'SUV',
        emptyWeight: 100,
        maximumWeight: 200
      };

      _chai["default"].request(_server.server).post('/truck').send(truck).end(function (err, res) {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('_id');
        expect(res.body).to.have.property('truckNumber');
        expect(res.body).to.have.property('brandCode');
        expect(res.body).to.have.property('brand');
        expect(res.body).to.have.property('vendorCode');
        expect(res.body).to.have.property('vendor');
        expect(res.body).to.have.property('destinationCode');
        expect(res.body).to.have.property('destination');
        expect(res.body).to.have.property('otherCode');
        expect(res.body).to.have.property('other');
        expect(res.body).to.have.property('emptyWeight');
        expect(res.body).to.have.property('maximumWeight');
        done();
      });
    });
  });
  /*
   * Test the /GET/:truckNumber route
   */

  describe('/GET/:truckNumber truck', function () {
    it('it should not GET a truck with a wrong truckNumber', function (done) {
      var newTruck = new _truckMaster["default"]({
        truckNumber: '60A-41179'
      });
      newTruck.save(function (err, truck) {
        _chai["default"].request(_server.server).get('/truck/' + 'wrongTruckNumber').send(truck).end(function (err, res) {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.empty;
          done();
        });
      });
    });
    it('it should GET a truck with a right truckNumber', function (done) {
      var newTruck = new _truckMaster["default"]({
        truckNumber: '60A-41179'
      });
      newTruck.save(function (err, truck) {
        _chai["default"].request(_server.server).get('/truck/' + truck.truckNumber).send(truck).end(function (err, res) {
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

  describe('/PUT/:id truck', function () {
    it('it should not UPDATE a truck with wrong _id', function (done) {
      var newTruck = new _truckMaster["default"]({
        truckNumber: '60A-41179'
      });
      newTruck.save(function (err, truck) {
        _chai["default"].request(_server.server).put('/truck/' + 'wrongId').send({
          truckNumber: '60A-41179',
          brandCode: 'TEST'
        }).end(function (err, res) {
          expect(res.status).to.equal(500);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message');
          expect(res.body).to.have.property('kind').to.equal('ObjectId');
          done();
        });
      });
    });
    it('it should UPDATE a truck with right _id', function (done) {
      var newTruck = new _truckMaster["default"]({
        truckNumber: '60A-41179'
      });
      newTruck.save(function (err, truck) {
        _chai["default"].request(_server.server).put('/truck/' + truck._id).send({
          truckNumber: '60A-41179',
          brandCode: 'TEST'
        }).end(function (err, res) {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('_id');
          expect(res.body).to.have.property('truckNumber');
          expect(res.body).to.have.property('brandCode');
          expect(res.body).to.have.property('createdAt');
          expect(res.body).to.have.property('updatedAt').not.equal(truck.updatedAt);
          done();
        });
      });
    });
  });
  /*
   * Test the /DELETE/:id route
   */

  describe('/DELETE/:id truck', function () {
    it('it should not DELETE a truck with wrong _id', function (done) {
      var newTruck = new _truckMaster["default"]({
        truckNumber: '60A-41179'
      });
      newTruck.save(function (err, truck) {
        _chai["default"].request(_server.server)["delete"]('/truck/' + 'wrongId').end(function (err, res) {
          expect(res.status).to.equal(500);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message');
          expect(res.body).to.have.property('kind').to.equal('ObjectId');
          done();
        });
      });
    });
    it('it should DELETE a truck with right id', function (done) {
      var newTruck = new _truckMaster["default"]({
        truckNumber: '60A-41179'
      });
      newTruck.save(function (err, truck) {
        _chai["default"].request(_server.server)["delete"]('/truck/' + truck._id).end(function (err, res) {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('_id');
          expect(res.body).to.have.property('truckNumber');
          expect(res.body).to.have.property('createdAt');
          expect(res.body).to.have.property('updatedAt');
          done();
        });
      });
    });
  });
});