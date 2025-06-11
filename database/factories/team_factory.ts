import Factory from '@adonisjs/lucid/factories'
import Team from '#models/team'

export const TeamFactory = Factory.define(Team, ({ faker }) => {
  return {
    name: faker.company.name(),
    description: faker.lorem.sentence(),
  }
}).build()
