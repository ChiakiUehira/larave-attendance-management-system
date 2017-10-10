'use strict'

const Mail = use('Mail')
const Env = use('Env')

class MailService {
  * invite (user) {
    return yield Mail.send('emails.welcome', user, (message) => {
      message.to(user.email)// message.to('user.email', 'user.firstname')
      message.from(Env.get('MAIL_USERNAME'))
      message.subject('Welcome to the Kitten\'s World')
    })
  }
}

module.exports = MailService
