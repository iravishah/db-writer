const _ = require('lodash');

const m = require('../responses/responses.json');

const { createLog, spop, sadd } = require('../db/dbUtils');

function startListener() {
  global.subscriber.on('message', (channel, message) => {
    if (!message) {
      return;
    }
    sadd(config.writerMsg, message);
  });
}

function startPollar() {
  setInterval(async () => {
    const [e, message] = await spop(config.writerMsg, 1);
    if (e) {
      return e;
    }
    if (message && message.length) {
      callback(message[0]);
    }
  }, 1000);
}

function callback(message) {
  const data = {
    message: message
  };
  createLog(data);
}

module.exports = {
  startListener,
  startPollar
}