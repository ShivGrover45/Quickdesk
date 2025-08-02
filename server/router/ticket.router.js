import express from 'express';
const ticketRouter= express.Router();

ticketRouter.get('/', (req, res)=>{})
ticketRouter.post('/', (req, res)=>{})
ticketRouter.get('/:id', (req, res)=>{})    
ticketRouter.put('/:id', (req, res)=>{})
ticketRouter.delete('/:id', (req, res)=>{})
ticketRouter.get('/my-tickets', (req, res)=>{})
ticketRouter.get('/my-tickets/assigned', (req, res)=>{})
ticketRouter.post('/my-tickets/:id/assign', (req, res)=>{})
ticketRouter.post('/my-tickets/:id/status', (req, res)=>{})

export default ticketRouter
