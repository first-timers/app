module.exports = getCommit

function getCommit (state) {
  state.debug(`getting commit "${state.sha}"`)

  return state.api.repos.getCommit({
    owner: state.owner,
    repo: state.installRepo,
    sha: state.sha
  })

  .then(function (result) {
    const {filename, patch, blob_url} = result.data.files[0]
    var branchUrl = blob_url.replace(/(?:blob)(.+)(?=\/)/g, 'blob/' + state.repoDefaultBranch)

    state.commit = {
      message: result.data.commit.message,
      filename,
      patch,
      branchUrl: branchUrl
    }

    state.debug(`found commit "${state.commit.message}". Changed file "${filename}" Found branchUrl "${state.commit.branchUrl}"`)
  })
}
