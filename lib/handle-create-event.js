module.exports = handleCreateEvent;

const readFileSync = require("fs").readFileSync;
const pathResolve = require("path").resolve;

const getBranch = require("./get-branch");
const getCommit = require("./get-commit");
const createIssue = require("./create-issue");
const getTemplateContent = require("./get-template-content");
const deleteBranch = require("./delete-branch");

const template = readFileSync(
  pathResolve(__dirname, "..", "instructions.md"),
  "utf8"
);

/**
 * @param {import('probot').Context} context
 */
async function handleCreateEvent(context) {
  const { ref, ref_type: refType, repository } = context.payload;
  const config = await context.config("first-timers.yml", {
    labels: ["first-timers-only"],
    repository: repository.name,
  });

  const debug = context.log.debug.bind(context.log);
  debug(`webhook received for ${refType} "${ref}"`);

  // run only for newly created branches that start with "first-timers-"
  if (refType !== "branch") {
    debug("ignoring: not a branch");
    return;
  }
  if (!/^first-timers-/.test(ref)) {
    debug(`ignoring: "${ref}" does not match /^first-timers-/`);
    return;
  }

  // remove duplicate labels, just in case
  const labels = [...new Set(config.labels)];

  const state = {
    api: context.octokit,
    debug,
    owner: repository.owner.login,
    installRepo: repository.name,
    branch: ref,
    template,
    labels,
    sha: null,
    repoDefaultBranch: repository.default_branch,
    customTemplate: config.template,
    issueRepo: config.repository,
  };

  return getBranch(state)
    .then(getTemplateContent.bind(null, state))
    .then(getCommit.bind(null, state))
    .then(createIssue.bind(null, state))
    .then(deleteBranch.bind(null, state))
    .catch((error) => {
      console.error(error);
      throw error;
    });
}
