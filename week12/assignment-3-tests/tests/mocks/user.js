const { ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');

const MOCK_USER_ID = new ObjectId('66abd35fe04c9e4478eb41cf');

const mockUsers = [
  {
    _id: MOCK_USER_ID,
    name: 'Test User',
    googleId: '123',
  },
  {
    _id: new ObjectId(),
    name: 'Test User 2',
    googleId: '456',
  },
];

const TOKEN_1 = jwt.sign(mockUsers[0], process.env.JWT_SECRET, {
  expiresIn: '1 day',
});
const TOKEN_2 = jwt.sign(mockUsers[1], process.env.JWT_SECRET, {
  expiresIn: '1 day',
});

module.exports = {
  MOCK_USER_ID,
  mockUsers,
  TOKEN_1,
  TOKEN_2,
};
