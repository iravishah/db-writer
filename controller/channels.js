const _ = require('lodash');

const m = require('../responses/responses.json');

const { createLog } = require('../db/dbUtils');

function startListener() {
  global.subscriber.on('message', (channel, message) => {
    if (!message) {
      return;
    }
    if (typeof message === 'string') {
      try {
        message = JSON.parse(message);
      } catch (e) { }
    }
    if (message.instanceId === global.instanceId) {
      const data = {
        message: JSON.stringify(message.data)
      };
      createLog(data);
    }
  });
}

module.exports = {
  startListener
}