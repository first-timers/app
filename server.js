const handleCreateEvent = require('./lib/handle-create-event')

module.exports = function (robot) {
  robot.on('create', handleCreateEvent)
}
