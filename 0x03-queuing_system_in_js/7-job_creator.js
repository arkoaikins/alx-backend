import kue from 'kue';

// Create an array of jobs
const jobs = [
  {
    phoneNumber: '4153518780',
    message: 'This is the code 1234 to verify your account'
  },
  {
    phoneNumber: '4153518781',
    message: 'This is the code 4562 to verify your account'
  },
  // ... add more job objects here
];

// Create a Kue queue
const queue = kue.createQueue();

// Loop through the jobs array and create jobs for each object
jobs.forEach((jobData) => {
  const job = queue.create('push_notification_code_2', jobData)
    .save((error) => {
      if (error) {
        console.error(`Notification job ${job.id} failed:`, error);
        return;
      }
      console.log(`Notification job created: ${job.id}`);
    });

  // Listen for job completion event
  job.on('complete', () => {
    console.log(`Notification job ${job.id} completed`);
  });

  // Listen for job failure event
  job.on('failed', (error) => {
    console.log(`Notification job ${job.id} failed:`, error);
  });

  // Listen for job progress event
  job.on('progress', (progress, data) => {
    console.log(`Notification job ${job.id} ${progress}% complete`);
  });
});
