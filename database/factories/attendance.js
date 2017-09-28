const Factory = use('Factory')

Factory.blueprint('App/Model/Attendances', (fake) => {
  const context = {
    user_id: fake.last(),
    company_id: fake.last(),
    started_at: fake.last(),
    ended_at: fake.last(),
  }
  return context
})