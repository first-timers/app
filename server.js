const debug = require("debug")("probot:first-timers");

const handleCreateEvent = require("./lib/handle-create-event");

module.exports = function ({ app }) {
  debug('ready to receive "create" webhooks');
  app.on("create", handleCreateEvent);
};
