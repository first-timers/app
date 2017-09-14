const simple = require('simple-mock')
const {test} = require('tap')

const createIssue = require('../../lib/create-issue')

const api = {
  issues: {
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
    labels: 'labels',
    commit: {
      message: 'title',
      patch: 'patch',
      filename: 'filename',
      blobUrl: 'blobUrl'
    },
    template: 'test value1: $DIFF value2: $FILENAME value3: $BLOB_URL value4: $REPO'
  }

  simple.mock(api.issues, 'create').resolveWith({
    data: {
      html_url: 'html_url'
    }
  })

  createIssue(state)

  .then(() => {
    const content = state.template
    const createIssueArgs = api.issues.create.lastCall.arg
    t.is(createIssueArgs.owner, 'owner')
    t.is(createIssueArgs.repo, 'repo')
    t.is(content, 'test value1: patch, value2: filename, value3: blobUrl, value4: repo body')
    t.is(state.labels, 'labels')

    simple.restore()
    t.end()
  })
})
