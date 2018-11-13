import Redis from 'ioredis';

const host = 'localhost';
const port = 6379;
const db = 0;

export default class RedisRepo {
  constructor() {
    this.redis = new Redis({port, host, db});
    this.redis.on('ready', () => {
      this.redis.config('SET', 'notify-keyspace-events', 'K$');
      console.log('set config!');
    });
  }

  get(key) {
    return this.redis.get(key);
  }

  set(key, value) {
    this.redis.set(key, value);
  }
}