// In src/routes/authRoutes.ts

import express from 'express';
import { getGoogleOAuthClient } from '../services/oauthService';

const router = express.Router();

router.get('/auth/google', (req, res) => {
    const oauth2Client = getGoogleOAuthClient();
    const scopes = [
        'https://www.googleapis.com/auth/gmail.readonly',
        'https://www.googleapis.com/auth/gmail.send',
        'https://www.googleapis.com/auth/modify'
    ];

    const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
        prompt: 'consent'
    });

    res.redirect(authUrl);
});

router.get('/auth/google/callback', async (req, res) => {
    const oauth2Client = getGoogleOAuthClient();
    const { code } = req.query;

    console.log('Received authorization code:', code);

    try {
        const { tokens } = await oauth2Client.getToken(code as string);
        oauth2Client.setCredentials(tokens);

        console.log('Received tokens:', tokens);

        if (tokens.refresh_token) {
            console.log('Refresh Token:', tokens.refresh_token);
            // TODO: Store this refresh_token securely
        } else {
            console.log('No refresh token received. Try revoking app permissions and try again.');
        }

        res.send('Authentication successful! You can close this window.');
    } catch (error) {
        console.error('Error retrieving access token', error);
        res.status(500).send('Authentication failed');
    }
});

export default router;