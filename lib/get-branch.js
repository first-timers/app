module.exports = getBranch

function getBranch (state) {
  return state.api.repos.getBranch({
    owner: state.owner,
    repo: state.repo,
    branch: state.branch
  })

  .then(function (result) {
    state.sha = result.data.commit.sha
  })
}
