const assert = require("assert");

const {
  goodResponse,
  notFoundResponse,
  badRequestResponse,
  convertJSON,
  requestFactory,
} = require("./helpers");
const { createRound, getRounds, getRoundsRaw, createCourse } = require("./db");
const { mockRounds, MOCK_ROUND_ID } = require("./mocks/round");
const { mockCourses, MOCK_COURSE_ID } = require("./mocks/course");

const ROUND_ID = MOCK_ROUND_ID.toString();
const COURSE_ID = MOCK_COURSE_ID.toString();
const BAD_ID = "123412341234123412341234";

const EXPECTED_ROUND = convertJSON({
  ...mockRounds[0],
  course: mockCourses[0],
});
const request = requestFactory("/api/rounds");

describe("ROUND RESOURCE", () => {
  describe("getAll", () => {
    beforeEach(async () => {
      await createCourse(mockCourses[0]);
      await Promise.all(mockRounds.map(createRound));
    });
    it("happy path", async () => {
      const { data, status } = await request("get", "/");

      goodResponse(data, status);
      assert(Array.isArray(data.data), "Expected data to be an array");

      const dbRounds = await getRounds();
      assert.deepStrictEqual(
        data.data,
        dbRounds,
        "Expected to get the rounds from the db",
      );
    });
  });

  describe("getOne", async () => {
    beforeEach(async () => {
      await createCourse(mockCourses[0]);
      await createRound(mockRounds[0]);
    });
    it("happy path", async () => {
      const { data, status } = await request("get", `/${ROUND_ID}`);
      const [dbRound] = await getRounds();

      goodResponse(data, status);
      assert.deepStrictEqual(dbRound, data.data, "Expected correct response");
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
      const newRound = {
        username: "Test",
        scores: [...mockRounds[0].scores],
        course: COURSE_ID,
      };

      const { data, status } = await request("post", "/", newRound);
      assert.strictEqual(status, 201, "Expected status 201");
      assert("data" in data, "Expected key of `data`");

      const [dbRound] = await getRoundsRaw();
      assert.deepStrictEqual(dbRound, data.data, "Expected update to be saved");

      delete data.data._id;
      assert.deepStrictEqual(
        newRound,
        data.data,
        "Expect correct data to be returnd",
      );
    });
    it("should throw 400", async () => {
      const { data, status } = await request("post", "/", {});

      badRequestResponse(data, status);
    });
    it("should throw 400 for invalid array scores", async () => {
      const { data, status } = await request("post", "/", {
        username: "Test",
        scores: [],
      });

      badRequestResponse(data, status);
    });
  });

  describe("replace", () => {
    beforeEach(async () => {
      await createCourse(mockCourses[0]);
      await createRound(mockRounds[0]);
    });
    it("happy path", async () => {
      const updatedRound = {
        username: "Update",
        scores: mockRounds[0].scores,
        course: COURSE_ID,
      };

      const { data, status } = await request(
        "put",
        `/${ROUND_ID}`,
        updatedRound,
      );
      goodResponse(data, status);

      const [dbRound] = await getRounds();
      assert.deepStrictEqual(dbRound, data.data, "Expected correct response");
      assert.deepStrictEqual(
        { ...updatedRound, course: EXPECTED_ROUND.course, _id: ROUND_ID },
        data.data,
        "expected correct data to be saved",
      );
    });
    it("should throw 400", async () => {
      const { data, status } = await request("put", `/${ROUND_ID}`, {});

      badRequestResponse(data, status);
    });
    it("should throw 400 for bad id", async () => {
      const { data, status } = await request("put", "/badid", {
        username: "Update",
        scores: [...mockRounds[0].scores],
        course: COURSE_ID,
      });
      badRequestResponse(data, status);
    });
    it("should throw 404", async () => {
      const { data, status } = await request("put", `/${BAD_ID}`, {
        username: "Update",
        scores: [...mockRounds[0].scores],
        course: COURSE_ID,
      });

      notFoundResponse(data, status);
    });
  });

  describe("update", () => {
    beforeEach(async () => {
      await createCourse(mockCourses[0]);
      await createRound(mockRounds[0]);
    });
    it("happy path name", async () => {
      const updatedRound = {
        username: "Edit",
      };

      const { data, status } = await request(
        "patch",
        `/${ROUND_ID}`,
        updatedRound,
      );

      goodResponse(data, status);

      const [dbRound] = await getRounds();
      assert.deepStrictEqual(dbRound, data.data, "Expected correct response");
      assert.deepStrictEqual(dbRound, { ...EXPECTED_ROUND, username: "Edit" });
    });
    it("happy path scores", async () => {
      const updatedRound = {
        scores: [...mockRounds[0].scores],
      };

      const { data, status } = await request(
        "patch",
        `/${ROUND_ID}`,
        updatedRound,
      );

      goodResponse(data, status);

      const [dbRound] = await getRounds();
      assert.deepStrictEqual(dbRound, data.data, "Expected correct response");
      assert.deepStrictEqual(dbRound, { ...EXPECTED_ROUND, ...updatedRound });
    });
    it("should not allow random keys", async () => {
      const updatedRound = {
        script: "malware",
      };

      const { data, status } = await request(
        "patch",
        `/${ROUND_ID}`,
        updatedRound,
      );

      goodResponse(data, status);

      assert.deepStrictEqual(
        EXPECTED_ROUND,
        data.data,
        "Expected correct response",
      );
    });
    it("should throw 400 for bad id", async () => {
      const { data, status } = await request("patch", "/badid", {
        username: "test",
      });
      badRequestResponse(data, status);
    });
    it("should throw 404", async () => {
      const { data, status } = await request("patch", `/${BAD_ID}`, {
        username: "test",
      });

      notFoundResponse(data, status);
    });
  });

  describe("delete", () => {
    beforeEach(async () => {
      await createCourse(mockCourses[0]);
      await createRound(mockRounds[0]);
    });

    it("happy path", async () => {
      const { data, status } = await request("delete", `/${ROUND_ID}`);

      goodResponse(data, status);

      assert.deepStrictEqual(
        EXPECTED_ROUND,
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
