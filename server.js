const debug = require('debug')('probot:first-timers-bot')

const handleCreateEvent = require('./lib/handle-create-event')

module.exports = function (robot) {
  debug(`ready to receive "create" webhooks`)
  robot.on('create', handleCreateEvent)
}
