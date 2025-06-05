import Desk from '#models/desk'
import Room from '#models/room'
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import Booking from '#models/booking'

export default class BookingsController {
  async getDesksWithBookings({ response, auth }: HttpContext) {
    await auth.authenticate()

    const desks = await Desk.query()
      .preload('features')
      .preload('reservations', (query) => query.preload('user'))

    return response.ok(desks)
  }

  async getRoomsWithBookings({ response, auth }: HttpContext) {
    await auth.authenticate()
    const rooms = await Room.all()
    return response.ok(rooms)
  }

  async getDeskBookings({ params, response, auth }: HttpContext) {
    await auth.authenticate()
    const { id: deskId } = params
    const desk = await Desk.find(deskId)
    if (!desk) return response.notFound({ message: 'Bureau non trouvé' })
    const today = DateTime.now().toFormat('yyyy-MM-dd')
    const reservations = await Booking.query()
      .where('deskId', deskId)
      .where('date', '>=', today)
      .preload('user')
      .orderBy('date', 'asc')
    return response.ok(reservations)
  }

  /**
   * Vérifie la disponibilité d'un bureau pour une date et période
   */
  async checkDeskAvailability({ params, request, response, auth }: HttpContext) {
    await auth.authenticate()

    const { id: deskId } = params
    const { date, period } = request.qs()

    if (!date || !['morning', 'afternoon', 'full'].includes(period)) {
      return response.badRequest({ message: 'Date ou période invalide' })
    }

    const desk = await Desk.find(deskId)
    if (!desk) return response.notFound({ message: 'Bureau non trouvé' })

    const isAvailable = await this.isDeskAvailable(deskId, date, period)
    return response.ok({ available: isAvailable })
  }

  /**
   * Crée une réservation pour un bureau
   */
  async createBooking({ request, response, auth }: HttpContext) {
    const user = await auth.authenticate()
    const { deskId, date, period } = request.only(['deskId', 'date', 'period'])

    if (!deskId || !date || !['morning', 'afternoon', 'full'].includes(period)) {
      return response.badRequest({ message: 'Champs requis manquants ou invalides' })
    }

    const desk = await Desk.find(deskId)
    if (!desk) return response.notFound({ message: 'Bureau non trouvé' })

    const isAvailable = await this.isDeskAvailable(deskId, date, period)
    if (!isAvailable) {
      return response.conflict({ message: 'Bureau déjà réservé pour cette période' })
    }

    const reservation = await Booking.create({
      id: crypto.randomUUID(),
      deskId,
      userId: user.id,
      date,
      period,
    })

    await Booking.load('user')
    await Booking.load('desk')

    return response.created(reservation)
  }

  /**
   * Récupère les réservations futures pour un bureau
   */
  async getDeskReservations({ params, response, auth }: HttpContext) {
    await auth.authenticate()

    const { id: deskId } = params
    const desk = await Desk.find(deskId)
    if (!desk) return response.notFound({ message: 'Bureau non trouvé' })

    const today = DateTime.now().toFormat('yyyy-MM-dd')
    const reservations = await Booking.query()
      .where('deskId', deskId)
      .where('date', '>=', today)
      .preload('user')
      .orderBy('date', 'asc')

    return response.ok(reservations)
  }

  /**
   * Récupère les réservations de l'utilisateur connecté
   */
  async getMyBookings({ auth, response }: HttpContext) {
    const user = await auth.authenticate()
    const reservations = await Booking.query()
      .where('userId', user.id)
      .preload('desk')
      .orderBy('date', 'asc')

    return response.ok(reservations)
  }

  /**
   * Récupère les réservations d'un utilisateur (par admin)
   */
  async getUserBookings({ params, response, auth }: HttpContext) {
    await auth.authenticate()

    const { userId } = params
    const reservations = await Booking.query()
      .where('userId', userId)
      .preload('desk')
      .orderBy('date', 'asc')

    return response.ok(reservations)
  }
  async deleteBooking({ params, response, auth }: HttpContext) {
    const user = await auth.authenticate()
    const { id: reservationId } = params
    const reservation = await Booking.find(reservationId)
    if (!reservation) return response.notFound({ message: 'Réservation non trouvée' })
    if (Booking.userId !== user.id) {
      return response.forbidden({ message: 'Vous ne pouvez pas supprimer cette réservation' })
    }
    await Booking.delete()
    return response.ok({ message: 'Réservation supprimée avec succès' })
  }

  /**
   * Vérifie si un bureau est disponible pour une date/période donnée
   */
  private async isDeskAvailable(deskId: string, date: string, period: string): Promise<boolean> {
    const reservations = await Booking.query().where('deskId', deskId).where('date', date)

    return !reservations.some((r) => {
      return r.period === 'full' || period === 'full' || r.period === period
    })
  }
}
