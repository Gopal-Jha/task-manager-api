const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name )=> {
    sgMail.send({
        to: email,
        from: 'gopal.jha@techconfer.in',
        subject: 'This is a test mail from sendGrid',
        text: `Welcome to the app, ${name} . Let me know how you get the app.`
    }).then(() => {
        console.log('Message sent')
    }).catch((error) => {
        console.log(error.response.body)
        // console.log(error.response.body.errors[0].message)
    })
}

const sendCancelEmail = (email, name )=> {
    sgMail.send({
        to: email,
        from: 'gopal.jha@techconfer.in',
        subject: 'Tell us the problem coming with app',
        text: `We are sorry to know, ${name}  that you cancel your account.Please tell us which things we have to change.`
    }).then(() => {
        console.log('Message sent')
    }).catch((error) => {
        console.log(error.response.body)
        // console.log(error.response.body.errors[0].message)
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelEmail
}