const handleCreateEvent = require("./lib/handle-create-event");

/**
 * @param {import('probot').Probot} app
 */
module.exports = function (app) {
  app.log.debug('ready to receive "create" webhooks');
  app.on("create", handleCreateEvent);
};
