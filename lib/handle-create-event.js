module.exports = handleCreateEvent

const readFileSync = require('fs').readFileSync
const pathResolve = require('path').resolve

const template = readFileSync(pathResolve(__dirname, '..', 'instructions.md'), 'utf8')

const getBranch = require('./get-branch')
const getCommit = require('./get-commit')
const createIssue = require('./create-issue')

function handleCreateEvent (context) {
  const {ref, refType, repository} = context.payload

  // run only for newly created branches that start with "first-timers-"
  if (refType !== 'branch') return
  if (!/^first-timers-/.test(ref)) return

  const state = {
    api: context.github,
    owner: repository.owner.login,
    repo: repository.name,
    branch: ref,
    template,
    labels: ['test-newbie'],
    sha: null
  }

  getBranch(state)
    .then(getCommit.bind(null, state))
    .then(createIssue.bind(null, state))
    .catch(console.log.bind(console))
}
