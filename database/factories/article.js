
const Factory = use('Factory')

Factory.blueprint('App/Model/Article', (fake) => {
  return {
    title: fake.word(),
    content: fake.sentence({words: 5})
  }
})