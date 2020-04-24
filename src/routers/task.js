const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = express.Router()

//Creating Task
router.post('/tasks', auth, async ( req, res ) => {

    const newTask = new Task({
        ...req.body,
        userId: req.user._id
    })
    try{

        await newTask.save()
        res.status(201).send(newTask)
    }catch(e){

        res.status(400).send(error)
    }

})

//Read all Tasks
router.get('/tasks', auth, async (req, res ) => {

    try{
        const match = {}
        const sort = {}

        if(req.query.completed){
            match.completed = req.query.completed === 'true'
        }

        if(req.query.sortBy){
            const parts = req.query.sortBy.split(':')
            sort[parts[0]] = parts[1] === 'desc' ? '-1' : '1'
        }
        //const tasks = await Task.find({ userId: req.user._id})
        //Another way to fetch task belongs to userId
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send(req.user.tasks)

    }catch(e){

        res.status(500).send()
    }       
})

//Read a single task by id
router.get('/tasks/:id', auth, async (req, res ) => {
    
    const _id = req.params.id
    //console.log(_id)
    try{
        
        const task = await Task.findOne({_id})
        if(!task){

            res.status(404).send('Task not found.')
        }
        res.send(task)
    }catch(e) {

        res.status(500).send()
    }      
})

//Update Task
router.patch('/tasks/:id', auth,  async (req, res ) => {
    const updates = Object.keys(req.body)
    const updateFields = [ 'description', 'completed' ]
    const isValidOperation = updates.every( (update) => updateFields.includes(update))

    if(!isValidOperation){

        res.status(400).send({ error: 'Invalid updates!'})
    }
    try{

        //const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true})

        const task = await Task.findOne({ _id:req.params.id, userId: req.user._id })

        if(!task){

            res.status(404).send()
        }
        updates.forEach( (update) => task[update] = req.body[update] )
        await task.save()
        res.send(task)
    }catch(e){

        res.status(400).send(e)
    }
})

//Delete Task
router.delete('/tasks/:id', auth, async (req, res ) => {
    try{

        const task = await Task.findOneAndDelete({ _id:req.params.id, userId: req.user._id })
        if(!task){
            res.status(404).send('Unable to find task.')
        }
        res.send(task)

    }catch(e) {

        res.status(500).send(e)
    }
})

module.exports = router