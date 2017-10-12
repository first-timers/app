module.exports = handleCreateEvent

const readFileSync = require('fs').readFileSync
const pathResolve = require('path').resolve
const base64 = require('js-base64').Base64

const getDebug = require('debug')

const getBranch = require('./get-branch')
const getCommit = require('./get-commit')
const createIssue = require('./create-issue')

const template = readFileSync(pathResolve(__dirname, '..', 'instructions.md'), 'utf8')

async function handleCreateEvent (context) {
  const {ref, ref_type: refType, repository} = context.payload
  const config = await context.config('first-timers.yml', {labels: ['first-timers-only', 'hacktoberfest'], repository: repository.name, template: template})
  const debug = getDebug(`probot:first-timers:${repository.full_name.toLowerCase()}`)
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
  const customTemplateUrl = config.template

  const state = {
    api: context.github,
    debug,
    owner: repository.owner.login,
    repo: repository.name,
    branch: ref,
    template: config.template,
    config: config,
    sha: null,
    repoDefaultBranch: repository.default_branch
  }

  getTemplateContent(state, customTemplateUrl)

  return getBranch(state)
    .then(getCommit.bind(null, state))
    .then(createIssue.bind(null, state))
    .catch((error) => {
      debug(error.toString())
    })
}

function getTemplateContent (state, path) {
  return state.api.repos.getContent({
    owner: state.owner,
    repo: state.repo,
    path: path
  })
  .then(function (result) {
    const content = base64.decode(result.data.content)
    state.template = content
  })
}
