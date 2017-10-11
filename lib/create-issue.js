module.exports = createIssue

function createIssue (state) {
  const {filename, patch, branchUrl} = state.commit
  const content = state.template
    .replace(/\$DIFF/, patch)
    .replace(/\$FILENAME/, filename)
    .replace(/\$BRANCH_URL/, branchUrl)
    .replace(/\$REPO/, state.repo)

  state.debug('creating issue...')

  return state.api.issues.create({
    owner: state.owner,
    repo: state.config.repository,
    title: state.commit.message,
    body: content,
    labels: state.config.labels
  })

  .then((result) => {
    state.debug(`issue created: ${result.data.html_url}`)
    return result
  })
}
