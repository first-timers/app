module.exports = createIssue

function createIssue (state) {
  const {filename, patch, blobUrl} = state.commit
  const content = state.template
    .replace(/\$DIFF/, patch)
    .replace(/\$FILENAME/, filename)
    .replace(/\$BLOB_URL/, blobUrl)
    .replace(/\$REPO/, state.repo)

  return state.api.issues.create({
    owner: state.owner,
    repo: state.repo,
    title: state.commit.message,
    body: content,
    labels: state.labels
  })
}
