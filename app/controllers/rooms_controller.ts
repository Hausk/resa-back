import type { HttpContext } from '@adonisjs/core/http'

import Room from '#models/room'

export default class RoomsController {
  async getAllRooms({ response, auth }: HttpContext) {
    await auth.authenticate()
    const rooms = await Room.all()
    return response.ok(rooms)
  }
  async getRoomById({ params, response, auth }: HttpContext) {
    await auth.authenticate()
    const room = await Room.find(params.id)
    if (!room) {
      return response.notFound({ message: 'Salle non trouvée' })
    }
    return response.ok(room)
  }
  async createRoom({ request, response, auth }: HttpContext) {
    await auth.authenticate()
    const roomData = request.only(['name', 'description', 'capacity'])
    const room = await Room.create({
      ...roomData,
      id: crypto.randomUUID(),
    })
    return response.created(room)
  }
  async updateRoom({ params, request, response, auth }: HttpContext) {
    await auth.authenticate()
    const room = await Room.find(params.id)
    if (!room) {
      return response.notFound({ message: 'Salle non trouvée' })
    }
    const roomData = request.only(['name', 'description', 'capacity'])
    room.merge(roomData)
    await room.save()
    return response.ok(room)
  }
  async deleteRoom({ params, response, auth }: HttpContext) {
    await auth.authenticate()
    const room = await Room.find(params.id)
    if (!room) {
      return response.notFound({ message: 'Salle non trouvée' })
    }
    await room.delete()
    return response.noContent()
  }
  async getRoomWithDesks({ params, response, auth }: HttpContext) {
    await auth.authenticate()
    const room = await Room.query().where('id', params.id).preload('desks').first()

    if (!room) {
      return response.notFound({ message: 'Salle non trouvée' })
    }

    return response.ok(room)
  }
}
