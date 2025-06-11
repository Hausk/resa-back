import type { HttpContext } from '@adonisjs/core/http'

import Desk from '#models/desk'

export default class DesksController {
  async getAllDesks({ response, auth }: HttpContext) {
    await auth.authenticate()
    const desks = await Desk.query().preload('features').preload('room').orderBy('name', 'asc')

    return response.ok(desks)
  }
  async createDesk({ request, response, auth }: HttpContext) {
    await auth.authenticate()
    const { name, x, y, type, description, roomId, features } = request.body()

    const desk = await Desk.create({
      id: crypto.randomUUID(),
      name,
      x,
      y,
      type,
      description,
      roomId,
    })
    if (features) {
      await desk.related('features').sync(features)
    }

    return response.created(desk)
  }
  async updateDesk({ request, response, auth }: HttpContext) {
    await auth.authenticate()
    const { name, x, y, type, description, roomId } = request.body()

    const desk = await Desk.findOrFail(request.param('id'))

    await desk.merge({
      name,
      x,
      y,
      type,
      description,
      roomId,
    })
    await desk.save()
    return response.ok(desk)
  }
  async deleteDesk({ request, response, auth }: HttpContext) {
    await auth.authenticate()
    const desk = await Desk.findOrFail(request.param('id'))

    await desk.delete()

    return response.ok({ message: 'Desk deleted successfully' })
  }
  async getDeskAvailability({ params, response, auth }: HttpContext) {
    await auth.authenticate()
    const desk = await Desk.findOrFail(params.id)
    const availability = await desk.getAvailability() // Assuming this method exists in the Desk model
    return response.ok(availability)
  }
  async getDeskFeatures({ params, response, auth }: HttpContext) {
    await auth.authenticate()
    const desk = await Desk.findOrFail(params.id)
    await desk.load('features')
    return response.ok(desk.features)
  }
}
