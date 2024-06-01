import express, { Router } from 'express';
import RolesRouter from './../roles/RolesRouter';

const router = Router();
router.use(express.json());

router.use('/roles', RolesRouter);

export default router;
