import redis from 'redis';

// Create a Redis client
const client = redis.createClient();

// Handle the connection event
client.on('connect', () => {
  console.log('Redis client connected to the server');
});

// Handle the error event
client.on('error', (error) => {
  console.error('Redis client not connected to the server:', error);
});

// Function to publish a message to the "holberton school channel" after a specified time
const publishMessage = (message, time) => {
  setTimeout(() => {
    console.log(`About to send ${message}`);
    client.publish('holberton school channel', message);
  }, time);
};

// Call the publishMessage function with the specified messages and times
publishMessage('Holberton Student #1 starts course', 100);
publishMessage('Holberton Student #2 starts course', 200);
publishMessage('KILL_SERVER', 300);
publishMessage('Holberton Student #3 starts course', 400);
