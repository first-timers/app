const simple = require('simple-mock')
const {test} = require('tap')

const createIssue = require('../../lib/create-issue')

const api = {
  repos: {
    create: () => {}
  }
}

test('create issue request succeeds', t => {
  const state = {
    api,
    debug: () => {},
    owner: 'owner',
    repo: 'repo',
    branch: 'branch',
    sha: 'sha',
    commit: {
      message: 'message',
      patch: 'patch',
      filename: 'filename',
      blobUrl: 'blobUrl'
    },
    template: '`test value1: $DIFF, value2: $FILENAME, value3: $BLOB_URL, value4: $REPO`'
  }

  simple.mock(api.repos, 'createIssue').resolveWith({
    data: {
      html_url: 'html_url',
      commit: {
        filename: 'filename',
        patch: 'patch',
        blobUrl: 'blobUrl'
      }
    }
  })

  createIssue(state)

  .then(() => {
    const content = state.template
    const createIssueArgs = api.repos.createIssue.lastCall.arg
    t.is(createIssueArgs.owner, 'owner')
    t.is(createIssueArgs.repo, 'repo')
    t.is(state.commit.message, 'title')
    t.is(content, 'body')
    t.is(state.labels, 'labels')

    simple.restore()
    t.end()
  })
})
