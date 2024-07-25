const { Router } = require('express');

const carsController = require('../controllers/cars');
const isValidObjectId = require('../middlewares/isValidObjectId');
const uploadProfilePic = require('../middlewares/uploadProfilePic');
const {
  validateCar,
  partialValidateCar,
} = require('../middlewares/validateCar');
const passport = require('passport');

const carsRouter = Router();

carsRouter.get('/', carsController.getAll);
carsRouter.get('/:id', isValidObjectId, carsController.getOne);

carsRouter.use(
  passport.authenticate('bearer', {
    session: false,
    failureRedirect: '/auth/login',
  })
);

carsRouter.post('/', validateCar, carsController.create);
carsRouter.post(
  '/profile-pic',
  uploadProfilePic,
  carsController.uploadProfilePic
);
carsRouter.put('/:id', isValidObjectId, validateCar, carsController.updateOne);
carsRouter.patch('/:id', isValidObjectId, carsController.updateOne);
carsRouter.delete('/:id', isValidObjectId, carsController.deleteOne);

module.exports = carsRouter;
