module.exports = createIssue

function createIssue (state) {
  const {filename, patch, blobUrl} = state.commit
  const content = state.template
    .replace(/\$DIFF/, patch)
    .replace(/\$FILENAME/, filename)
    .replace(/\$BLOB_URL/, blobUrl)
    .replace(/\$REPO/, state.repo)

  state.debug('creating issue...')

  return state.api.issues.create({
    owner: state.owner,
    repo: state.repo,
    title: state.commit.message,
    body: content,
    labels: state.labels
  })

  .then((result) => {
    state.debug(`issue created: ${result.data.html_url}`)
    return result
  })
}
