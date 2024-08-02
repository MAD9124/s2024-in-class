const {
  goodResponse,
  notFoundResponse,
  badRequestResponse,
  convertJSON,
  requestFactory,
} = require('./helpers');
const { getCourses, createCourse, connect, dropDbs } = require('./db');
const { mockCourses, MOCK_COURSE_ID } = require('./mocks/course');

const COURSE_ID = MOCK_COURSE_ID.toString();
const BAD_ID = '123412341234123412341234';

const EXPECTED_COURSE = convertJSON(mockCourses[0]);
const request = requestFactory('/api/courses');

describe('COURSE RESOURCE', () => {
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
      await Promise.all(mockCourses.map(createCourse));
    });
    it('happy path', async () => {
      const { data, status } = await request('get', '/');

      goodResponse(data, status);
      expect(Array.isArray(data.data)).toBe(true);

      const dbCourses = await getCourses();
      expect(data.data).toEqual(dbCourses);
    });
  });

  describe('getOne', () => {
    beforeEach(async () => {
      await createCourse(mockCourses[0]);
    });
    it('happy path', async () => {
      const { data, status } = await request('get', `/${COURSE_ID}`);
      const [dbCourse] = await getCourses();

      goodResponse(data, status);
      expect(data.data).toEqual(dbCourse);
    });
    it('should throw 400 for bad id', async () => {
      const { data, status } = await request('get', '/badid');
      badRequestResponse(data, status);
    });
    it('should throw 404', async () => {
      const { data, status } = await request('get', `/${BAD_ID}`);
      notFoundResponse(data, status);
    });
  });

  describe('create', () => {
    it('happy path', async () => {
      const newCourse = {
        name: 'Test Course',
        holes: mockCourses[0].holes,
      };

      const { data, status } = await request('post', '/', undefined, newCourse);
      expect(status).toBe(201);
      expect(data).toHaveProperty('data');

      const [dbCourse] = await getCourses();
      expect(data.data).toEqual(dbCourse);

      delete data.data._id;
      expect(data.data).toEqual(newCourse);
    });
    it('return 400 for bad input', async () => {
      const input = {
        name: 'Test Course',
      };

      const { data, status } = await request('post', '', undefined, input);
      badRequestResponse(data, status);
    });
    it('return 400 for bad input', async () => {
      const input = {
        name: 'Test',
        holes: [
          {
            par: 4,
            distance: 123,
          },
        ],
      };

      const { data, status } = await request('post', '', input);
      badRequestResponse(data, status);
    });
    it('return 400 for bad input', async () => {
      const input = {
        name: 'Test',
        holes: [...mockCourses[0].holes],
      };
      input.holes[9] = { par: 0, distance: 123 };

      const { data, status } = await request('post', '', undefined, input);
      badRequestResponse(data, status);
    });
  });

  describe('replace', () => {
    beforeEach(async () => {
      await createCourse(mockCourses[0]);
    });
    it('happy path', async () => {
      const updatedCourse = {
        name: 'Test Course',
        holes: mockCourses[0].holes,
      };

      const { data, status } = await request(
        'put',
        `/${COURSE_ID}`,
        undefined,
        updatedCourse
      );
      goodResponse(data, status);

      const [dbCourse] = await getCourses();
      expect(data.data).toEqual(dbCourse);
      expect(data.data).toEqual({ ...updatedCourse, _id: COURSE_ID });
    });
    it('should throw 400 for bad id', async () => {
      const { data, status } = await request('put', '/badid', undefined, {});

      badRequestResponse(data, status);
    });
    it('should throw 400', async () => {
      const { data, status } = await request(
        'put',
        `/${COURSE_ID}`,
        undefined,
        {}
      );

      badRequestResponse(data, status);
    });
    it('should throw 404', async () => {
      const { data, status } = await request('put', `/${BAD_ID}`, undefined, {
        name: 'Test Course',
        holes: mockCourses[0].holes,
      });

      notFoundResponse(data, status);
    });
  });

  describe('update', () => {
    beforeEach(async () => {
      await createCourse(mockCourses[0]);
    });
    it('happy path name', async () => {
      const updatedCourse = {
        name: 'Test Course',
      };

      const { data, status } = await request(
        'patch',
        `/${COURSE_ID}`,
        undefined,
        updatedCourse
      );

      goodResponse(data, status);

      const [dbCourse] = await getCourses();
      expect(dbCourse).toEqual(data.data);
      expect(dbCourse).toEqual({
        ...EXPECTED_COURSE,
        ...updatedCourse,
      });
    });
    it('happy path holes', async () => {
      const updatedCourse = {
        holes: mockCourses[0].holes,
      };

      const { data, status } = await request(
        'patch',
        `/${COURSE_ID}`,
        undefined,
        updatedCourse
      );

      goodResponse(data, status);

      const [dbCourse] = await getCourses();
      expect(dbCourse).toEqual(data.data);
      expect(dbCourse).toEqual({
        ...EXPECTED_COURSE,
        ...updatedCourse,
      });
    });
    it('should not allow random keys', async () => {
      const updatedCourse = {
        script: 'malware',
      };

      const { data, status } = await request(
        'patch',
        `/${COURSE_ID}`,
        undefined,
        updatedCourse
      );

      goodResponse(data, status);

      expect(data.data).toEqual(EXPECTED_COURSE);
    });
    it('should throw 400 for bad id', async () => {
      const { data, status } = await request('put', '/badid', undefined, {});

      badRequestResponse(data, status);
    });
    it('should throw 404', async () => {
      const { data, status } = await request('patch', `/${BAD_ID}`, undefined, {
        name: 'test',
      });

      notFoundResponse(data, status);
    });
  });

  describe('delete', () => {
    beforeEach(async () => {
      await createCourse(mockCourses[0]);
    });

    it('happy path', async () => {
      const { data, status } = await request('delete', `/${COURSE_ID}`);

      goodResponse(data, status);

      expect(data.data).toEqual(EXPECTED_COURSE);
      const dbCourses = await getCourses();
      expect(dbCourses.length).toBe(0);
    });
    it('should throw 400 for bad id', async () => {
      const { data, status } = await request('delete', '/badid');
      badRequestResponse(data, status);
    });
    it('should throw 404', async () => {
      const { data, status } = await request('delete', `/${BAD_ID}`);
      notFoundResponse(data, status);
    });
  });
});
