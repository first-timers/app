const simple = require('simple-mock')
const {test} = require('tap')

const getBranch = require('../../lib/get-branch')

const api = {
  repos: {
    getBranch: () => {}
  }
}

test('get branch request succeeds', t => {
  const state = {
    api,
    owner: 'owner',
    repo: 'repo',
    branch: 'branch'
  }

  simple.mock(api.repos, 'getBranch').resolveWith({
    data: {
      commit: {
        sha: 'sha'
      }
    }
  })

  getBranch(state)

  .then(() => {
    const getBranchArgs = api.repos.getBranch.lastCall.arg
    t.is(getBranchArgs.owner, 'owner')
    t.is(getBranchArgs.repo, 'repo')
    t.is(getBranchArgs.branch, 'branch')
    t.is(state.sha, 'sha')

    simple.restore()
    t.end()
  })

  .catch(t.error)
})
