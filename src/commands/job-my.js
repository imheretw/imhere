import MyJob from 'jobs/MyJob';

const job = new MyJob();
job.runImmediate();
job.shutdown();
