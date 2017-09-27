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
      ref_type: 'tag',
      repository: {
        full_name: 'hoodiehq/first-timers-bot'
      }
    }
  })

  t.pass('Ignores refType tag')

  simple.restore()
  t.end()
})

test('server create event with branch ref read-me-fix', t => {
  simple.mock(robotMock, 'on')

  server(robotMock)

  t.is(robotMock.on.lastCall.arg, 'create')
  const handleCreateEvent = robotMock.on.lastCall.args[1]
  t.is(typeof handleCreateEvent, 'function')

  handleCreateEvent({
    payload: {
      ref_type: 'branch',
      ref: 'read-me-fix',
      repository: {
        full_name: 'hoodiehq/first-timers-bot'
      }
    }
  })

  t.pass('Ignores ref that does not start with first-timers')
  simple.restore()
  t.end()
})

test('server create event with non-existing branch name', t => {
  t.plan(3)
  simple.mock(robotMock, 'on')

  server(robotMock)

  t.is(robotMock.on.lastCall.arg, 'create')
  const handleCreateEvent = robotMock.on.lastCall.args[1]
  t.is(typeof handleCreateEvent, 'function')

  const githubMock = nock('https://api.github.com', {encodedQueryParams: true})
    .get('/repos/hoodiehq/first-timers-bot/branches/first-timers-does-not-exist')
    .reply(404, {
      message: 'Branch not found',
      documentation_url: 'https://developer.github.com/v3/repos/#get-branch'
    })

  handleCreateEvent({
    github: github,
    payload: {
      ref_type: 'branch',
      ref: 'first-timers-does-not-exist',
      repository: {
        name: 'first-timers-bot',
        full_name: 'hoodiehq/first-timers-bot',
        owner: {
          login: 'hoodiehq'
        }
      }
    }
  })

  t.is(githubMock.pendingMocks()[0], undefined)

  simple.restore()
})
