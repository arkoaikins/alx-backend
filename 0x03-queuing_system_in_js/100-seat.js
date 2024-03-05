import express from 'express';
import redis from 'redis';
import { promisify } from 'util';
import kue from 'kue';

const app = express();
const client = redis.createClient();
const queue = kue.createQueue();

const reserveSeatAsync = promisify(client.set).bind(client);
const getCurrentAvailableSeatsAsync = promisify(client.get).bind(client);

// Initialize the number of available seats to 50
client.set('available_seats', 50);

// Initialize the reservationEnabled flag to true
let reservationEnabled = true;

// Route to get the number of available seats
app.get('/available_seats', async (req, res) => {
  const numberOfAvailableSeats = await getCurrentAvailableSeatsAsync('available_seats');
  res.json({ numberOfAvailableSeats });
});

// Route to reserve a seat
app.get('/reserve_seat', (req, res) => {
  if (!reservationEnabled) {
    res.json({ status: 'Reservation are blocked' });
    return;
  }

  const job = queue.create('reserve_seat').save((error) => {
    if (!error) {
      res.json({ status: 'Reservation in process' });
    } else {
      res.json({ status: 'Reservation failed' });
    }
  });
});

// Process the reserve_seat job queue
queue.process('reserve_seat', async (job, done) => {
  const currentAvailableSeats = await getCurrentAvailableSeatsAsync('available_seats');
  const numberOfAvailableSeats = parseInt(currentAvailableSeats);

  if (numberOfAvailableSeats === 0) {
    reservationEnabled = false;
  }

  if (numberOfAvailableSeats >= 1) {
    await reserveSeatAsync('available_seats', numberOfAvailableSeats - 1);
    done();
  } else {
    done(new Error('Not enough seats available'));
  }
});

// Start the server
app.listen(1245, () => {
  console.log('Server is running on port 1245');
});
