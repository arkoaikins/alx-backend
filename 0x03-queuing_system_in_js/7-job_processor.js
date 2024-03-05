import kue from 'kue';

// Create an array of blacklisted phone numbers
const blacklistedNumbers = ['4153518780', '4153518781'];

// Create a function to send a notification
function sendNotification(phoneNumber, message, job, done) {
  job.progress(0, 100); // Track the progress of the job

  if (blacklistedNumbers.includes(phoneNumber)) {
    const error = new Error(`Phone number ${phoneNumber} is blacklisted`);
    job.failed(error);
    done(error);
  } else {
    job.progress(50); // Track the progress of the job

    console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);

    // Simulate sending a notification
    setTimeout(() => {
      job.progress(100); // Track the progress of the job
      done();
    }, 2000);
  }
}

// Create a Kue queue
const queue = kue.createQueue({
  concurrency: 2 // Process two jobs at a time
});

// Process jobs from the "push_notification_code_2" queue
queue.process('push_notification_code_2', 2, (job, done) => {
  const { phoneNumber, message } = job.data;
  sendNotification(phoneNumber, message, job, done);
});
