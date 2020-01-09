module.exports = createIssue

function createIssue (state) {
  const { filename, patch, branchUrl, message, authorLogin } = state.commit
  const content = state.template
    .replace(/\$DIFF/, patch)
    .replace(/\$FILENAME/, filename)
    .replace(/\$BRANCH_URL/, branchUrl)
    .replace(/\$REPO/, state.installRepo)
    .replace(/\$AUTHOR/, `@${authorLogin}`)

  state.debug('creating issue...')

  return state.api.issues.create({
    owner: state.owner,
    repo: state.issueRepo,
    title: message.split('\n\n')[0],
    body: content,
    labels: state.labels
  })

    .then(async (result) => {
      const newContent = content.replace(/\$ISSUE_NUMBER/, result.data.number)

      await state.api.issues.update({
        owner: state.owner,
        repo: state.issueRepo,
        issue_number: result.data.number,
        body: newContent
      })

      state.debug(`issue created: ${result.data.html_url}`)
      return result
    })
}
