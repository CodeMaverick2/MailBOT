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
exports.handleIncomingEmail = void 0;
const openaiService_1 = require("../services/openaiService");
const emailService_1 = require("../services/emailService");
const handleIncomingEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Handling incoming email...');
    try {
        const emailContent = req.body.emailContent;
        const category = yield (0, openaiService_1.analyzeEmailContent)(emailContent);
        const responseText = yield (0, openaiService_1.generateEmailResponse)(category);
        yield (0, emailService_1.sendEmail)(req.body.from, responseText);
        res.status(200).send({ message: 'Email handled successfully', category, responseText });
    }
    catch (error) {
        res.status(500).send({ message: 'Error handling email', error });
    }
});
exports.handleIncomingEmail = handleIncomingEmail;
