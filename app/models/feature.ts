import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import Desk from './desk.js'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Feature extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @manyToMany(() => Desk)
  declare desks: ManyToMany<typeof Desk>
}
