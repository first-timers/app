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
    // 1) Make sure the issue was created
    t.is(response.data.html_url, 'html_url')
    // 2) Make sure it includes the patch, filename,etc
    t.is(createIssueArgs.body, 'test value1: patch value2: filename value3: blobUrl value4: repo')
    // 3) Make sure the issue was created on the right repo?
    t.is(createIssueArgs.repo, 'repo')
    // 4) Issue has the correct label?
    t.is(createIssueArgs.labels, 'labels')
    // 5) That its owner is correct
    t.is(createIssueArgs.owner, 'owner')

    simple.restore()
    t.end()
  })
})
