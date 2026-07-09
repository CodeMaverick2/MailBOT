"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const emailRoutes_1 = __importDefault(require("./routes/emailRoutes"));
// import './services/schedulerService';
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api', authRoutes_1.default);
app.use('/api/emails', emailRoutes_1.default);
app.get('/', (req, res) => {
    res.send('Server is running!');
});
exports.default = app;
