import { Queue, Worker, Job } from 'bullmq';
import { fetchNewEmails,markEmailAsRead } from './emailService';
import { sendEmail } from './emailService';
import Redis from 'ioredis';
import { categorizeEmail, generateEmailResponse } from './openaiService';

const connection = new Redis({
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: Number(process.env.REDIS_PORT) || 6379,
    password: process.env.REDIS_PASSWORD || undefined,
    maxRetriesPerRequest: null
});

const emailQueue = new Queue('emailQueue', { connection });

export const scheduleEmailProcessing = async (emailData: any) => {
    await emailQueue.add('processEmail', emailData);
    printQueue(); 
};

const clearQueue = async () => {
    try {
        await emailQueue.drain(true); 
        console.log('All jobs in the email queue have been cleared.');
    } catch (error: any) {
        console.error('Error clearing the queue:', error.message);
    }
};

const printQueue = async () => {
    const jobs: Job[] = await emailQueue.getJobs(['waiting', 'active', 'delayed']);
    console.log('Current Emails in Queue:');
    jobs.forEach((job) => {
        console.log(`Job ID: ${job.id}, Email: ${job.data.from}, Subject: ${job.data.subject}`);
    });
};

new Worker('emailQueue', async (job) => {
    console.log(`Processing email: ${job.data}`);
    const emailContent = job.data.body;
    const auth = job.data.auth; 

    const category = await categorizeEmail(emailContent);
    const response = await generateEmailResponse(category);

    await sendEmail(job.data.from, response);
    console.log(`Response sent to: ${job.data.from}`);

}, { connection });

const checkForNewEmails = async () => {
    try {
        const newEmails = await fetchNewEmails();
        newEmails.forEach((email: any) => {
            scheduleEmailProcessing(email);
        });
    } catch (error) {
        console.error('Error fetching or scheduling emails:', error);
    }
};

setInterval(checkForNewEmails, 6000);
