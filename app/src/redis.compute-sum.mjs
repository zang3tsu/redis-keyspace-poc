import Redis from 'ioredis';
import RedisRepo from './redis.repo';

const redisRepo = new RedisRepo();
const host = 'localhost';
const port = 6379;
const db = 0;

export default function ComputeSum(keyArray) {

  const subscriber = new Redis({host, port, db});
  const chan = '__keyspace@0__:*';
  subscriber.psubscribe(chan);
  console.log('subscribed to:', chan);

  Promise.all(keyArray.map((key) => {
    return new Promise((resolve, reject) => {
      subscriber.on('pmessage', async (channel, message) => {
        console.log('CHANNEL:', channel);
        console.log('MESSAGE:', message);
        const [type, targetKey] = message.split(':');
        console.log('TYPE: ', type);
        console.log('KEY: ', key);
        console.log('targetKey: ', targetKey);
        if (key === targetKey) {
          const value = await redisRepo.get(key);
          console.log('VALUE: ', value);
          resolve(parseInt(value));
        }
      });
    });
  })).then((values) => {
    console.log('VALUES:', values);
    console.log('SUM:', values.reduce((a, b) => a + b, 0));
  });
}