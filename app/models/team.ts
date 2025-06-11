import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany, hasMany } from '@adonisjs/lucid/orm'
import type { ManyToMany, HasMany } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Rule from './rule.js'

export default class Team extends BaseModel {
  @column({ isPrimary: true })
  declare uuid: string

  @column()
  declare name: string

  @column()
  declare description: string | null

  @column()
  declare color: string | null // Couleur pour l'affichage dans l'interface

  @column()
  declare isActive: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Relation Many-to-Many avec User (adaptée à votre table pivot)
  @manyToMany(() => User, {
    pivotTable: 'user_teams',
    localKey: 'uuid',
    pivotForeignKey: 'team_uuid',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'user_id',
    pivotTimestamps: true,
    pivotColumns: ['role_in_team', 'joined_at'],
  })
  declare users: ManyToMany<typeof User>

  // Relation avec les règles
  @hasMany(() => Rule)
  declare rules: HasMany<typeof Rule>
}
