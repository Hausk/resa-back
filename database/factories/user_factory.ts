import Factory from '@adonisjs/lucid/factories'
import User from '#models/user'
import { base64 } from '@adonisjs/core/helpers'

export const UserFactory = Factory.define(User, async ({ faker }) => {
  return {
    email: faker.internet.email(),
    fullName: faker.person.fullName(),
    password: await base64.encode('secret123'), // à override si nécessaire
  }
}).build()
