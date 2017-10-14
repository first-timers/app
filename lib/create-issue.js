module.exports = createIssue

function createIssue (state) {
  const {filename, patch, branchUrl} = state.commit
  const content = state.template
    .replace(/\$DIFF/, patch)
    .replace(/\$FILENAME/, filename)
    .replace(/\$BRANCH_URL/, branchUrl)
    .replace(/\$REPO/, state.installRepo)

  state.debug('creating issue...')

  return state.api.issues.create({
    owner: state.owner,
    repo: state.issueRepo,
    title: state.commit.message,
    body: content,
    labels: state.labels
  })

  .then((result) => {
    state.debug(`issue created: ${result.data.html_url}`)
    return result
  })
}
