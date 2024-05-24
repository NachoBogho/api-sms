import { Router } from 'express';
import { sendSms } from '../controllers/sms.manager.js';    

const router = Router();

router.post('/send-sms', sendSms);

export default router;
