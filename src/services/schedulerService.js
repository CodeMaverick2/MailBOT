"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduleEmailProcessing = void 0;
const bullmq_1 = require("bullmq");
const emailService_1 = require("./emailService");
const emailService_2 = require("./emailService");
const ioredis_1 = __importDefault(require("ioredis"));
const openaiService_1 = require("./openaiService");
const connection = new ioredis_1.default({
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: Number(process.env.REDIS_PORT) || 6379,
    password: process.env.REDIS_PASSWORD || undefined,
    maxRetriesPerRequest: null
});
const emailQueue = new bullmq_1.Queue('emailQueue', { connection });
const scheduleEmailProcessing = (emailData) => __awaiter(void 0, void 0, void 0, function* () {
    yield emailQueue.add('processEmail', emailData);
    printQueue();
});
exports.scheduleEmailProcessing = scheduleEmailProcessing;
const clearQueue = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield emailQueue.drain(true);
        console.log('All jobs in the email queue have been cleared.');
    }
    catch (error) {
        console.error('Error clearing the queue:', error.message);
    }
});
const printQueue = () => __awaiter(void 0, void 0, void 0, function* () {
    const jobs = yield emailQueue.getJobs(['waiting', 'active', 'delayed']);
    console.log('Current Emails in Queue:');
    jobs.forEach((job) => {
        console.log(`Job ID: ${job.id}, Email: ${job.data.from}, Subject: ${job.data.subject}`);
    });
});
new bullmq_1.Worker('emailQueue', (job) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Processing email: ${job.data}`);
    const emailContent = job.data.body;
    const auth = job.data.auth;
    const category = yield (0, openaiService_1.categorizeEmail)(emailContent);
    const response = yield (0, openaiService_1.generateEmailResponse)(category);
    yield (0, emailService_2.sendEmail)(job.data.from, response);
    console.log(`Response sent to: ${job.data.from}`);
}), { connection });
const checkForNewEmails = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newEmails = yield (0, emailService_1.fetchNewEmails)();
        newEmails.forEach((email) => {
            (0, exports.scheduleEmailProcessing)(email);
        });
    }
    catch (error) {
        console.error('Error fetching or scheduling emails:', error);
    }
});
setInterval(checkForNewEmails, 6000);
