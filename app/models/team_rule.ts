import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Team from './team.js'

export default class TeamRule extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare teamId: string

  @column()
  declare maxDaysInAdvance: number

  @column()
  declare canReserveWeekends: boolean

  @belongsTo(() => Team)
  declare team: BelongsTo<typeof Team>
}
