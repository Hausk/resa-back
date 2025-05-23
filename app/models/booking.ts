import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Booking extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare userId: string

  @column()
  declare deskId: string

  @column.date()
  declare date: DateTime

  @column()
  declare period: 'morning' | 'afternoon' | 'full'

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
}
