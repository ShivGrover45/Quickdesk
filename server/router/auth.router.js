import express from 'express';
import { signIn, signUp } from '../controller/auth.controller';
const router = express.Router();

router.post('/register',signUp);

router.post('/login',signIn);

router.get('/:id',(req,res)=>{});

router.patch('/:id',(req,res)=>{});