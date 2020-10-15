module.exports = deleteBranch;

function deleteBranch(state) {
  return state.api.git
    .deleteRef({
      owner: state.owner,
      repo: state.installRepo,
      ref: "heads/" + state.branch,
    })

    .then((result) => {
      state.debug(`branch deleted: heads/${state.branch}`);
      return result;
    })
    .catch((err) => {
      if (err.code === 403)
        state.debug(
          `could not delete "${state.branch}" branch, lacking permission for owner "${state.owner}"`
        );
      else state.debug(err.toString());
      return err;
    });
}
