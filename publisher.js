const amqp = require("amqplib");
const { parseArgs } = require("node:util");

// Stability: 1 - Experimental
// https://nodejs.org/api/util.html#utilparseargsconfig
const {
  values: { message },
} = parseArgs({
  options: {
    message: {
      type: "string",
      short: "m",
    },
  },
});

(async () => {
  try {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();

    // checks for "jobs" queue, if it doesn't exist then create one
    await channel.assertQueue("jobs");

    // send a single message with the content given as a buffer
    channel.sendToQueue("jobs", Buffer.from(message));

    console.log(`Job sent successfully ${JSON.parse(message).id}`);

    await channel.close();
    await connection.close();
  } catch (err) {
    console.log("connect error", err)
  }
})();