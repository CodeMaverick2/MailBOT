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
exports.sendEmail = exports.markEmailAsRead = exports.fetchNewEmails = void 0;
const googleapis_1 = require("googleapis");
const nodemailer_1 = __importDefault(require("nodemailer"));
require("dotenv/config");
const fetchNewEmails = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const auth = new googleapis_1.google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, process.env.GOOGLE_REDIRECT_URI);
        auth.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });
        const gmail = googleapis_1.google.gmail({ version: 'v1', auth });
        const res = yield gmail.users.messages.list({
            userId: 'me',
            q: 'is:unread'
        });
        const messages = res.data.messages || [];
        return Promise.all(messages.map(msg => fetchEmailDetails(msg.id, auth)));
    }
    catch (error) {
        console.error('Error fetching new emails:', error);
        throw error;
    }
});
exports.fetchNewEmails = fetchNewEmails;
const fetchEmailDetails = (messageId, auth) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g;
    try {
        const gmail = googleapis_1.google.gmail({ version: 'v1', auth });
        const res = yield gmail.users.messages.get({
            userId: 'me',
            id: messageId,
        });
        const fromHeader = (_c = (_b = (_a = res.data.payload) === null || _a === void 0 ? void 0 : _a.headers) === null || _b === void 0 ? void 0 : _b.find(header => header.name === 'From')) === null || _c === void 0 ? void 0 : _c.value;
        const subject = ((_f = (_e = (_d = res.data.payload) === null || _d === void 0 ? void 0 : _d.headers) === null || _e === void 0 ? void 0 : _e.find(header => header.name === 'Subject')) === null || _f === void 0 ? void 0 : _f.value) || '';
        const body = res.data.snippet || '';
        const fromEmail = ((_g = fromHeader === null || fromHeader === void 0 ? void 0 : fromHeader.match(/<(.+)>/)) === null || _g === void 0 ? void 0 : _g[1]) || fromHeader;
        const emailData = {
            id: messageId,
            from: fromEmail,
            subject: subject,
            body: body,
        };
        yield (0, exports.sendEmail)(fromEmail !== null && fromEmail !== void 0 ? fromEmail : '', `Thank you for your message regarding "${emailData.subject}". We will get back to you soon.`);
        yield (0, exports.markEmailAsRead)(auth, messageId);
        return emailData;
    }
    catch (error) {
        console.error('Error fetching email details:', error);
        throw error;
    }
});
const markEmailAsRead = (auth, messageId) => __awaiter(void 0, void 0, void 0, function* () {
    const gmail = googleapis_1.google.gmail({ version: 'v1', auth });
    try {
        yield gmail.users.messages.modify({
            userId: 'me',
            id: messageId,
            requestBody: {
                removeLabelIds: ['UNREAD'],
            },
        });
        console.log(`Email with ID ${messageId} marked as read.`);
    }
    catch (error) {
        console.error(`Error marking email as read: ${error.message}`);
    }
});
exports.markEmailAsRead = markEmailAsRead;
const sendEmail = (to, content) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS,
        },
    });
    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: to,
        subject: 'Automated Response',
        text: content,
    };
    try {
        yield transporter.sendMail(mailOptions);
        console.log(`Email sent successfully to ${to}`);
    }
    catch (error) {
        console.error('Error sending email:', error);
    }
});
exports.sendEmail = sendEmail;
