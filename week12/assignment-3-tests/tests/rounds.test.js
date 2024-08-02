const {
  goodResponse,
  notFoundResponse,
  badRequestResponse,
  convertJSON,
  requestFactory,
  unauthorizedResponse,
  forbiddenResponse,
} = require('./helpers');
const {
  createRound,
  getRounds,
  getRoundsRaw,
  createCourse,
  createUser,
  connect,
  dropDbs,
} = require('./db');
const { mockRounds, MOCK_ROUND_ID } = require('./mocks/round');
const { mockCourses, MOCK_COURSE_ID } = require('./mocks/course');
const { mockUsers, TOKEN_1, TOKEN_2, MOCK_USER_ID } = require('./mocks/user');

const ROUND_ID = MOCK_ROUND_ID.toString();
const COURSE_ID = MOCK_COURSE_ID.toString();
const USER_ID = MOCK_USER_ID.toString();
const BAD_ID = '123412341234123412341234';

const EXPECTED_ROUND = convertJSON({
  ...mockRounds[0],
  course: mockCourses[0],
  user: mockUsers[0],
});
const request = requestFactory('/api/rounds');

describe('ROUND RESOURCE', () => {
  let disconnect;
  beforeEach(async () => {
    disconnect = await connect();
  });
  afterEach(async () => {
    await dropDbs();
    await disconnect();
  });
  describe('getAll', () => {
    beforeEach(async () => {
      await createUser(mockUsers[0]);
      await createCourse(mockCourses[0]);
      await Promise.all(mockRounds.map(createRound));
    });
    it('happy path', async () => {
      const { data, status } = await request('get', '/', TOKEN_1);

      goodResponse(data, status);
      expect(Array.isArray(data.data)).toBe(true);

      const dbRounds = await getRounds();
      expect(data.data).toEqual(dbRounds);
    });
    it('should have status 401', async () => {
      const { data, status } = await request('get', '/');

      unauthorizedResponse(data, status);
    });
  });

  describe('getOne', () => {
    beforeEach(async () => {
      await createUser(mockUsers[0]);
      await createCourse(mockCourses[0]);
      await createRound(mockRounds[0]);
    });
    it('happy path', async () => {
      const { data, status } = await request('get', `/${ROUND_ID}`, TOKEN_1);
      const [dbRound] = await getRounds();

      goodResponse(data, status);
      expect(data.data).toEqual(dbRound);
    });
    it('should throw 400 for bad id', async () => {
      const { data, status } = await request('get', '/badid', TOKEN_1);
      badRequestResponse(data, status);
    });
    it('should throw 401', async () => {
      const { data, status } = await request('get', `/${ROUND_ID}`);

      unauthorizedResponse(data, status);
    });
    it('should throw 403', async () => {
      const { data, status } = await request('get', `/${ROUND_ID}`, TOKEN_2);

      forbiddenResponse(data, status);
    });
    it('should throw 404', async () => {
      const { data, status } = await request('get', `/${BAD_ID}`, TOKEN_1);

      notFoundResponse(data, status);
    });
  });

  describe('create', () => {
    it('happy path', async () => {
      const newRound = {
        scores: [...mockRounds[0].scores],
        user: USER_ID,
        course: COURSE_ID,
      };

      const { data, status } = await request('post', '/', TOKEN_1, newRound);
      expect(status).toBe(201);
      expect(data).toHaveProperty('data');

      const [dbRound] = await getRoundsRaw();
      expect(data.data).toEqual(dbRound);

      delete data.data._id;
      expect(data.data).toEqual(newRound);
    });
    it('should throw 400', async () => {
      const { data, status } = await request('post', '/', TOKEN_1, {});

      badRequestResponse(data, status);
    });
    it('should throw 400 for invalid array scores', async () => {
      const { data, status } = await request('post', '/', TOKEN_1, {
        username: 'Test',
        scores: [],
      });

      badRequestResponse(data, status);
    });
    it('should throw 401', async () => {
      const { data, status } = await request('post', '/', 'invalid_token', {
        username: 'Test',
        scores: [],
      });

      unauthorizedResponse(data, status);
    });
  });

  describe('replace', () => {
    beforeEach(async () => {
      await createUser(mockUsers[0]);
      await createCourse(mockCourses[0]);
      await createRound(mockRounds[0]);
    });
    it('happy path', async () => {
      const updatedRound = {
        scores: mockRounds[0].scores,
        course: COURSE_ID,
      };

      const { data, status } = await request(
        'put',
        `/${ROUND_ID}`,
        TOKEN_1,
        updatedRound
      );
      goodResponse(data, status);

      const [dbRound] = await getRounds();
      expect(data.data).toEqual(dbRound);
      expect(data.data).toEqual({
        ...updatedRound,
        course: EXPECTED_ROUND.course,
        user: EXPECTED_ROUND.user,
        _id: ROUND_ID,
      });
    });
    it('should throw 400', async () => {
      const { data, status } = await request(
        'put',
        `/${ROUND_ID}`,
        TOKEN_1,
        {}
      );

      badRequestResponse(data, status);
    });
    it('should throw 400 for bad id', async () => {
      const { data, status } = await request('put', '/badid', TOKEN_1, {
        username: 'Update',
        scores: [...mockRounds[0].scores],
        course: COURSE_ID,
      });
      badRequestResponse(data, status);
    });
    it('should throw 401 for bad token', async () => {
      const { data, status } = await request(
        'put',
        `/${ROUND_ID}`,
        'invalid_token',
        {
          username: 'Update',
          scores: [...mockRounds[0].scores],
          course: COURSE_ID,
        }
      );
      unauthorizedResponse(data, status);
    });
    it('should throw 403 for wrong user', async () => {
      const { data, status } = await request('put', `/${ROUND_ID}`, TOKEN_2, {
        // username: 'Update',
        scores: [...mockRounds[0].scores],
        course: COURSE_ID,
      });
      forbiddenResponse(data, status);
    });
    it('should throw 404', async () => {
      const { data, status } = await request('put', `/${BAD_ID}`, TOKEN_1, {
        username: 'Update',
        scores: [...mockRounds[0].scores],
        course: COURSE_ID,
      });

      notFoundResponse(data, status);
    });
  });

  describe('update', () => {
    beforeEach(async () => {
      await createUser(mockUsers[0]);
      await createCourse(mockCourses[0]);
      await createRound(mockRounds[0]);
    });
    it('happy path scores', async () => {
      const updatedRound = {
        scores: [...mockRounds[0].scores],
      };

      const { data, status } = await request(
        'patch',
        `/${ROUND_ID}`,
        TOKEN_1,
        updatedRound
      );

      goodResponse(data, status);

      const [dbRound] = await getRounds();
      expect(dbRound).toEqual(data.data);
      expect(dbRound).toEqual({ ...EXPECTED_ROUND, ...updatedRound });
    });
    it('should not allow random keys', async () => {
      const updatedRound = {
        script: 'malware',
      };

      const { data, status } = await request(
        'patch',
        `/${ROUND_ID}`,
        TOKEN_1,
        updatedRound
      );

      goodResponse(data, status);

      expect(data.data).toEqual(EXPECTED_ROUND);
    });
    it('should throw 400 for bad id', async () => {
      const { data, status } = await request('patch', '/badid', TOKEN_1, {
        username: 'test',
      });
      badRequestResponse(data, status);
    });
    it('should throw 404', async () => {
      const { data, status } = await request('patch', `/${BAD_ID}`, TOKEN_1, {
        username: 'test',
      });

      notFoundResponse(data, status);
    });
  });

  describe('delete', () => {
    beforeEach(async () => {
      await createUser(mockUsers[0]);
      await createCourse(mockCourses[0]);
      await createRound(mockRounds[0]);
    });

    it('happy path', async () => {
      const { data, status } = await request('delete', `/${ROUND_ID}`, TOKEN_1);

      goodResponse(data, status);

      expect(data.data).toEqual(EXPECTED_ROUND);
      const dbRounds = await getRounds();
      expect(dbRounds.length).toBe(0);
    });
    it('should throw 400 for bad id', async () => {
      const { data, status } = await request('delete', '/badid', TOKEN_1);
      badRequestResponse(data, status);
    });
    it('should throw 401 for bad token', async () => {
      const { data, status } = await request(
        'delete',
        `/${ROUND_ID}`,
        'bad-token'
      );
      unauthorizedResponse(data, status);
    });
    it('should throw 403 for not your round', async () => {
      const { data, status } = await request('delete', `/${ROUND_ID}`, TOKEN_2);
      forbiddenResponse(data, status);
    });
    it('should throw 404', async () => {
      const { data, status } = await request('delete', `/${BAD_ID}`, TOKEN_1);
      notFoundResponse(data, status);
    });
  });
});
