const simple = require("simple-mock");
const { test } = require("tap");

const getCommit = require("../../lib/get-commit");

const api = {
  repos: {
    getCommit: () => {},
  },
};

test("get commit request succeeds", (t) => {
  const state = {
    api,
    debug: () => {},
    owner: "owner",
    installRepo: "installRepo",
    sha: "sha",
    repoDefaultBranch: "defaultBranch",
  };

  simple.mock(api.repos, "getCommit").resolveWith({
    data: {
      files: [
        {
          filename: "filename",
          patch: "patch",
          blob_url:
            "https://github.com/Techforchange/first-timers-test/blob/f00ecb1bbffe515500558568ae0b176d2a1defe8/docs/README.md",
        },
      ],
      commit: {
        message: "message",
      },
      author: {
        login: "username",
      },
    },
  });

  getCommit(state).then(() => {
    const getCommitArgs = api.repos.getCommit.lastCall.arg;
    t.is(getCommitArgs.owner, "owner");
    t.is(getCommitArgs.repo, "installRepo");
    t.is(getCommitArgs.ref, "sha");
    t.is(state.commit.message, "message");
    t.is(state.commit.filename, "filename");
    t.is(state.commit.patch, "patch");
    t.is(
      state.commit.branchUrl,
      "https://github.com/Techforchange/first-timers-test/blob/defaultBranch/docs/README.md"
    );
    t.is(state.commit.authorLogin, "username");

    simple.restore();
    t.end();
  });
});

test("get commit fails", (t) => {
  const state = {
    api,
    debug: () => {},
  };
  simple.mock(api.repos, "getCommit").rejectWith({
    code: 404,
  });
  getCommit(state)
    .then(() => {
      t.fail("should not resolve");
    })
    .catch((error) => {
      t.is(error.code, 404);

      simple.restore();
      t.end();
    });
});
