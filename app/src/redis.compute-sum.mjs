import Redis from 'ioredis';
import RedisRepo from './redis.repo';

const redisRepo = new RedisRepo();
const host = "localhost";
const port = 6379;
const db = 0;

export default function ComputeSum(keyArray) {
  Promise.all(keyArray.map((key) => {
    const subscriber = new Redis({ host, port, db });

    const chan = '__keyspace@0__:' + key;
    subscriber.subscribe(chan);
    console.log('subscribed to:', chan);

    subscriber.on('message', async (channel, message) => {
      console.log('CHANNEL:', channel);
      console.log('MESSAGE:', message);
      const [type, key] = channel.split(":");
      console.log("TYPE: ", type);
      console.log('KEY: ', key);
      const value = await redisRepo.get(key);
      console.log('VALUE: ', value);

      return value;
    });
  })).then((values) => {
    console.log('VALUES:', values);
    console.log('SUM:', values.reduce((a,b) => a + b, 0));
  });
}