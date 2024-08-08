const { Router } = require('express');
const passport = require('passport');

const carsController = require('../controllers/cars');
const isValidObjectId = require('../middlewares/isValidObjectId');
const uploadProfilePic = require('../middlewares/uploadProfilePic');
const {
  validateCar,
  partialValidateCar,
} = require('../middlewares/validateCar');

const isAuthenticated = require('../middlewares/isAuthenticated');
const attachImages = require('../middlewares/attachImages');
const sanitizeBody = require('../middlewares/sanitizeBody');

const carsRouter = Router();

carsRouter.get('/', carsController.getAll);
carsRouter.get('/mine', isAuthenticated, carsController.getMine);
carsRouter.get('/:id', isValidObjectId, carsController.getOne);

carsRouter.use(isAuthenticated);

carsRouter.post('/', attachImages, sanitizeBody, validateCar, carsController.create);
carsRouter.post(
  '/profile-pic',
  uploadProfilePic,
  carsController.uploadProfilePic
);
carsRouter.put('/:id', isValidObjectId, validateCar, carsController.updateOne);
carsRouter.patch('/:id', isValidObjectId, carsController.updateOne);
carsRouter.delete('/:id', isValidObjectId, carsController.deleteOne);

module.exports = carsRouter;
