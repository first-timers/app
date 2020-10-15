module.exports = getTemplateContent;

function getTemplateContent(state) {
  if (!state.customTemplateUrl) {
    return;
  }
  return state.api.repos
    .getContent({
      // this needs to be fixed for repos where the custom template is not on the same repo as the yml file
      owner: state.owner,
      repo: state.issueRepo,
      path: state.customTemplateUrl,
    })
    .then(function (result) {
      const content = Buffer.from(result.data.content, "base64").toString();
      state.template = content;
    });
}
