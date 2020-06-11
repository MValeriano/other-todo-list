const express = require('express');
const Tasks = require('../models/tasks');

const router = express.Router();

router.post('/tasks',async (req,res) => {
    const task = new Tasks(req.body);
    try{
        await task.save();
        res.status(201).send(task);

    }catch(error)
    {
        res.status(400).send(error);
    }
    
})

router.get('/tasks/:id', async(req,res) => {
    const _id = req.params.id;
    try{
        const task = await Tasks.findById({_id});
        res.status(200).send(task);
    }catch(error)
    {
        res.status(500).send(error);
    }
})

router.get('/tasks',async(req,res) => {
   try {
       const task = await Tasks.find({});
       res.status(200).send(task);
   } catch (error) {
       res.status(500).send(error);
   }
})

router.patch('/tasks/:id',async(req,res) => {
    const update = Object.keys(req.body);
    const allowedUpdate = ["description","completed"];
    const isValidOperation = update.every((updates) => allowedUpdate.includes(updates))

    if(!isValidOperation){
        return res.status(400).send({error:"esses campos não podem ser atualizados."})
    }

    try{
        const task = await Tasks.findByIdAndUpdate(req.params.id,req.body,{new:true, runValidators: true})
        if(!task){
            return res.status(404).send();
        }
        res.status(200).send(task);
    }catch(error){
        res.status(500).send(error)
    }
})

router.delete('/tasks',async(req,res) => {
    try{
        const task = await Tasks.findByIdAndDelete(req.body);

        if(!task){
            res.status(404).send(' Tarefa não localizada');
        }

        res.status(200).send(task);
    }catch(error){  
        res.status(500).send(error)
    }
})

module.exports = router;