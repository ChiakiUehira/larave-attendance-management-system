const Factory = use('Factory')
const m = require('moment')

Factory.blueprint('App/Model/Attendance', (fake) => {
  const mouth = fake.natural({min: 1, max: 12})
  const day = fake.natural({min: 1, max: 30})
  const hours = fake.natural({min: 0, max: 23})
  const add = fake.natural({min: 1, max: 12})

  const moment = m(new Date(`2017-${mouth}-${day} ${('0' + hours).slice(-2)}:00`))
  const context = {
    user_id: 1,
    started_at: moment.format('YYYY-MM-DD HH:mm'),
    ended_at: moment.clone().add(Number(add), 'hours').format('YYYY-MM-DD HH:mm'),
    memo: '今日も楽しく仕事ができました'
  }
  return context
})
