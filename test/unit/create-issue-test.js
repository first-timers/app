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

  .then((response) => {
    const createIssueArgs = api.issues.create.lastCall.arg
    t.is(response.data.html_url, 'html_url')
    t.is(createIssueArgs.body, 'test value1: patch value2: filename value3: blobUrl value4: repo')
    t.is(createIssueArgs.repo, 'repo')
    t.is(createIssueArgs.labels, 'labels')
    t.is(createIssueArgs.owner, 'owner')

    simple.restore()
    t.end()
  })
})

test('create issue request fails', t => {
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

  simple.mock(api.issues, 'create').rejectWith({
    code: 404
  })

  createIssue(state)

  .then(() => {
    t.fail('should not resolve')
  })

  .catch((error) => {
    t.is(error.code, 404)

    simple.restore()
    t.end()
  })
})
