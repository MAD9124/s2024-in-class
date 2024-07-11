'use strict';

const mongoose = require('mongoose');
const catSchema = new mongoose.Schema(
  {
    name: String,
    age: Number,
    lives: Number,
    favouriteFoods: [String],
  },
  {
    timestamps: true,
  }
);

const Cat = mongoose.model('Cat', catSchema);

const main = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/explore-mongoose');

    // Get all cats
    let res = await Cat.find();

    // Get all cats with 9 lives
    res = await Cat.find({ lives: 9 });

    // Get all cats older than 9 years old
    res = await Cat.find({ age: { $gt: 9 } });

    // Get all cats whose name starts with `G`
    res = await Cat.find({ name: { $regex: 'g', $options: 'i' } });

    // Get all cats that like tuna
    res = await Cat.find({ favouriteFoods: 'tuna' });

    // Get all cats that don't like tuna
    res = await Cat.find({ favouriteFoods: { $ne: 'tuna' } });

    // Get all cats that like potatoes or strawberry
    res = await Cat.find({
      favouriteFoods: { $in: ['potatoes', 'strawberry'] },
    });

    // Get all cats that like mice and biscuits
    res = await Cat.find({
      $and: [
        {
          favouriteFoods: 'mouse',
        },
        {
          favouriteFoods: 'biscuits',
        },
      ],
    });

    // Get the oldest cat
    res = await Cat.findOne().sort({ age: -1 });

    // Get the oldest cat that likes fish
    res = await Cat.findOne({ favouriteFoods: 'fish' }).sort({ age: -1 });

    // Get the cat with the lease lives that like milk and biscuits
    res = await Cat.findOne({
      $and: [
        {
          favouriteFoods: 'milk',
        },
        {
          favouriteFoods: 'biscuits',
        },
      ],
    }).sort({ lives: 1 });

    // Get the 10 oldest cats
    res = await Cat.find().sort({ age: -1 }).limit(10);

    // Count the number of cats with 3 lives
    res = await Cat.countDocuments({ lives: 3 });

    // Get just the name and age of the cats who like sushi
    res = await Cat.find({ favouriteFoods: 'sushi' }).select('name age');
    console.log(res);
  } catch (error) {
    console.log(error);
  } finally {
    await mongoose.disconnect();
  }
};

main();
