const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

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
    }).catch((error) => {
        console.log(error)
    })
}

const sendRequestEmail = ( email , Token) => {
    sgMail.send({
        to: email,
        from: 'jahid.aust39@gmail.com',
        subject: 'Confirm Your Account!',
        text: 'You are receiving this because you (or someone else) have requested to create account.\n\n' +
        'Please click on the following link and give passwords to create your account \n\n' +
        process.env.FRONTEND_URL+'setPasswordForNewPatient/' + Token + '\n\n' +
        'If you did not request this, please ignore this email and your password will remain unchanged.\n'  
    }).then(() => {
    }).catch((error) => {
        console.log(error)
    })
}

const sendResetEmail = ( email , token) => {
    sgMail.send({
        to: email ,
        from: 'jahid.aust39@gmail.com',
        subject: 'Password Reset For Smart Nurse!',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          process.env.FRONTEND_URL+'resetPassword/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
    }).then(() => {
    }).catch((error) => {
        console.log(error)
    })
}

const sendCancelationEmail =( email , name) => {
    sgMail.send({
        to: email,
        from: 'jahid.aust39@gmail.com',
        subject: 'Sorry to see you go!',
        text: 'Goodbye sd. I hope to see you back sometime soon.' 
    }).then(() => {
    }).catch((error) => {
        console.log(error)
    })
}

module.exports = {
    sendWelcomeEmail ,
    sendCancelationEmail ,
    sendResetEmail ,
    sendRequestEmail
}