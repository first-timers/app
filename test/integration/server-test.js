const GitHubApi = require('github')
const nock = require('nock')
const simple = require('simple-mock')
const {test} = require('tap')

const github = new GitHubApi()
const server = require('../../server')
const robotMock = {
  on: () => {}
}

nock.disableNetConnect()

test('server create event with reftype = tag', t => {
  simple.mock(robotMock, 'on')

  server(robotMock)

  t.is(robotMock.on.lastCall.arg, 'create')
  const handleCreateEvent = robotMock.on.lastCall.args[1]
  t.is(typeof handleCreateEvent, 'function')

  handleCreateEvent({
    payload: {
      refType: 'tag'
    }
  })

  t.pass('Ignores refType tag')

  simple.restore()
  t.end()
})

test('server create event with non-existing branch name', t => {
  t.plan(4)
  simple.mock(robotMock, 'on')

  server(robotMock)

  t.is(robotMock.on.lastCall.arg, 'create')
  const handleCreateEvent = robotMock.on.lastCall.args[1]
  t.is(typeof handleCreateEvent, 'function')

  const githubMock = nock('https://api.github.com', {encodedQueryParams: true})
    .get('/repos/hoodiehq/first-timers-only-bot/branches/first-timers-does-not-exist')
    .reply(404, {
      message: 'Branch not found',
      documentation_url: 'https://developer.github.com/v3/repos/#get-branch'
    })

  simple.mock(console, 'log').callFn((error) => {
    t.is(error.code, 404)
    t.is(githubMock.pendingMocks()[0], undefined)
  })

  handleCreateEvent({
    github: github,
    payload: {
      refType: 'branch',
      ref: 'first-timers-does-not-exist',
      repository: {
        name: 'first-timers-only-bot',
        owner: {
          login: 'hoodiehq'
        }
      }
    }
  })

  simple.restore()
})
