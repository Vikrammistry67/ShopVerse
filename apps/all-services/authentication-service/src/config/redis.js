import Redis from 'ioredis';
import _config from './config.js';

const _redis = new Redis({
    host: _config.REDIS_HOST,
    port: _config.REDIS_PORT,
    username: _config.REDIS_USERNAME || "default",
    password: _config.REDIS_PASSWORD,
});

_redis.on('connect', () => {
    console.log('Redis connected Successfully')
});


_redis.on("error", (err) => {
    console.error("Redis connection failed", err);
});


export default _redis;