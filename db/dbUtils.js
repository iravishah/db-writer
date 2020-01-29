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

async function spop(key, value) {
  return await wait(global.redisConn.spop, global.redisConn, key, value);
}

async function sadd(key, value) {
  return await wait(global.redisConn.sadd, global.redisConn, key, value);
}

module.exports = {
  createLog,
  zadd,
  set,
  spop,
  sadd
}