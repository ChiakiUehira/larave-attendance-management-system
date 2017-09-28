const Factory = use('Factory')

Factory.blueprint('App/Model/Company', (fake) => {
  const context = {
    company_name: '株式会社 ヤマダ',
    company_name_kana: 'カブシキガイシャ ヤマダ',
    tel: fake.phone({ formatted: false }),
    email: fake.email(),
  }
  return context
})
