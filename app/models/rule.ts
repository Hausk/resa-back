import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Team from './team.js'

export default class Rule extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare code: string // Code unique pour identifier la règle (ex: '2day_left', 'max_duration_4h')

  @column()
  declare description: string | null

  @column()
  declare type: 'booking_advance' | 'max_duration' | 'max_per_day' | 'time_restriction' | 'custom'

  @column()
  declare value: number // Valeur numérique (ex: 2 pour 2 jours, 4 pour 4 heures)

  @column()
  declare unit: 'days' | 'hours' | 'minutes' | 'count' | null // Unité de la valeur

  @column()
  declare conditions: Record<string, any> | null // Conditions JSON pour règles complexes

  @column()
  declare isActive: boolean

  @column()
  declare priority: number // Priorité d'application (plus le nombre est élevé, plus prioritaire)

  // Relations
  @column()
  declare teamUuid: string | null

  @belongsTo(() => Team, {
    foreignKey: 'teamUuid',
    localKey: 'uuid',
  })
  declare team: BelongsTo<typeof Team>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Méthodes utilitaires
  public static getRulesByType(type: string) {
    return this.query().where('type', type).where('is_active', true)
  }

  public static getTeamRules(teamUuid: string) {
    return this.query()
      .where('team_uuid', teamUuid)
      .where('is_active', true)
      .orderBy('priority', 'desc')
  }

  public static getGlobalRules() {
    return this.query().whereNull('team_uuid').where('is_active', true).orderBy('priority', 'desc')
  }
}
