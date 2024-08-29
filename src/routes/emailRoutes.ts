import { Router } from 'express';
import { handleIncomingEmail } from '../controllers/emailController';

const router = Router();

router.post('/incoming', handleIncomingEmail);

export default router;
