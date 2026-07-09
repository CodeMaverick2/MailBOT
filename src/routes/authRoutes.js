"use strict";
// In src/routes/authRoutes.ts
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
const express_1 = __importDefault(require("express"));
const oauthService_1 = require("../services/oauthService");
const router = express_1.default.Router();
router.get('/auth/google', (req, res) => {
    const oauth2Client = (0, oauthService_1.getGoogleOAuthClient)();
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
router.get('/auth/google/callback', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const oauth2Client = (0, oauthService_1.getGoogleOAuthClient)();
    const { code } = req.query;
    console.log('Received authorization code:', code);
    try {
        const { tokens } = yield oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);
        console.log('Received tokens:', tokens);
        if (tokens.refresh_token) {
            console.log('Refresh Token:', tokens.refresh_token);
            // TODO: Store this refresh_token securely
        }
        else {
            console.log('No refresh token received. Try revoking app permissions and try again.');
        }
        res.send('Authentication successful! You can close this window.');
    }
    catch (error) {
        console.error('Error retrieving access token', error);
        res.status(500).send('Authentication failed');
    }
}));
exports.default = router;
