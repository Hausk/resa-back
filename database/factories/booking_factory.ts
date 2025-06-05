import Factory from '@adonisjs/lucid/factories'
import Booking from '#models/booking'
import { faker } from '@faker-js/faker'
import { DateTime } from 'luxon'

export const BookingFactory = Factory.define(Booking, () => {
  return {
    userId: faker.string.uuid(),
    deskId: faker.string.uuid(),
    date: DateTime.fromJSDate(faker.date.future()),
    period: faker.helpers.arrayElement(['morning', 'afternoon', 'full']),
    status: faker.helpers.arrayElement(['pending', 'booked', 'canceled']),
  }
}).build()
