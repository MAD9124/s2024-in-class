const mongodb = require('mongodb');

const client = new mongodb.MongoClient('mongodb://localhost:27017');

const main = async () => {
  try {
    await client.connect();
    const db = client.db('tim');
    const Users = db.collection('users');
    const Cars = db.collection('cars');

    const cars = await Cars.find({ colour: { $ne: 'Green'}}).toArray();
    console.log(cars);

    // const result = await Cars.insertOne({
    //   make: 'Honda',
    //   model: 'Civic',
    //   colour: 'purple',
    //   createAt: new Date(),
    //   updatedAt: new Date(),
    // });

    // console.log(result);
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
};

main();
