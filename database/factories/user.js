const Factory = use('Factory')

Factory.blueprint('App/Model/User', (fake) => {
  const context = {
    company_id: 1,
    last_name: fake.last(),
    first_name: fake.first(),
    last_name_kana: 'ヤマダ',
    first_name_kana: 'タロウ',
    birthday: fake.birthday(),
    gender: fake.gender(),
    thumbnail: 'https://placehold.jp/300x300.png',
    tel: fake.phone({ formatted: false }),
    email: fake.email(),
    password: 'pw',
  }
  const manager_flag = Math.floor(Math.random()*(20-0)+0) ? 'normal' : 'manager'
  return {...context,manager_flag}
})