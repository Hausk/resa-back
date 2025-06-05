import { BookingFactory } from '#database/factories/booking_factory'
import { DeskFactory } from '#database/factories/desk_factory'
import { UserFactory } from '#database/factories/user_factory'
import { loginWithGoogleMock } from '#tests/helpers/auth'
import { test } from '@japa/runner'
import { DateTime } from 'luxon'

test.group('Bookings', (group) => {
  let token: string
  let userId: string

  group.setup(async () => {
    const auth = await loginWithGoogleMock('admin')
    token = auth.token
    userId = auth.user.id
  })

  test('Bookings a desk', async ({ assert, client }) => {
    const desk = await DeskFactory.create()
    const periods = ['morning', 'afternoon', 'full'] as const
    const response = await client
      .post('/api/bookings')
      .bearerToken(token)
      .json({
        deskId: desk.id,
        date: DateTime.now().plus({ days: 1 }).toISODate(),
        period: periods[Math.floor(Math.random() * periods.length)],
      })

    response.assertStatus(201)
    assert.equal(response.body().deskId, desk.id)
  })

  test("fetch other user's bookings", async ({ client }) => {
    const desk = await DeskFactory.create()
    const otherUser = await UserFactory.create()
    console.log([desk.id, otherUser.id])
    const booking = await BookingFactory.merge({
      userId: otherUser.id,
      deskId: desk.id,
    }).create()
    console.log(booking)
    const response = await client
      .get(`/api/bookings/user/${otherUser.id}`)
      .header('Authorization', `Bearer ${token}`)
    console.log(response.body())

    response.assertStatus(200)
    response.assertBodyContains([{ userId: otherUser.id, deskId: desk.id }])
  })
  test('can delete other user booking', async ({ assert, client }) => {
    const desk = await DeskFactory.create()
    const otherUser = await UserFactory.create()
    const booking = await BookingFactory.merge({
      userId: otherUser.id,
      deskId: desk.id,
    }).create()

    const response = await client.delete(`/api/bookings/${booking.id}`).bearerToken(token)

    response.assertStatus(200)
    const checkResponse = await client.get('/api/bookings').bearerToken(token)

    assert.isFalse(checkResponse.body().some((b: any) => b.id === booking.id))
  })
})
