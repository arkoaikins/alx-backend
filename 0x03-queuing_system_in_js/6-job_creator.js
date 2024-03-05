import kue from 'kue';

// Create a Kue queue
const queue = kue.createQueue();

// Create a job object
const jobData = {
  phoneNumber: '1234567890',
  message: 'Hello, world!'
};

// Create a job in the "push_notification_code" queue
const job = queue.create('push_notification_code', jobData)
  .save((error) => {
    if (error) {
      console.error('Notification job failed:', error);
      return;
    }
    console.log('Notification job created:', job.id);
  });

// Listen for job completion event
job.on('complete', () => {
  console.log('Notification job completed');
});

// Listen for job failure event
job.on('failed', () => {
  console.log('Notification job failed');
});
