module.exports = getBranch;

function getBranch(state) {
  state.debug(`getting branch "${state.branch}"`);
  return state.api.repos
    .getBranch({
      owner: state.owner,
      repo: state.installRepo,
      branch: state.branch,
    })

    .then(function (result) {
      state.sha = result.data.commit.sha;
      state.debug(
        `"${state.branch}" branch found, last commit’s sha: ${state.sha}`
      );
    });
}
