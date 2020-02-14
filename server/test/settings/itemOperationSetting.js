import chai from 'chai';
import chaiHttp from 'chai-http';
const expect = chai.expect;
import { server } from '../../server';

chai.use(chaiHttp);

describe('Item Operation Settings', () => {
  /*
   * Test the /GET route
   */
  describe('/GET USBDrivesList', () => {
    it('it should GET all the USB drives', done => {
      chai
        .request(server)
        .get('/setting/getusbdrives')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });
});
