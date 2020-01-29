const { v4 } = require('uuid');

const loadConfig = require('./lib/config');
const Logger = require('./logger/logger');

config = global.config = loadConfig()
logger = global.logger = new Logger(config);

const { connect } = require('./db/connect');

const { startListener } = require('./controller/channels');
const { zadd, set } = require('./db/dbUtils');
const Redis = require('./db/redis_connect');

if (config.environment != 'test') {
  connect(config.mongo);
}

async function load() {
  await connectRedisDB();
  await connectPubsub();
  listen();
  generateUuid();
}

async function connectRedisDB() {
  const redis = new Redis(config.redis);
  global.redisConn = await redis.connect();
}

async function connectPubsub() {
  const pubsubConf = {
    host: config.redis.host,
    port: config.redis.port
  }

  const subscriber = new Redis(pubsubConf);
  global.subscriber = await subscriber.connectPubsub();
  startListener();
}

function listen() {
  global.subscriber.subscribe(config.channel);
}

function generateUuid() {
  global.instanceId = v4();
  zadd(config.intHash, global.instanceId);

  setInterval(() => {
    const date = Date.now();
    set(config.hbHash, global.instanceId, date);
  }, config.heartbeat.interval)
}

load();