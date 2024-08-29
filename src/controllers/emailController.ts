import { Request, Response } from 'express';
import { analyzeEmailContent, generateEmailResponse } from '../services/openaiService';
import { sendEmail } from '../services/emailService';

export const handleIncomingEmail = async (req: Request, res: Response) => {
    console.log('Handling incoming email...');
    try {
        const emailContent = req.body.emailContent;

        const category = await analyzeEmailContent(emailContent);
        const responseText = await generateEmailResponse(category);

        await sendEmail(req.body.from, responseText);

        res.status(200).send({ message: 'Email handled successfully', category, responseText });
    } catch (error) {
        res.status(500).send({ message: 'Error handling email', error });
    }
};
