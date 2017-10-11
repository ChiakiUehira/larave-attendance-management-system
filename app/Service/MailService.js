'use strict'

const Mail = use('Mail')
const Env = use('Env')

class MailService {
  * invite (user) {
    //todo emails.welcome にtokenとuser_idを埋める
    return yield Mail.send('emails.welcome', user, (message) => {
      message.to(user.email)
      message.from(Env.get('MAIL_USERNAME'))
      message.subject('Welcome to the Kitten\'s World')
    })
  }
}

module.exports = MailService
