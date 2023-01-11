const simple = require("simple-mock");
const { test } = require("tap");

const deleteBranch = require("../../lib/delete-branch");

const api = {
  git: {
    deleteRef: () => {},
  },
};

test("delete branch request succeeds", (t) => {
  const state = {
    api,
    debug: () => {},
    owner: "owner",
    branch: "branch",
    installRepo: "installRepo",
  };

  simple.mock(api.git, "deleteRef").resolveWith({
    meta: {
      status: "204 No Content",
    },
  });

  deleteBranch(state).then((response) => {
    t.equal(response.meta.status, "204 No Content");

    simple.restore();
    t.end();
  });
});

test("delete branch request fails", (t) => {
  const state = {
    api,
    debug: () => {},
    owner: "owner",
    branch: "branch",
    repo: null,
  };

  simple.mock(api.git, "deleteRef").rejectWith({
    code: 403,
  });

  deleteBranch(state).then((error) => {
    t.equal(error.code, 403);
  });

  simple.mock(api.git, "deleteRef").rejectWith({
    code: 404,
  });

  deleteBranch(state).then((error) => {
    t.equal(error.code, 404);
    simple.restore();
    t.end();
  });
});
