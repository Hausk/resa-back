// app/models/role.ts
import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import User from './user.js'

export default class Role extends BaseModel {
  static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare description: string | null

  @column({
    serializeAs: 'permissions',
    consume: (value) => value,
    prepare: (value) => JSON.stringify(value),
  })
  declare permissions: string[]

  @column()
  declare isActive: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => User)
  declare users: HasMany<typeof User>
}
