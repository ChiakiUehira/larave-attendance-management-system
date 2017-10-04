const Factory = use('Factory')

Factory.blueprint('App/Model/News', (fake) => {
  const context = {
    company_id: 1,
    title: fake.word(),
    detail: fake.paragraph()
  }
  return context
})
