const { v4 } = require('uuid');

const loadConfig = require('./lib/config');
const Logger = require('./logger/logger');

config = global.config = loadConfig()
logger = global.logger = new Logger(config);

const { connect } = require('./db/connect');

const { startListener, startPollar } = require('./controller/channels');
const Redis = require('./db/redis_connect');

if (config.environment != 'test') {
  connect(config.mongo);
}

async function load() {
  await connectRedisDB();
  await connectPubsub();
  listen();
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
  startPollar();
}

function listen() {
  global.subscriber.subscribe(config.channel);
}

load();