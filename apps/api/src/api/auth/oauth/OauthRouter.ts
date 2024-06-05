import { Router } from 'express';
import { googleOuath, googleOauthCallback } from './OauthController';

const router = Router();

router.get('/google', googleOuath);
router.get('/google/callback', googleOauthCallback);

export default router;
