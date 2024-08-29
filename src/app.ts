import express from 'express';
import emailRoutes from './routes/emailRoutes';
// import './services/schedulerService';
import authRoutes from './routes/authRoutes';
const app = express();
app.use(express.json());
app.use('/api', authRoutes);
app.use('/api/emails', emailRoutes);


app.get('/', (req, res) => {
    res.send('Server is running!');
});

export default app;
