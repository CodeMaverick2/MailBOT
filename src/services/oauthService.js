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
Object.defineProperty(exports, "__esModule", { value: true });
exports.setGoogleCredentials = exports.getGoogleTokens = exports.getGoogleAuthUrl = exports.getGoogleOAuthClient = void 0;
const googleapis_1 = require("googleapis");
require("dotenv/config");
const getGoogleOAuthClient = () => {
    return new googleapis_1.google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, process.env.GOOGLE_REDIRECT_URI);
};
exports.getGoogleOAuthClient = getGoogleOAuthClient;
const getGoogleAuthUrl = () => {
    const oauth2Client = (0, exports.getGoogleOAuthClient)();
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
exports.getGoogleAuthUrl = getGoogleAuthUrl;
const getGoogleTokens = (code) => __awaiter(void 0, void 0, void 0, function* () {
    const oauth2Client = (0, exports.getGoogleOAuthClient)();
    try {
        const { tokens } = yield oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);
        console.log('Access Token:', tokens.access_token);
        console.log('Refresh Token:', tokens.refresh_token);
        return tokens;
    }
    catch (error) {
        console.error('Error retrieving access and refresh tokens:', error);
        throw error;
    }
});
exports.getGoogleTokens = getGoogleTokens;
const setGoogleCredentials = (refreshToken) => {
    const oauth2Client = (0, exports.getGoogleOAuthClient)();
    oauth2Client.setCredentials({
        refresh_token: refreshToken
    });
    return oauth2Client;
};
exports.setGoogleCredentials = setGoogleCredentials;
