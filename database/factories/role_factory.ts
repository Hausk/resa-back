import Factory from '@adonisjs/lucid/factories'
import Role from '#models/role'

export const RoleFactory = Factory.define(Role, ({ faker }) => {
  return {
    name: faker.word.adjective() + '-' + faker.word.noun(),
    description: faker.lorem.sentence(),
  }
}).build()
