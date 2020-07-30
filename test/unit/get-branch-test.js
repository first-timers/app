const simple = require("simple-mock");
const { test } = require("tap");

const getBranch = require("../../lib/get-branch");

const api = {
  repos: {
    getBranch: () => {},
  },
};

test("get branch request succeeds", (t) => {
  const state = {
    api,
    debug: () => {},
    owner: "owner",
    installRepo: "installRepo",
    branch: "branch",
  };

  simple.mock(api.repos, "getBranch").resolveWith({
    data: {
      commit: {
        sha: "sha",
      },
    },
  });

  getBranch(state)
    .then(() => {
      const getBranchArgs = api.repos.getBranch.lastCall.arg;
      t.is(getBranchArgs.owner, "owner");
      t.is(getBranchArgs.repo, "installRepo");
      t.is(getBranchArgs.branch, "branch");
      t.is(state.sha, "sha");

      simple.restore();
      t.end();
    })

    .catch(t.error);
});

test("get branch test fails", (t) => {
  const state = {
    api,
    debug: () => {},
  };

  simple.mock(api.repos, "getBranch").rejectWith({
    code: 404,
  });

  getBranch(state)
    .then(() => {
      t.fail("should not resolve");
    })
    .catch((error) => {
      t.is(error.code, 404);

      simple.restore();
      t.end();
    });
});
