import type { HttpContext } from '@adonisjs/core/http'

import Desk from '#models/desk'

export default class DesksController {
  async store({ request, response, auth }: HttpContext) {
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
  async update({ request, response, auth }: HttpContext) {
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
  async destroy({ request, response, auth }: HttpContext) {
    await auth.authenticate()
    const desk = await Desk.findOrFail(request.param('id'))

    await desk.delete()

    return response.ok({ message: 'Desk deleted successfully' })
  }
}
