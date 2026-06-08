import amqplib from 'amqplib';
import _config from '../config/config.js';
export let channel, connection;


export const connectToRabbitMQ = async () => {
    try {
        if (connection) return connection;
        try {
            connection = await amqplib.connect(_config.RABBITMQ_URL);
            console.log(`Connected to Rabbit MQ`);
            channel = await connection.createChannel();
        } catch (error) {
            console.log(`ERROR : `, error);
            new Error('failed to connect to rabbbit MQ');
        }
    } catch (error) {
        console.log(`ERROR : `, error);
        new Error('failed to connect to rabbbit MQ');
    };
};


export const publishToQueue = async (queueName, data = {}) => {
    try {
        if (!channel || !connection) await connectToRabbitMQ();
        await channel.assertQueue(queueName, {
            durable: true
        });

        channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)));
        console.log(`Message sent to Queue ${queueName} ${data}`);
    } catch (error) {
        console.log(`ERROR : ${error}`);
        new Error(`failed to publish to queue ${error}`);
    };
};

export const subscribeToQueue = async (queueName, callback) => {
    try {
        if (!channel || !connection) await connectToRabbitMQ();

        await channel.assertQueue(queueName, {
            durable: true
        });

        channel.consume(queueName, async (message) => {
            const data = JSON.parse(message.content.toString());
            await callback(data);
            channel.ack(message);
        })
    } catch (error) {
        console.log(`ERROR : ${error}`);
        new Error(`failed to subscribe to queue ${error}`);
    };
};