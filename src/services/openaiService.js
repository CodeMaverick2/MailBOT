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
exports.generateEmailResponse = exports.categorizeEmail = exports.analyzeEmailContent = void 0;
const openai_1 = __importDefault(require("openai"));
require("dotenv/config");
const openai = new openai_1.default({
    apiKey: process.env.OPENAI_API_KEY,
});
const analyzeEmailContent = (emailContent) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    console.log('Analyzing email content:', emailContent);
    const response = yield openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: `Analyze the following email content and strictly categorize it as: Interested, Not Interested, or More Information.\n\n${emailContent}` }
        ],
        max_tokens: 50,
    });
    const category = (_c = (_b = (_a = response.choices[0]) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.content) === null || _c === void 0 ? void 0 : _c.trim().toLowerCase();
    if (category === null || category === void 0 ? void 0 : category.includes("interested"))
        return "Interested";
    if (category === null || category === void 0 ? void 0 : category.includes("not interested"))
        return "Not Interested";
    if (category === null || category === void 0 ? void 0 : category.includes("more information"))
        return "More Information";
    return 'More Information';
});
exports.analyzeEmailContent = analyzeEmailContent;
const categorizeEmail = (emailContent) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f;
    try {
        const response = yield openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are an assistant that only categorizes emails into: Interested, Not Interested, or More Information." },
                { role: "user", content: `Categorize the following email as Interested, Not Interested, or More Information:\n\n"${emailContent}"` }
            ],
            max_tokens: 10,
        });
        const category = (_f = (_e = (_d = response.choices[0]) === null || _d === void 0 ? void 0 : _d.message) === null || _e === void 0 ? void 0 : _e.content) === null || _f === void 0 ? void 0 : _f.trim().toLowerCase();
        if (category === null || category === void 0 ? void 0 : category.includes("interested"))
            return "Interested";
        if (category === null || category === void 0 ? void 0 : category.includes("not interested"))
            return "Not Interested";
        if (category === null || category === void 0 ? void 0 : category.includes("more information"))
            return "More Information";
        console.log(`Email categorized as: ${category}`);
        return 'More Information';
    }
    catch (error) {
        console.error('Error categorizing email:', error);
        throw error;
    }
});
exports.categorizeEmail = categorizeEmail;
const generateEmailResponse = (category) => __awaiter(void 0, void 0, void 0, function* () {
    var _g, _h, _j;
    try {
        const prompt = `Generate a professional email response for the category: ${category}. Start with "Dear Recipient" and make sure the response is concise, friendly, and contains no placeholders like [Name], [Position], or [Contact Information].`;
        const response = yield openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are an assistant generating professional email responses without placeholders." },
                { role: "user", content: prompt }
            ],
            max_tokens: 150,
        });
        const emailResponse = ((_j = (_h = (_g = response.choices[0]) === null || _g === void 0 ? void 0 : _g.message) === null || _h === void 0 ? void 0 : _h.content) === null || _j === void 0 ? void 0 : _j.replace(/\[.*?\]/g, '').trim()) || '';
        console.log(`Generated response: ${emailResponse}`);
        return emailResponse;
    }
    catch (error) {
        console.error('Error generating email response:', error);
        throw error;
    }
});
exports.generateEmailResponse = generateEmailResponse;
