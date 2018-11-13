import express from 'express';
import RedisSetEvents from './redis.set-events';
import ComputeSum from './redis.compute-sum';

const app = express();
// RedisSetEvents();
ComputeSum(['A', 'B']);

app.listen(3000, () => console.log('Successfully started server'));