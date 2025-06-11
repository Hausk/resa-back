import Factory from '@adonisjs/lucid/factories'
import Desk from '#models/desk'
import { RoomFactory } from './room_factory.js'

export const DeskFactory = Factory.define(Desk, ({ faker }) => {
  return {
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    x: faker.number.int({ min: 0, max: 1000 }),
    y: faker.number.int({ min: 0, max: 1000 }),
    type: faker.helpers.arrayElement(['standard', 'executive', 'hotdesk']),
    description: faker.lorem.sentence(),
  }
})
  .relation('room', () => RoomFactory)
  .build()
