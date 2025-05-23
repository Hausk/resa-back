import Desk from '#models/desk'
import Reservation from '#models/reservation'
import Room from '#models/room'
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'

export default class BookingsController {
  async desksList({ response, auth }: HttpContext) {
    await auth.authenticate()

    const desks = await Desk.query()
      .preload('features')
      .preload('reservations', (query) => {
        query.preload('user')
      })

    return response.ok(desks)
  }
  async roomsList({ response, auth }: HttpContext) {
    await auth.authenticate()

    const desks = await Room.all()
    return response.ok(desks)
  }

  /**
   * Vérifie la disponibilité d'un bureau pour une date et période donnée
   */
  async checkDeskAvailability({ params, request, response, auth }: HttpContext) {
    await auth.authenticate()

    const deskId = params.id
    const date = request.input('date')
    const period = request.input('period')

    // Vérifier que les paramètres sont valides
    if (!date || !period || !['morning', 'afternoon', 'full'].includes(period)) {
      return response.badRequest({ message: 'Date et période requises' })
    }

    // Vérifier si le bureau existe
    const desk = await Desk.find(deskId)
    if (!desk) {
      return response.notFound({ message: 'Bureau non trouvé' })
    }

    // Rechercher des réservations existantes pour ce bureau à cette date
    const existingReservations = await Reservation.query()
      .where('deskId', deskId)
      .where('date', date)

    // Vérifier les conflits de réservation
    let isAvailable = true

    for (const reservation of existingReservations) {
      // Si une réservation journée complète existe, le bureau n'est pas disponible
      if (reservation.period === 'full') {
        isAvailable = false
        break
      }

      // Si on demande une journée complète mais il y a déjà une réservation
      if (period === 'full') {
        isAvailable = false
        break
      }

      // Si on demande le matin et il y a une réservation le matin
      if (period === 'morning' && reservation.period === 'morning') {
        isAvailable = false
        break
      }

      // Si on demande l'après-midi et il y a une réservation l'après-midi
      if (period === 'afternoon' && reservation.period === 'afternoon') {
        isAvailable = false
        break
      }
    }

    return response.ok({ available: isAvailable })
  }

  /**
   * Réserver un bureau
   */
  async bookDesk({ request, response, auth }: HttpContext) {
    const user = await auth.authenticate()

    const { deskId, date, period } = request.body()

    // Vérifier que les paramètres sont valides
    if (!deskId || !date || !period || !['morning', 'afternoon', 'full'].includes(period)) {
      return response.badRequest({ message: 'Tous les champs sont requis' })
    }

    // Vérifier si le bureau existe
    const desk = await Desk.find(deskId)
    if (!desk) {
      return response.notFound({ message: 'Bureau non trouvé' })
    }

    // Vérifier la disponibilité
    const existingReservations = await Reservation.query()
      .where('deskId', deskId)
      .where('date', date)

    // Vérifier les conflits de réservation
    let isAvailable = true

    for (const reservation of existingReservations) {
      if (
        reservation.period === 'full' ||
        period === 'full' ||
        (period === 'morning' && reservation.period === 'morning') ||
        (period === 'afternoon' && reservation.period === 'afternoon')
      ) {
        isAvailable = false
        break
      }
    }

    if (!isAvailable) {
      return response.conflict({ message: 'Bureau déjà réservé pour cette période' })
    }

    // Créer la réservation
    const reservation = await Reservation.create({
      id: crypto.randomUUID(),
      deskId,
      userId: user.id,
      date,
      period,
    })

    // Charger les relations
    await reservation.load('user')
    await reservation.load('desk')

    return response.created(reservation)
  }

  /**
   * Récupérer les réservations d'un bureau
   */
  async getDeskBookings({ params, response, auth }: HttpContext) {
    await auth.authenticate()

    const deskId = params.id

    // Vérifier si le bureau existe
    const desk = await Desk.find(deskId)
    if (!desk) {
      return response.notFound({ message: 'Bureau non trouvé' })
    }

    // Récupérer les réservations futures
    const today = DateTime.now().toFormat('yyyy-MM-dd')

    const bookings = await Reservation.query()
      .where('deskId', deskId)
      .where('date', '>=', today)
      .preload('user')
      .orderBy('date', 'asc')

    return response.ok(bookings)
  }

  /**
   * Récupérer l'utilisateur connecté
   */
  async getCurrentUser({ response, auth }: HttpContext) {
    const user = await auth.authenticate()
    return response.ok(user)
  }

  /**
   * Récupérer l'utilisateur connecté
   */
  async getUsersBookings({ request, response, auth }: HttpContext) {
    await auth.authenticate()
    const bookings = await Reservation.query()
      .where('userId', request.param('userId'))
      .preload('desk')
      .orderBy('date', 'asc')
    return response.ok(bookings)
  }
}
