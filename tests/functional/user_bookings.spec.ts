import { DeskFactory } from '#database/factories/desk_factory'
import { loginWithGoogleMock } from '#tests/helpers/auth'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'
import { DateTime } from 'luxon'

test.group('Bookings', (group) => {
  let token: string
  let userId: string

  group.setup(async () => {
    testUtils.db().truncate()
    const auth = await loginWithGoogleMock('user')
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

  test("fetch current user's bookings", async ({ client }) => {
    const response = await client.get('/api/bookings/my').header('Authorization', `Bearer ${token}`)

    response.assertStatus(200)
    response.assertBodyContains([])
  })
  test('can delete a current user booking', async ({ assert, client }) => {
    const desk = await DeskFactory.create()

    const periods = ['morning', 'afternoon', 'full'] as const
    const createBooking = await client
      .post('/api/bookings')
      .bearerToken(token)
      .json({
        deskId: desk.id,
        date: DateTime.now().plus({ days: 1 }).toISODate(),
        period: periods[Math.floor(Math.random() * periods.length)],
      })

    const response = await client
      .delete(`/api/bookings/${createBooking.body().id}`)
      .bearerToken(token)

    response.assertStatus(200)
    const checkResponse = await client.get('/api/bookings/my').bearerToken(token)

    assert.isFalse(checkResponse.body().some((b: any) => b.id === createBooking.body().id))
  })
})
