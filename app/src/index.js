import express from "express";
import RedisSetEvents from "./redis.set-events"

const app = express();
RedisSetEvents();

app.listen(3000, () => console.log("Successfully started server"));