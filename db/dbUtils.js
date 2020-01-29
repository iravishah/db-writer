const mongoose = require('mongoose');

require('../models/logs');

const Logs = mongoose.model('Logs');

const { wait } = require('../lib/utils');

async function createLog(data) {
  return await wait(Logs.create, Logs, data);
}

async function zadd(hash, instanceId) {
  return await wait(global.redisConn.zadd, global.redisConn, hash, 0, instanceId);
}

async function set(hash, key, data) {
  return await wait(global.redisConn.hset, global.redisConn, hash, key, data);
}

module.exports = {
  createLog,
  zadd,
  set
}