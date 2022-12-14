const amqp = require("amqplib");

(async () => {
  try {
    const connection = await amqp.connect("amqp://localhost:5672");
    // create channel for consumer (which is completely different than the one for publisher)
    const channel = await connection.createChannel();

    // checks for "jobs" queue, if it doesn't exist then create one
    await channel.assertQueue("jobs");

    channel.consume("jobs", (message) => {
      const input = JSON.parse(message.content.toString())
      console.log("🚀 ~ file: consumer.js:14 ~ channel.consume ~ input", input)
      console.log(`Recieved job with input ${input.id}`);

      // we could have nay criteria here, but lets say we are happy if message has "id"
      if (input.id) {
        channel.ack(message)
      }
    });
  } catch (err) {
    console.log("connect error", err)
  }
})();