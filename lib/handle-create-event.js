module.exports = handleCreateEvent

const readFileSync = require('fs').readFileSync
const pathResolve = require('path').resolve

const getDebug = require('debug')

const getBranch = require('./get-branch')
const getCommit = require('./get-commit')
const createIssue = require('./create-issue')

const template = readFileSync(pathResolve(__dirname, '..', 'instructions.md'), 'utf8')

function handleCreateEvent (context) {
  const {ref, ref_type: refType, repository} = context.payload
  const debug = getDebug(`probot:first-timers-bot:${repository.full_name.toLowerCase()}`)
  debug(`webhook received for ${refType} "${ref}"`)

  // run only for newly created branches that start with "first-timers-"
  if (refType !== 'branch') {
    debug('ingoring: not a branch')
    return
  }
  if (!/^first-timers-/.test(ref)) {
    debug(`ignoring: "${ref}" does not match /^first-timers-/`)
    return
  }

  const state = {
    api: context.github,
    debug,
    owner: repository.owner.login,
    repo: repository.name,
    branch: ref,
    template,
    labels: ['first-timers-only', 'hacktoberfest'],
    sha: null,
    repoDefaultBranch: repository.default_branch
  }

  getBranch(state)
    .then(getCommit.bind(null, state))
    .then(createIssue.bind(null, state))
    .catch((error) => {
      debug(error.toString())
    })
}
