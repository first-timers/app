const { Octokit } = require("@octokit/rest");
const nock = require("nock");
const simple = require("simple-mock");
const { test } = require("tap");

const octokit = new Octokit();
const server = require("../../server");
const robotMock = {
  log: {
    debug: () => {},
  },
  on: () => {},
};

nock.disableNetConnect();

test("server create event with reftype = tag", async (t) => {
  simple.mock(robotMock, "on");

  server(robotMock);

  t.equal(robotMock.on.lastCall.arg, "create");
  const handleCreateEvent = robotMock.on.lastCall.args[1];
  t.equal(typeof handleCreateEvent, "function");

  const configure = function (yaml) {
    return { repository: "name", labels: ["label"] };
  };

  await handleCreateEvent({
    log: {
      debug() {},
    },
    payload: {
      ref_type: "tag",
      repository: {
        full_name: "first-timers/app",
      },
    },
    config: configure,
  });

  t.pass("Ignores refType tag");

  simple.restore();
  t.end();
});

test("server create event with branch ref read-me-fix", async (t) => {
  simple.mock(robotMock, "on");

  server(robotMock);

  t.equal(robotMock.on.lastCall.arg, "create");
  const handleCreateEvent = robotMock.on.lastCall.args[1];
  t.equal(typeof handleCreateEvent, "function");

  const configure = function (yaml) {
    return { repository: "name", labels: ["label"] };
  };

  await handleCreateEvent({
    log: {
      debug() {},
    },
    payload: {
      ref_type: "branch",
      ref: "read-me-fix",
      repository: {
        full_name: "first-timers/app",
      },
    },
    config: configure,
  });

  t.pass("Ignores ref that does not start with first-timers");
  simple.restore();
  t.end();
});

test("server create event with non-existing branch name", async (t) => {
  t.plan(5);
  simple.mock(robotMock, "on");
  simple.mock(console, "error").callFn(() => {});

  server(robotMock);

  t.equal(robotMock.on.lastCall.arg, "create");
  const handleCreateEvent = robotMock.on.lastCall.args[1];
  t.equal(typeof handleCreateEvent, "function");

  const githubMock = nock("https://api.github.com", {
    encodedQueryParams: true,
  })
    .get("/repos/first-timers/app/branches/first-timers-does-not-exist")
    .reply(404, {
      message: "Branch not found",
      documentation_url: "https://developer.github.com/v3/repos/#get-branch",
    });

  const configure = function (yaml) {
    return { repository: "name", labels: ["label"] };
  };

  await handleCreateEvent({
    log: {
      debug() {},
    },
    octokit,
    payload: {
      ref_type: "branch",
      ref: "first-timers-does-not-exist",
      repository: {
        name: "app",
        full_name: "first-timers/app",
        owner: {
          login: "first-timers",
        },
      },
    },
    config: configure,
  }).catch((error) => {
    t.equal(error.message, "Branch not found");
  });

  t.equal(githubMock.pendingMocks()[0], undefined);
  t.equal(console.error.callCount, 1);

  simple.restore();
  t.end();
});
