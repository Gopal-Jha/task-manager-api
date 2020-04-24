const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT

const multer = require('multer')
//creating avatar folder to store image
// const upload = multer({
//     dest: 'images',
//     limits: {
//         fileSize: 1000000
//     },
//     fileFilter(req, file, cb){
//         //Checking the file extension 
//         //file.originalname.endsWith('.pdf)
//         if(!file.originalname.match(/\.(doc|docx)$/)){
//             return cb(new Error('Please provide a doc file'))
//         }

//         cb(undefined, true)
//     }
// })

// //Uploading Avatar image
// app.post('/users/avatar', upload.single('upload'), (req, res ) => {
//     console.log('testing')
//     res.send()
// }, (error, req, res, next) => {
//     res.status(400).send({ error: error.message })
// })


//Uses json method to come all request in json format
app.use(express.json())
//Calling all routes here
app.use(userRouter)
app.use(taskRouter)

app.listen( port, () => {

    console.log(`Server is connect at port ${port }`)
})

const Task = require('./models/task')
const User = require('./models/user')

// const main = async () => {
//     //One to one relationship
//     // const task = await Task.findById('5ea19ee21484472ab0c23a77')
//     // await task.populate('userId').execPopulate()
//     // console.log(task.userId)

//     const user = await User.findById('5ea19e951484472ab0c23a75')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks)
// }

// main()