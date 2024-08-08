const { convertJSON } = require("../helpers");

const { Crap, User } = global;

const createCrap = async (crap) => {
  const { insertedId } = await Crap.insertOne(crap);
  return insertedId;
};

const getCrapRaw = async () => {
  const crap = await Crap.find(
    {},
    { projection: { updatedAt: 0, createdAt: 0, __v: 0 } },
  ).toArray();

  return crap.map((p) =>
    convertJSON({
      ...p,
      _id: p._id.toString(),
    }),
  );
};

const getCrap = async (query, projection) => {
  const crap = await Crap.find(query ? query : {}, {
    projection: {
      ...(projection ? projection : {}),
      updatedAt: 0,
      createdAt: 0,
      __v: 0,
    },
  }).toArray();

  const users = await User.find({}, { projection: { name: 1 } }).toArray();

  const userMap = users.reduce((m, u) => {
    m.set(u._id.toString(), u);
    return m;
  }, new Map());

  return crap.map((p) =>
    convertJSON({
      ...p,
      _id: p._id.toString(),
      owner: userMap.get(p.owner.toString()),
      ...(p.buyer ? { buyer: userMap.get(p.buyer.toString()) } : {}),
    }),
  );
};

module.exports = {
  createCrap,
  getCrapRaw,
  getCrap,
};
