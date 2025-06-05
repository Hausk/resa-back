import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, beforeCreate } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Desk from './desk.js'
import { randomUUID } from 'node:crypto'

export default class Booking extends BaseModel {
  static selfAssignPrimaryKey = true
  @column({ isPrimary: true })
  declare id: string

  @beforeCreate()
  static assignUuid(booking: Booking) {
    booking.id = randomUUID()
  }

  @column()
  declare userId: string

  @column()
  declare deskId: string

  @column()
  declare date: Date
  @column()
  declare period: 'morning' | 'afternoon' | 'full'

  @column()
  declare status: 'pending' | 'booked' | 'canceled'

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Desk)
  declare desk: BelongsTo<typeof Desk>
}
