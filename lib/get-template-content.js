module.exports = getTemplateContent;

function getTemplateContent(state) {
  if (!state.customTemplate) {
    return;
  }

  const owner = state.owner;
  const [repo, path] = /:/.test(state.customTemplate)
    ? state.customTemplate.split(":")
    : [state.issueRepo, state.customTemplate];

  return state.api.repos
    .getContent({ owner, repo, path })
    .then(function (result) {
      const content = Buffer.from(result.data.content, "base64").toString();
      state.template = content;
    });
}
