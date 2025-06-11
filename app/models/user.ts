import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import {
  BaseModel,
  column,
  hasMany,
  manyToMany,
  belongsTo,
  beforeCreate,
} from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import Reservation from './reservation.js'
import Role from './role.js'
import Team from './team.js'
import type { HasMany, ManyToMany, BelongsTo } from '@adonisjs/lucid/types/relations'
import { randomUUID } from 'node:crypto'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  static selfAssignPrimaryKey = true
  @column({ isPrimary: true })
  declare id: string

  @beforeCreate()
  static assignUuid(user: User) {
    user.id = randomUUID()
  }

  @column()
  declare fullName: string | null

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare avatar: string | null

  // Relation avec Role (One-to-Many - un utilisateur a un seul rôle)
  @column()
  declare roleId: number | null

  @belongsTo(() => Role)
  declare role: BelongsTo<typeof Role>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  static accessTokens = DbAccessTokensProvider.forModel(User)

  @hasMany(() => Reservation)
  declare reservations: HasMany<typeof Reservation>

  // Relation Many-to-Many avec Team (adaptée à votre table pivot)
  @manyToMany(() => Team, {
    pivotTable: 'user_teams',
    localKey: 'id',
    pivotForeignKey: 'user_id',
    relatedKey: 'uuid',
    pivotRelatedForeignKey: 'team_uuid',
    pivotTimestamps: true,
    pivotColumns: ['role_in_team', 'joined_at'],
  })
  declare teams: ManyToMany<typeof Team>

  // Méthodes utilitaires
  public async hasPermission(permission: string): Promise<boolean> {
    await this.load('role')
    if (!this.role) return false
    return this.role.permissions.includes(permission)
  }

  public async getTeamRules() {
    // Load teams with their rules
    await this.load('teams', (teamsQuery) => {
      teamsQuery.preload('rules', (rulesQuery) => {
        rulesQuery.where('is_active', true).orderBy('priority', 'desc')
      })
    })

    const rules: any[] = []
    for (const team of this.teams) {
      if (team.rules) {
        rules.push(...team.rules)
      }
    }

    // Trier par priorité et supprimer les doublons
    return rules
      .sort((a, b) => b.priority - a.priority)
      .filter((rule, index, self) => index === self.findIndex((r) => r.code === rule.code))
  }
}
