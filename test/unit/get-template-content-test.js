const simple = require('simple-mock')
const { test } = require('tap')

const getTemplateContent = require('../../lib/get-template-content')

const api = {
  repos: {
    getContent: () => {}
  }
}

test('gets template content if URL exists', t => {
  const state = {
    api,
    debug: () => {},
    owner: 'owner',
    issueRepo: 'issueRepo',
    customTemplateUrl: 'custom_url'
  }

  simple.mock(api.repos, 'getContent').resolveWith({
    data: {
      content: 'Y29udGVudA=='
    }
  })

  getTemplateContent(state)

    .then(() => {
      const getTemplateContentArgs = api.repos.getContent.lastCall.arg
      t.is(getTemplateContentArgs.owner, 'owner')
      t.is(getTemplateContentArgs.repo, 'issueRepo')
      t.is(getTemplateContentArgs.path, 'custom_url')
      t.is(state.template, 'content')

      simple.restore()
      t.end()
    })
})

test('does not get content if URL does not exist', t => {
  const state = {
    api,
    debug: () => {},
    owner: 'owner',
    issueRepo: 'issueRepo',
    customTemplateUrl: null
  }

  getTemplateContent(state)
  t.pass('Ignores custom template')
  simple.restore()
  t.end()
})
