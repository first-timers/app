const simple = require('simple-mock')
const {test} = require('tap')

const getCommit = require('../../lib/get-commit')

const api = {
  repos: {
    getCommit: () => {}
  }
}

test('get commit request succeeds', t => {
  const state = {
    api,
    debug: () => {},
    owner: 'owner',
    repo: 'repo',
    sha: 'sha'
  }

  simple.mock(api.repos, 'getCommit').resolveWith({
    data: {
      files: [{
        filename: 'filename',
        patch: 'patch',
        blob_url: 'blob_url'
      }],
      commit: {
        message: 'message'
      }
    }
  })

  getCommit(state)

  .then(() => {
    const getCommitArgs =
    api.repos.getCommit.lastCall.arg
    t.is(getCommitArgs.owner, 'owner')
    t.is(getCommitArgs.repo, 'repo')
    t.is(getCommitArgs.sha, 'sha')
    t.is(state.commit.message, 'message')
    t.is(state.commit.filename, 'filename')
    t.is(state.commit.patch, 'patch')
    t.is(state.commit.blobUrl, 'blob_url')

    simple.restore()
    t.end()
  })
})

test('get commit fails', t => {
  const state = {
    api,
    debug: () => {}
  }
  simple.mock(api.repos, 'getCommit').rejectWith({
    status: 'Not Found'
  })
  getCommit(state)

  .then(() => {
    t.error('should not resolve')
  })
  .catch((error) => {
    t.is(error.status, 'Not Found')

    simple.restore()
    t.end()
  })
})
