import { google } from 'googleapis';
import nodemailer from 'nodemailer';
import 'dotenv/config';

export const fetchNewEmails = async () => {
    try {
        const auth = new google.auth.OAuth2(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            process.env.GOOGLE_REDIRECT_URI
        );

        auth.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

        const gmail = google.gmail({ version: 'v1', auth });

        const res = await gmail.users.messages.list({
            userId: 'me',
            q: 'is:unread'
        });

        const messages = res.data.messages || [];
        return Promise.all(messages.map(msg => fetchEmailDetails(msg.id as string, auth)));
    } catch (error) {
        console.error('Error fetching new emails:', error);
        throw error;
    }
};

const fetchEmailDetails = async (messageId: string, auth: any) => {
    try {
        const gmail = google.gmail({ version: 'v1', auth });

        const res = await gmail.users.messages.get({
            userId: 'me',
            id: messageId,
        });

        const fromHeader = res.data.payload?.headers?.find(header => header.name === 'From')?.value;
        const subject = res.data.payload?.headers?.find(header => header.name === 'Subject')?.value || '';
        const body = res.data.snippet || ''; 

        const fromEmail = fromHeader?.match(/<(.+)>/)?.[1] || fromHeader; 

        const emailData = {
            id: messageId,
            from: fromEmail,
            subject: subject,
            body: body,
        };

        await sendEmail(fromEmail ?? '', `Thank you for your message regarding "${emailData.subject}". We will get back to you soon.`);

        await markEmailAsRead(auth, messageId);

        return emailData;
    } catch (error) {
        console.error('Error fetching email details:', error);
        throw error;
    }
};

export const markEmailAsRead = async (auth: any, messageId: string) => {
    const gmail = google.gmail({ version: 'v1', auth });

    try {
        await gmail.users.messages.modify({
            userId: 'me',
            id: messageId,
            requestBody: {
                removeLabelIds: ['UNREAD'],  
            },
        });
        console.log(`Email with ID ${messageId} marked as read.`);
    } catch (error : any) {
        console.error(`Error marking email as read: ${error.message}`);
    }
};

export const sendEmail = async (to: string, content: string) => {
    const transporter = nodemailer.createTransport({
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
        await transporter.sendMail(mailOptions);
        console.log(`Email sent successfully to ${to}`);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};
