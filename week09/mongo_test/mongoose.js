const mongoose = require('mongoose');

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
  },
  {
    timestamps: true,
  }
);

const Cars = mongoose.model('cars', carSchema);

const main = async () => {
  // some asynchronous logic
  try {
    await mongoose.connect('mongodb://localhost:27017/tim');

    // const allCars = await Cars.find({
    //   colour: { $ne: 'Green' },
    // });
    // console.log(allCars);

    // const newCar = await Cars.create({
    //   make: 'Toyota',
    //   model: 'Prius V',
    //   colour: 'Blue',
    //   drivers: ['123'],
    // });
    // console.log(newCar);

    const id = '668f0d9741e9e8cc5cfce547';
    // const body = { make: '_White' };

    // const updatedCar = await Cars.findByIdAndUpdate(
    //   id,
    //   {
    //     $set: body,
    //   },
    //   {
    //     new: true,
    //     runValidators: true,
    //   }
    // );

    // console.log('u', updatedCar);

    const deletedCar = await Cars.findByIdAndDelete(id);
    console.log(deletedCar);
  } catch (error) {
    console.error('e', error);
  } finally {
    await mongoose.disconnect();
  }
};

main();
