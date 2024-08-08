const assert = require("assert");

const {
  goodResponse,
  notFoundResponse,
  badRequestResponse,
  convertJSON,
  requestFactory,
} = require("./helpers");
const { getCourses, createCourse } = require("./db");
const { mockCourses, MOCK_COURSE_ID } = require("./mocks/course");

const COURSE_ID = MOCK_COURSE_ID.toString();
const BAD_ID = "123412341234123412341234";

const EXPECTED_COURSE = convertJSON(mockCourses[0]);
const request = requestFactory("/api/courses");

describe("COURSE RESOURCE", () => {
  describe("getAll", () => {
    beforeEach(async () => {
      await Promise.all(mockCourses.map(createCourse));
    });
    it("happy path", async () => {
      const { data, status } = await request("get", "/");

      goodResponse(data, status);
      assert(Array.isArray(data.data), "Expected data to be an array");

      const dbCourses = await getCourses();
      assert.deepStrictEqual(
        data.data,
        dbCourses,
        "Expected to get the courses from the db",
      );
    });
  });

  describe("getOne", async () => {
    beforeEach(async () => {
      await createCourse(mockCourses[0]);
    });
    it("happy path", async () => {
      const { data, status } = await request("get", `/${COURSE_ID}`);
      const [dbCourse] = await getCourses();

      goodResponse(data, status);
      assert.deepStrictEqual(dbCourse, data.data, "Expected correct response");
    });
    it("should throw 400 for bad id", async () => {
      const { data, status } = await request("get", "/badid");
      badRequestResponse(data, status);
    });
    it("should throw 404", async () => {
      const { data, status } = await request("get", `/${BAD_ID}`);

      notFoundResponse(data, status);
    });
  });

  describe("create", () => {
    it("happy path", async () => {
      const newCourse = {
        name: "Test Course",
        holes: mockCourses[0].holes,
      };

      const { data, status } = await request("post", "/", newCourse);
      assert.strictEqual(status, 201, "Expected status 201");
      assert("data" in data, "Expected key of `data`");

      const [dbCourse] = await getCourses();
      assert.deepStrictEqual(
        data.data,
        dbCourse,
        "Expected update to be saved",
      );

      delete data.data._id;
      assert.deepStrictEqual(
        data.data,
        newCourse,
        "Expect correct data to be returnd",
      );
    });
    it("return 400 for bad input - no holes", async () => {
      const input = {
        name: "Test Course",
      };

      const { data, status } = await request("post", "", input);
      badRequestResponse(data, status);
    });
    it("return 400 for bad input - not enough holes", async () => {
      const input = {
        name: "Test",
        holes: [
          {
            par: 4,
            distance: 123,
          },
        ],
      };

      const { data, status } = await request("post", "", input);
      badRequestResponse(data, status);
    });
    it("return 400 for bad input - invalid par value 0", async () => {
      const input = {
        name: "Test",
        holes: [...mockCourses[0].holes],
      };
      input.holes[9] = { par: 0, distance: 123 };

      const { data, status } = await request("post", "", input);
      badRequestResponse(data, status);
    });
  });

  describe("replace", () => {
    beforeEach(async () => {
      await createCourse(mockCourses[0]);
    });
    it("happy path", async () => {
      const updatedCourse = {
        name: "Test Course",
        holes: mockCourses[0].holes,
      };

      const { data, status } = await request(
        "put",
        `/${COURSE_ID}`,
        updatedCourse,
      );
      goodResponse(data, status);

      const [dbCourse] = await getCourses();
      assert.deepStrictEqual(dbCourse, data.data, "Expected correct response");
      assert.deepStrictEqual(
        { ...updatedCourse, _id: COURSE_ID },
        data.data,
        "expected correct data to be saved",
      );
    });
    it("should throw 400 for bad id", async () => {
      const { data, status } = await request("put", "/badid", {
        name: "tee",
        holes: mockCourses[0].holes,
      });

      badRequestResponse(data, status);
    });
    it("should throw 400 - no keys", async () => {
      const { data, status } = await request("put", `/${COURSE_ID}`, {});

      badRequestResponse(data, status);
    });
    it("should throw 404", async () => {
      const { data, status } = await request("put", `/${BAD_ID}`, {
        name: "Test Course",
        holes: mockCourses[0].holes,
      });

      notFoundResponse(data, status);
    });
  });

  describe("update", () => {
    beforeEach(async () => {
      await createCourse(mockCourses[0]);
    });
    it("happy path name", async () => {
      const updatedCourse = {
        name: "Test Course",
      };

      const { data, status } = await request(
        "patch",
        `/${COURSE_ID}`,
        updatedCourse,
      );

      goodResponse(data, status);

      const [dbCourse] = await getCourses();
      assert.deepStrictEqual(dbCourse, data.data, "Expected correct response");
      assert.deepStrictEqual(dbCourse, {
        ...EXPECTED_COURSE,
        ...updatedCourse,
      });
    });
    it("happy path holes", async () => {
      const updatedCourse = {
        holes: mockCourses[0].holes,
      };

      const { data, status } = await request(
        "patch",
        `/${COURSE_ID}`,
        updatedCourse,
      );

      goodResponse(data, status);

      const [dbCourse] = await getCourses();
      assert.deepStrictEqual(dbCourse, data.data, "Expected correct response");
      assert.deepStrictEqual(dbCourse, {
        ...EXPECTED_COURSE,
        ...updatedCourse,
      });
    });
    it("should not allow random keys", async () => {
      const updatedCourse = {
        script: "malware",
      };

      const { data, status } = await request(
        "patch",
        `/${COURSE_ID}`,
        updatedCourse,
      );

      goodResponse(data, status);

      assert.deepStrictEqual(
        EXPECTED_COURSE,
        data.data,
        "Expected correct response",
      );
    });
    it("should throw 400 for bad id", async () => {
      const { data, status } = await request("patch", "/badid", {
        name: "testing",
      });

      badRequestResponse(data, status);
    });
    it("should throw 404", async () => {
      const { data, status } = await request("patch", `/${BAD_ID}`, {
        name: "test",
      });

      notFoundResponse(data, status);
    });
  });

  describe("delete", () => {
    beforeEach(async () => {
      await createCourse(mockCourses[0]);
    });

    it("happy path", async () => {
      const { data, status } = await request("delete", `/${COURSE_ID}`);

      goodResponse(data, status);

      assert.deepStrictEqual(
        EXPECTED_COURSE,
        data.data,
        "Expected correct response",
      );
    });
    it("should throw 400 for bad id", async () => {
      const { data, status } = await request("delete", "/badid");
      badRequestResponse(data, status);
    });
    it("should throw 404", async () => {
      const { data, status } = await request("delete", `/${BAD_ID}`);
      notFoundResponse(data, status);
    });
  });
});
