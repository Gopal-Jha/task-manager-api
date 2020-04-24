require('../src/db/mongoose')
const Task = require('../src/models/task')


// Task.findByIdAndDelete('5ea040d0991d472acca7e5c0').then( (task) => {
    
//     if(!task){
//         return console.log('Task Not found')
//     }
//     console.log(task)

//     return Task.countDocuments({ completed: false})
// }).then( (count) => {

//     console.log(count)
// }).catch( (error) => {

//     console.log(error)
// })

const task = async ( id, completed ) => {

    const deleteTask = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed })
    return count
}

task('5ea03e190db7452614619304', false).then( (count) => {

    console.log(count)
}).catch( (error) => {

    console.log(error)
})