import { Router } from 'express';
import { getRoles } from './RolesController';

const router = Router();

router.get('/', getRoles);

export default router;
