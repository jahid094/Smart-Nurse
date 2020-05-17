const sgMail = require('@sendgrid/mail')



sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// sgMail.send({
//     to: 'jahid.aust39@gmail.com' ,
//     from: 'jahid.aust39@gmail.com' ,
//     subject: 'This is my first creation!' ,
//     text: 'I hope this one actually get to you.'
// })

const sendWelcomeEmail = ( email , Token) => {
    sgMail.send({
        to: email ,
        from: 'jahid.aust39@gmail.com' ,
        subject: 'Confirm Your mail !' ,
        text: 'You are receiving this because you (or someone else) have requested to create account.\n\n' +
        'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
        process.env.FRONTEND_URL+'confirmation/' + Token + '\n\n' +
        'If you did not request this, please ignore this email and your password will remain unchanged.\n'  
    }).then(() => {
        console.log('welcome message sent')
    }).catch((error) => {
        console.log(error.response.body)
        // console.log(error.response.body.errors[0].message)
    })
    console.log(Token)
    console.log(email)
    console.log(process.env.FRONTEND_URL)
}

const sendResetEmail = ( email , token) => {
    sgMail.send({
        to: email ,
        from: 'jahid.aust39@gmail.com' ,
        subject: 'Node.js Password Reset!' ,
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          process.env.FRONTEND_URL+'resetPassword/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
    }).then(() => {
        console.log('welcome message sent')
    }).catch((error) => {
        console.log(error.response.body)
        // console.log(error.response.body.errors[0].message)
    })
    console.log(token)
    console.log(email)
    console.log(process.env.FRONTEND_URL)
}

const sendCancelationEmail =( email , name) => {
    sgMail.send({
        to: email ,
        from: 'jahid.aust39@gmail.com' ,
        subject: 'Sorry to see you go!' ,
        text: 'Goodbye . I hope to see you back sometime soon.' 
    }).then(() => {
        console.log('Message sent')
    }).catch((error) => {
        console.log(error.response.body)
        // console.log(error.response.body.errors[0].message)
    })
}

module.exports = {
    sendWelcomeEmail ,
    sendCancelationEmail ,
    sendResetEmail
}

