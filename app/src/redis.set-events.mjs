import PubSub from './pubsub';
import RedisRepo from './redis.repo';

const redisRepo = new RedisRepo();

export default function RedisSetEvents() {
  PubSub.subscribe('__keyspace@0__:*');
  console.log('subscribed!');
  PubSub.on('pmessage', async (channel, message) => {
    console.log('new message!');
    // Handle event
    const [type, key] = message.split(":");
    console.log("TYPE: ", type);
    console.log('KEY: ', key);
    const value = await redisRepo.get(key);
    console.log('VALUE: ', value);
  });
}

