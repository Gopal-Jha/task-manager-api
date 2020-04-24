const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const User = require('../models/user')
const auth = require('../middleware/auth')
const { sendWelcomeEmail, sendCancelEmail } = require('../emails/account')
const router = express.Router()

//Creating User 
router.post('/users', async (req, res ) => {
    const user = new User(req.body)
    try {

        await user.save()
        sendWelcomeEmail( user.email, user.name )
        const token = await user.generateAuthToken()
        res.status(201).send({user, token })
    }catch(e){

        res.status(400).send(e)
    }
        
})


//User login
router.post('/users/login', async (req, res ) => {

    try{

        const user = await User.findByCredentials(req.body.email, req.body.password )
        const token = await user.generateAuthToken()
        res.send({ user, token })

    } catch(error){

        res.status(400).send(error)
    }
})

//User logout
router.post('/users/logout', auth, async (req, res ) => {
    try{

        req.user.tokens = req.user.tokens.filter((token) => {

            return token.token !== req.token 
        })
        await req.user.save()

        res.send()
    } catch(e) {

        res.status(500).send(e)
    }
})

//User logout with all session as like netflix when a number of users created and delete all device logins
router.post('/users/logoutAll', auth, async (req, res ) => {
    try{

        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch(e){

        res.status(500).send()
    }
})

//creating avatar folder to store image
const upload = multer({
    //dest: 'avatar',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb){
        //Checking the file extension 
        //file.originalname.endsWith('.pdf)
        if(!file.originalname.match(/\.(png|jpg|jpeg)$/)){
            return cb(new Error('Please provide a file having extension of png,jpg and jpeg'))
        }

        cb(undefined, true)
    }
})

//Uploading Avatar image
router.post('/users/profile/avatar', auth, upload.single('avatar'), async (req, res ) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

//Delete avatar iimage
router.delete('/users/profile/avatar', auth, async (req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})

//Getting profile avatar
router.get('/users/:id/avatar', async (req, res) => {
    try{

        const user = await User.findById(req.params.id)

        if(!user || !user.avatar ){
            throw new Error()
        }
        
        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    } catch(e){

        res.status(400).send()
    }
})
//Read all Users
router.get('/users', async (req, res ) => {
    
    try{

        const users = await User.find({})
        res.send(users)
    }catch(e){

        res.status(500).send(e)
    }
})

//Read a single user by id
router.get('/users/:id', async (req, res ) => {
    
    const _id = req.params.id
    try{

        const user = await User.findById(_id)
        if(!user){

            res.status(404).send('User not found.')
        }
        res.send(user)
    }catch(e) {

        res.status(500).send()
    }        
})

//Read user profile 
router.get('/profile/me',auth , async (req, res ) => {
    
    try{

        //const users = await User.find({})
        res.send(req.user)
    }catch(e){

        res.status(500).send(e)
    }
})

//Update User
router.patch('/users/update',auth , async (req, res ) => {
    const updates = Object.keys(req.body)
    const updateField = [ 'name', 'email', 'password', 'age']
    const isValidOperation = updates.every( (update) => updateField.includes(update))

    if(!isValidOperation){

        res.status(400).send({ error: 'Invalid updates!'})
    }
    try{

        //const user = await User.findById(req.user._id)
        //const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true})
    // if(!user){

    //     res.status(404).send('User not found')
    // }
        updates.forEach( (update) => req.user[update] = req.body[update] )
        await req.user.save()
        res.send(req.user)
    }catch(e){

        res.status(400).send(e)
    }
})

//Delete User
router.delete('/users/delete',auth,  async (req, res ) => {
    try{

        // const user = await User.findByIdAndDelete(req.params.id)
        // if(!user){
        //     res.status(404).send('Unable to find user.')
        // }
        await req.user.remove()
        sendCancelEmail(req.user.email, req.user.name)
        res.send(req.user)

    }catch(e) {

        res.status(500).send(e)
    }
})


module.exports = router