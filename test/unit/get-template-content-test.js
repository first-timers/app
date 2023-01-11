const simple = require("simple-mock");
const { test } = require("tap");

const getTemplateContent = require("../../lib/get-template-content");

const api = {
  repos: {
    getContent: () => {},
  },
};

test("gets template content if URL exists", (t) => {
  const state = {
    api,
    debug: () => {},
    owner: "owner",
    issueRepo: "issue_repo",
    customTemplate: "template_path",
  };

  simple.mock(api.repos, "getContent").resolveWith({
    data: {
      content: "Y29udGVudA==",
    },
  });

  getTemplateContent(state).then(() => {
    const getTemplateContentArgs = api.repos.getContent.lastCall.arg;
    t.equal(getTemplateContentArgs.owner, "owner");
    t.equal(getTemplateContentArgs.repo, "issue_repo");
    t.equal(getTemplateContentArgs.path, "template_path");
    t.equal(state.template, "content");

    simple.restore();
    t.end();
  });
});

test("gets template from different repository", (t) => {
  const state = {
    api,
    debug: () => {},
    owner: "owner",
    issueRepo: "issue_repo",
    customTemplate: "other_repo:path/to/template.md",
  };

  simple.mock(api.repos, "getContent").resolveWith({
    data: {
      content: "Y29udGVudA==",
    },
  });

  getTemplateContent(state).then(() => {
    const getTemplateContentArgs = api.repos.getContent.lastCall.arg;
    t.equal(getTemplateContentArgs.owner, "owner");
    t.equal(getTemplateContentArgs.repo, "other_repo");
    t.equal(getTemplateContentArgs.path, "path/to/template.md");
    simple.restore();
    t.end();
  });
});

test("does not get content if URL does not exist", (t) => {
  const state = {
    api,
    debug: () => {},
    owner: "owner",
    issueRepo: "issue_repo",
    customTemplate: null,
  };

  getTemplateContent(state);
  t.pass("Ignores custom template");
  simple.restore();
  t.end();
});
