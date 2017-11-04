'use strict'

const Mail = use('Mail')
const Env = use('Env')
const host = Env.get('HOST_URL')

class MailService {
  * invite (user, company, token) {
    return yield Mail.send('mails.invite', { user, company, token, host }, (message) => {
      message.to(user.email)
      message.from(Env.get('MAIL_USERNAME'))
      message.subject('勤怠管理システムに招待されました')
    })
  }
}

module.exports = MailService
