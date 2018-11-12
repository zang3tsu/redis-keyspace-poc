import PubSub from "./pubsub";

export default function RedisSetEvents() {
  PubSub.subscribe("__keyevent@0__:set");
  PubSub.on("message", async (channel, message) => {
    // Handle event
  });
}