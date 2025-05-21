const amqp = require("amqplib");
const logger = require("../utils/logger");

let connection = null;
let channel = null;

const EXCHANGE_NAME = "facebook_events";

async function connectToRabbitMQ() {
  try {
    connection = await amqp.connect(process.env.RABBITMQ_URL);
    channel = await connection.createChannel();
    await channel.assertExchange(EXCHANGE_NAME, "direct", { durable: true });
    logger.info("Connected to RabbitMQ");
  } catch (error) {
    logger.error("Failed to connect to RabbitMQ", error);
    throw error;
  }
}
const publishEvent = async (routingKey, message) => {
  try {
    if (!channel) {
      logger.error("Channel not initialized");
      await connectToRabbitMQ();
    }
    channel.publish(
      EXCHANGE_NAME,
      routingKey,
      Buffer.from(JSON.stringify(message))
    );
    logger.info("Event published successfully", message);
  } catch (error) {
    logger.error("Failed to publish event", error);
    throw error;
  }
};

const consumeEvent = async (routingKey, callback) => {
  try {
    if (!channel) {
      logger.error("Channel not initialized");
      await connectToRabbitMQ();
    }

    const q = await channel.assertQueue("", { exclusive: true });
    await channel.bindQueue(q.queue, EXCHANGE_NAME, routingKey);
    channel.consume(q.queue, (msg) => {
      if (msg !== null) {
        const message = JSON.parse(msg.content.toString());
        callback(message);
        channel.ack(msg);
      }
    });
    logger.info(`Subscribed to ${routingKey}`);
  } catch (error) {
    logger.error("Failed to consume event", error);
    throw error;
  }
};

module.exports = { connectToRabbitMQ, publishEvent, consumeEvent };
