import redis from 'redis';
import { promisify } from 'util';

// Create a Redis client
const client = redis.createClient();

// Promisify the get method of the Redis client
const getAsync = promisify(client.get).bind(client);

// Handle the connection event
client.on('connect', () => {
  console.log('Redis client connected to the server');
});

// Handle the error event
client.on('error', (error) => {
  console.error('Redis client not connected to the server:', error);
});

// Function to set a new school value in Redis
const setNewSchool = (schoolName, value) => {
  client.set(schoolName, value, redis.print);
};

// Function to display the value for a school key using async/await
const displaySchoolValue = async (schoolName) => {
  try {
    const value = await getAsync(schoolName);
    console.log(value);
  } catch (error) {
    throw error;
  }
};

// Call the functions
displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
