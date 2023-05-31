const nodemailer = require('nodemailer');
const User = require("../../database/models/User");

class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })
    }

    async activateAccount(activationLink) {

        // Check if user exist
        const existingUser = await User.findOne({ activationLink: activationLink })
        if (!existingUser) {
          throw new Error(`User no exist!`);
        }

        existingUser.isActivated = true
        const savedUser = await existingUser.save()
        if (!savedUser) {
          throw new Error(`User save error!`);
        }
        
        return true
    }

    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Account activation LogoGenerator',
            text: '',
            html:
                `
                    <div>
                        <h1>To activate your account, please click on this link</h1>
                        <a href="${link}">${link}</a>
                    </div>
                `
        })

        return {
            link
        }
      
    }

}

module.exports = new MailService()