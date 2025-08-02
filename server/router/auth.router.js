import express from 'express';
import { signIn, signUp,getUser,updatedUser } from '../controller/auth.controller.js';
const router = express.Router();

router.post('/register',signUp);

router.post('/login',signIn);

router.get('/:id',getUser);

<<<<<<< HEAD
router.patch('/:id',updatedUser);
=======
router.patch('/:id',updatedUser);

export default router;
>>>>>>> frontend/aditya
