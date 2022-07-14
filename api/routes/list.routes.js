import express from 'express';
import { createList, deleteList, getAllList } from '../controllers/list.controller.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = express.Router();

router.post('/', [verifyToken], createList);
router.get('/', [verifyToken], getAllList);
router.delete('/:id', [verifyToken], deleteList);

export default router;
