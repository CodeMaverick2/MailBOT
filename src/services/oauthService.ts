import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import 'dotenv/config';

export const getGoogleOAuthClient = (): OAuth2Client => {
    return new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.GOOGLE_REDIRECT_URI
    );
};

export const getGoogleAuthUrl = (): string => {
    const oauth2Client = getGoogleOAuthClient();
    const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline', 
        scope: [
            'https://www.googleapis.com/auth/gmail.readonly',
            'https://www.googleapis.com/auth/gmail.send',
            'https://www.googleapis.com/auth/gmail.modify'
        ],
        prompt: 'consent' 
    });

    return authUrl;
};

export const getGoogleTokens = async (code: string) => {
    const oauth2Client = getGoogleOAuthClient();
    
    try {
        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);

        console.log('Access Token:', tokens.access_token);
        console.log('Refresh Token:', tokens.refresh_token);

      
        return tokens;
    } catch (error) {
        console.error('Error retrieving access and refresh tokens:', error);
        throw error;
    }
};

export const setGoogleCredentials = (refreshToken: string) => {
    const oauth2Client = getGoogleOAuthClient();
    oauth2Client.setCredentials({
        refresh_token: refreshToken
    });
    return oauth2Client;
};
