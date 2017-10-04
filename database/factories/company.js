const Factory = use('Factory')

Factory.blueprint('App/Model/Company', (fake) => {
  const context = {
    company_name: '株式会社 ヤマダ',
    company_name_kana: 'カブシキガイシャ ヤマダ',
    address: '東京都練馬区10-20 201号室',
    tel: fake.phone({ formatted: false }),
    email: fake.email()
  }
  return context
})
