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
    t.equal(getCommitArgs.owner, "owner");
    t.equal(getCommitArgs.repo, "installRepo");
    t.equal(getCommitArgs.ref, "sha");
    t.equal(state.commit.message, "message");
    t.equal(state.commit.filename, "filename");
    t.equal(state.commit.patch, "patch");
    t.equal(
      state.commit.branchUrl,
      "https://github.com/Techforchange/first-timers-test/blob/defaultBranch/docs/README.md"
    );
    t.equal(state.commit.authorLogin, "username");

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
      t.equal(error.code, 404);

      simple.restore();
      t.end();
    });
});
