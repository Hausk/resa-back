import Factory from '@adonisjs/lucid/factories'
import Room from '#models/room'
import { faker } from '@faker-js/faker'

export const RoomFactory = Factory.define(Room, () => {
  return {
    id: faker.string.uuid(),
    name: faker.commerce.department(),
    label: faker.commerce.productAdjective(),
    x: faker.number.int({ min: 0, max: 1000 }),
    y: faker.number.int({ min: 0, max: 1000 }),
    width: faker.number.int({ min: 100, max: 300 }),
    height: faker.number.int({ min: 100, max: 300 }),
    type: faker.helpers.arrayElement(['meeting', 'open-space', 'private']),
    capacity: faker.number.int({ min: 2, max: 20 }),
    description: faker.lorem.sentence(),
    color: faker.color.human(),
    position: faker.helpers.arrayElement(['top-left', 'bottom-right', 'center']),
  }
}).build()
