const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
  }
);

const carSchema = mongoose.Schema(
  {
    make: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 64,
    },
    model: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 64,
    },
    colour: {
      type: String,
      required: true,
      enum: ['Brown', 'Green', 'Red', 'Blue', 'White'],
    },
    drivers: [
      {
        type: Number,
      },
    ],
    owner: userSchema,
  },
  {
    timestamps: true,
  }
);

const Car = mongoose.model('Car', carSchema);

const main = async () => {
  // some asynchronous logic
  try {
    await mongoose.connect('mongodb://localhost:27017/embedded');

    // const allCars = await Car.find({}).populate('owner');
    // console.log(allCars);

    const car = new Car({
      make: 'Ford',
      model: 'Escape',
      colour: 'Green',
      owner: {
        username: 'Tim',
        // _id: '66905c38fb11cd1642279322',
      },
    });

    await car.save();

    console.log(car);
  } catch (error) {
    console.error('e', error);
  } finally {
    await mongoose.disconnect();
  }
};

main();
