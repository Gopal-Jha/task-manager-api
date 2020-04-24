const { MongoClient, ObjectID } = require('mongodb')
//const MongoClient = mongodb.MongoClient


// const id = new ObjectID
// console.log(id.id.length)
// console.log(id.toHexString().length)

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, ( error, client )=> {
    if(error){
        return console.log(error)
    }

    const db = client.db(databaseName )

    //Insert OR ADD


    // db.collection('users').insertMany([
    //     {
    //         name: "Yogesh",
    //         age: 29
    //     }, 
    //     {
    //         name: "Shyam",
    //         age: 28
    //     }
    // ], (error, result) => {
    //     if(error){
    //         return console.log('Unable to insert documents.')
    //     }

    //     console.log(result.ops)
    // })

    // db.collection('tasks').insertMany([
    //     {
    //         description:"This is a startup description",
    //         completed: true
    //     },
    //     {
    //         description:"This is a second description",
    //         completed: true
    //     },
    //     {
    //         description:"This is a third description",
    //         completed: false
    //     }
    // ], (error, result ) => {
    //     if(error){
    //         return console.log('Unable to insert tasks documents.')
    //     }

    //     console.log(result.ops)
    // })


    //Find OR READ


    // db.collection('users').findOne({ name: "Yogesh" }, ( error, user ) => {
    //     if(error){
    //         return console.log('Unable to find user.')
    //     }

    //     console.log(user)
    // })

    // db.collection('users').find({ age: 28 }).toArray((error, users) => {
    //     if(error){

    //         return console.log('Unable to find users.')
    //     }

    //     console.log(users)
    // })

    // db.collection('users').find({ age: 28 }).count((error, count) => {
    //     if(error){

    //         return console.log('Unable to count users.')
    //     }

    //     console.log(count)
    // })

    // db.collection('tasks').findOne({ description: "This is a third description" }, ( error, task ) => {
    //     if(error){
    //         return console.log('Unable to find task.')
    //     }

    //     console.log(task)
    // })

    // db.collection('tasks').find({ completed: false }).toArray((error, tasks) => {
    //     if(error){

    //         return console.log('Unable to find tasks.')
    //     }

    //     console.log(tasks)
    // })

    // db.collection('tasks').findOne({ _id: new ObjectID("5e9f22c4086c81200c308af3") }, ( error, task ) => {
    //     if(error){
    //         return console.log('Unable to find task.')
    //     }

    //     console.log(task)
    // })


    //Update 


    // db.collection('users').updateOne({
    //     _id: new ObjectID("5e9f1cf20049a93638d66b39")
    // },{
    // //    $set:{
    // //         name: "Gopal Jha"
    // //     } 
    //     $inc: {
    //         age: 2
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    // db.collection('tasks').updateMany({
    //     completed: false
    // },{
    //    $set:{
    //         completed: true
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    //Delete

    // db.collection('users').deleteOne({
    //     name: "Yogesh"
    // }).then( (result) => {

    //     console.log(result)
    // }).catch( (error) => {

    //     console.log(error)
    // })

    db.collection('tasks').deleteMany({
        completed: false
    }).then( (result) => {

        console.log(result)
    }).catch( (error) => {
        
        console.log(error)
    })
})