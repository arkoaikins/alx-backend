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

// Function to create and store a hash in Redis
const createHash = () => {
  client.hset(
    'HolbertonSchools',
    'Portland',
    '50',
    redis.print
  );
  client.hset(
    'HolbertonSchools',
    'Seattle',
    '80',
    redis.print
  );
  client.hset(
    'HolbertonSchools',
    'New York',
    '20',
    redis.print
  );
  client.hset(
    'HolbertonSchools',
    'Bogota',
    '20',
    redis.print
  );
  client.hset(
    'HolbertonSchools',
    'Cali',
    '40',
    redis.print
  );
  client.hset(
    'HolbertonSchools',
    'Paris',
    '2',
    redis.print
  );
};

// Function to display the stored hash in Redis
const displayHash = () => {
  client.hgetall('HolbertonSchools', (error, hash) => {
    if (error) throw error;
    console.log(hash);
  });
};

// Call the functions
createHash();
displayHash();
