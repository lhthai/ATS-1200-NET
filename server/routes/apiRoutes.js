import express from 'express';
import * as brandController from '../controllers/master/brandController';
import * as destinationController from '../controllers/master/destinationController';
import * as otherController from '../controllers/master/otherController';
import * as vendorController from '../controllers/master/vendorController';
import * as truckController from '../controllers/master/truckController';
import * as weighingController from '../controllers/weighingController';

const router = express.Router();

// CRUD API ROUTES FOR BRAND MASTER
router.post('/brand', brandController.create);
router.get('/brand', brandController.getAll);
router.get('/brand/:code', brandController.get);
router.delete('/brand/:id', brandController.remove);
router.put('/brand/:id', brandController.update);

// CRUD API ROUTES FOR DESTINATION MASTER
router.post('/destination', destinationController.create);
router.get('/destination', destinationController.getAll);
router.get('/destination/:code', destinationController.get);
router.delete('/destination/:id', destinationController.remove);
router.put('/destination/:id', destinationController.update);

// CRUD API ROUTES FOR OTHER MASTER
router.post('/other', otherController.create);
router.get('/other', otherController.getAll);
router.get('/other/:code', otherController.get);
router.delete('/other/:id', otherController.remove);
router.put('/other/:id', otherController.update);

// CRUD API ROUTES FOR VENDOR MASTER
router.post('/vendor', vendorController.create);
router.get('/vendor', vendorController.getAll);
router.get('/vendor/:code', vendorController.get);
router.delete('/vendor/:id', vendorController.remove);
router.put('/vendor/:id', vendorController.update);

// CRUD API ROUTES FOR TRUCK MASTER
router.post('/truck', truckController.create);
router.get('/truck', truckController.getAll);
router.get('/truck/:truckNumber', truckController.get);
router.delete('/truck/:id', truckController.remove);
router.put('/truck/:id', truckController.update);

// CRUD API ROUTES FOR WEIGHING
router.post('/weighing', weighingController.create);
router.get('/weighing', weighingController.getAll);
router.delete('/weighing/:id', weighingController.remove);
router.put('/weighing/:id', weighingController.update);
router.get('/weighing/stayingtruck', weighingController.getStayingTrucks);
router.get(
  '/weighing/getweighingbydate/:date',
  weighingController.getWeighingByDate,
);
router.get('/weighing/report/:firstItem/:from/:to', weighingController.report);
router.get(
  '/weighing/report/:firstItem/:secondItem/:from/:to',
  weighingController.report,
);
router.get('/weighing/getmaxslipno', weighingController.getMaxSlipNo);

module.exports = router;
