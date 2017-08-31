const readFileSync = require('fs').readFileSync
const template = readFileSync('./instructions.md', 'utf8')

module.exports = function (robot) {
  robot.on('create', context => {
    const {ref, refType, repository} = context.payload
    // run only for newly created branches that start with "first-timers-"
    if (refType !== 'branch') return
    if (!/^first-timers-/.test(ref)) return

    const api = context.github
    const owner = repository.owner.login
    const repo = repository.name

    api.repos.getBranch({
      owner: owner,
      repo: repo,
      branch: ref
    })

    .then(function (result) {
      const sha = result.data.commit.sha
      return api.repos.getCommit({
        owner: owner,
        repo: repo,
        sha: sha
      })
    })

    .then(function (result) {
      const commitMessage = result.data.commit.message
      const {filename, patch, blob_url} = result.data.files[0]
      const content = template.replace(/\$DIFF/, patch).replace(/\$FILENAME/, filename).replace(/\$BLOB_URL/, blob_url).replace(/\$REPO/, repo)

      return api.issues.create({
        owner: owner,
        repo: repo,
        title: commitMessage,
        body: content,
        labels: ['test-newbie']
      })
    })

    .catch(console.log.bind(console))
  })
}
