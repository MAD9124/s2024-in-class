const sum = (a, b) => a + b;

const combineObjects = (obj1, obj2) => ({
  ...obj1,
  ...obj2,
});

const createId = (input) => ({
  _id: Math.PI,
  ...input,
});

const makeError = (res) => res;

test('should add numbers together', () => {
  const result = sum(1, 2);
  expect(result).toBe(3);
});

test('should combine all properties', () => {
  const result = combineObjects({ a: 'A' }, { b: 'B' });
  expect(result).toEqual({ a: 'A', b: 'B' });
});

test('should override in the correct direction', () => {
  const result = combineObjects({ a: 'A' }, { a: 'a', b: 'B' });
  expect(result).toEqual({ a: 'a', b: 'B' });
});

test('should have the correct name', () => {
  const result = createId({ name: 'tim', email: 'test@test.ca' });
  expect(result).toMatchObject({ name: 'tim' });
});

test('should have error at the root 1', () => {
  const result = makeError({ error: 'this is an error message' });
  expect(result).toHaveProperty('error');
});

test('should have error at the root 2', () => {
  const result = makeError({ error: { message: 'this is an error message' } });
  expect(result).toHaveProperty('error');
});
