import express from 'express';
import {
    deleteUser,
    getAllUser,
    getUser,
    getUsersStat,
    updateUser
} from '../controllers/user.controller.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = express.Router();

router.patch('/:id', [verifyToken], updateUser);
router.delete('/:id', [verifyToken], deleteUser);
router.get('/find/:id', getUser);
router.get('/', [verifyToken], getAllUser);
router.get('/stats', [verifyToken], getUsersStat);

export default router;
