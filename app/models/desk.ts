import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import Reservation from './reservation.js'
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import Room from './room.js'
import Feature from './feature.js'

export default class Desk extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column()
  declare x: number

  @column()
  declare y: number

  @column()
  declare type: string

  @column()
  declare description: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare roomId: string

  @belongsTo(() => Room)
  declare room: BelongsTo<typeof Room>

  @hasMany(() => Reservation)
  declare reservations: HasMany<typeof Reservation>

  @manyToMany(() => Feature)
  declare features: ManyToMany<typeof Feature>
}
