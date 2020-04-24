require('../src/db/mongoose')
const User = require('../src/models/user')


// User.findByIdAndUpdate('5ea03e300db7452614619305', { age: 3}).then( (user) => {

//     console.log(user)
//     return User.countDocuments({ age: 3 })
// }).then( (count) => {

//     console.log(count)
// }).catch((error ) => {
//     console.log(error)
// })

const user = async (id, age) => {
    const updateUser = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({ age })
    return count
}

user('5ea03e300db7452614619305', 2).then( (count) => {
    console.log(count)
}).catch( (error) => {

    console.log(error)
})