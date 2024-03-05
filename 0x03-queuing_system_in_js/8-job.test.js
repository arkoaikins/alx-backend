import { expect } from 'chai';
import kue from 'kue';
import createPushNotificationsJobs from './8-job.js';

describe('createPushNotificationsJobs', () => {
  let queue;

  before(() => {
    queue = kue.createQueue({ testMode: true });
  });

  afterEach((done) => {
    queue.testMode.clear().then(() => done());
  });

  it('should display an error message if jobs is not an array', () => {
    expect(() => createPushNotificationsJobs(null, queue)).to.throw('Jobs is not an array');
  });

  it('should create new jobs in the queue', (done) => {
    const jobData = [
      { phoneNumber: '4153518780', message: 'This is the code 1234 to verify your account' },
      { phoneNumber: '4153518781', message: 'This is the code 5678 to verify your account' }
    ];

    createPushNotificationsJobs(jobData, queue);

    setTimeout(() => {
      queue.testMode.jobs((err, jobs) => {
        expect(jobs.length).to.equal(2);
        done();
      });
    }, 100);
  });

});
