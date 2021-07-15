import express from 'express';
const router = express.Router();
import { usersController } from '../controllers/usersController.js';

/* GET users listing. */
router.get('/', usersController);

export default router;
