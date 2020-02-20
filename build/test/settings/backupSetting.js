"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _server = require("../../server");

var expect = _chai["default"].expect;

_chai["default"].use(_chaiHttp["default"]);

describe('Backup Settings', function () {
  /*
   * Test the /GET route
   */
  describe('/GET USBDrivesList', function () {
    it('it should GET all the USB drives', function (done) {
      _chai["default"].request(_server.server).get('/setting/getusbdrives').end(function (err, res) {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        done();
      });
    });
  });
});