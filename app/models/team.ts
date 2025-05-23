import { BaseModel, column, manyToMany, hasOne } from '@adonisjs/lucid/orm'
import type { ManyToMany, HasOne } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import TeamRule from './team_rule.js'

export default class Team extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @manyToMany(() => User, {
    pivotTable: 'user_teams',
  })
  declare users: ManyToMany<typeof User>

  @hasOne(() => TeamRule)
  declare rule: HasOne<typeof TeamRule>
}
