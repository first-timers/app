const simple = require("simple-mock");
const { test } = require("tap");

const createIssue = require("../../lib/create-issue");

const api = {
  issues: {
    create: () => {},
  },
};

test("create issue request succeeds", (t) => {
  const state = {
    api,
    debug: () => {},
    owner: "owner",
    branch: "branch",
    issueRepo: "issueRepo",
    installRepo: "installRepo",
    sha: "sha",
    labels: "label-1",
    commit: {
      message: "commit subject\n\ncommit body",
      patch: "patch",
      filename: "filename",
      branchUrl: "branchUrl",
    },
    template:
      "test value1: $DIFF value2: $FILENAME value3: $BRANCH_URL value4: $REPO value5: $ISSUE_NUMBER value6: $COMMIT_BODY",
  };

  simple.mock(api.issues, "create").resolveWith({
    data: {
      html_url: "html_url",
      number: 123,
    },
  });

  simple.mock(api.issues, "update").resolveWith({
    data: {
      body: "test value1: patch value2: filename value3: branchUrl value4: installRepo value5: 123",
    },
  });

  createIssue(state).then((response) => {
    const createIssueArgs = api.issues.create.lastCall.arg;
    const editIssueArgs = api.issues.update.lastCall.arg;
    t.is(response.data.html_url, "html_url");
    t.is(response.data.number, 123);
    t.is(createIssueArgs.title, "commit subject");
    t.is(
      createIssueArgs.body,
      "test value1: patch value2: filename value3: branchUrl value4: installRepo value5: $ISSUE_NUMBER value6: commit body"
    );
    t.is(createIssueArgs.repo, "issueRepo");
    t.is(createIssueArgs.labels, "label-1");
    t.is(createIssueArgs.owner, "owner");
    t.is(
      editIssueArgs.body,
      "test value1: patch value2: filename value3: branchUrl value4: installRepo value5: 123 value6: commit body"
    );

    simple.restore();
    t.end();
  });
});

test("create issue request fails", (t) => {
  const state = {
    api,
    debug: () => {},
    owner: "owner",
    branch: "branch",
    repo: null,
    sha: "sha",
    labels: ["label-1", "label-2"],
    commit: {
      message: "title",
      patch: "patch",
      filename: "filename",
      branchUrl: "branchUrl",
    },
    template:
      "test value1: $DIFF value2: $FILENAME value3: $BRANCH_URL value4: $REPO",
  };

  simple.mock(api.issues, "create").rejectWith({
    code: 404,
  });

  createIssue(state)
    .then(() => {
      t.fail("should not resolve");
    })

    .catch((error) => {
      t.is(error.code, 404);

      simple.restore();
      t.end();
    });
});
