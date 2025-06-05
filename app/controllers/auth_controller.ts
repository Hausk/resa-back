import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import Role from '#models/role'
import { randomUUID } from 'node:crypto'

export default class AuthController {
  async redirectToGoogle({ ally }: HttpContext) {
    return ally.use('google').redirect()
  }

  async handleGoogleCallback({ ally, response }: HttpContext) {
    const google = ally.use('google')

    if (google.accessDenied()) {
      return 'Access was denied'
    }

    if (google.stateMisMatch()) {
      return 'Invalid state'
    }

    if (google.hasError()) {
      return google.getError()
    }

    const googleUser = await google.user()

    // Récupérer ou créer le rôle par défaut
    let defaultRole = await Role.query().where('name', 'user').first()
    if (!defaultRole) {
      defaultRole = await Role.create({
        name: 'user',
        description: 'Utilisateur standard',
        permissions: ['reservation.create', 'reservation.read.own'],
        isActive: true,
      })
    }

    const user = await User.firstOrCreate(
      { email: googleUser.email },
      {
        id: randomUUID(),
        fullName: googleUser.name,
        password: crypto.randomUUID(), // générer un mot de passe aléatoire
        email: googleUser.email,
        avatar: googleUser.avatarUrl,
        roleId: defaultRole.id, // Assigner le rôle par défaut
      }
    )

    const token = await User.accessTokens.create(user, ['*'], {
      name: 'google_login',
      expiresIn: '30 days',
    })

    return response
      .redirect()
      .toPath(`http://localhost:3000/auth/callback?token=${token.value!.release()}`)
  }

  async test({ auth, response }: HttpContext) {
    await auth.authenticate()

    const user = auth.user!
    return response.ok({
      id: user.id,
      email: user.email,
      fullName: user.fullName,
    })
  }

  async getAuthenticatedUser({ auth, response }: HttpContext) {
    await auth.authenticate()

    const user = auth.user!

    // Charger les relations pour avoir les infos complètes
    await user.load('role')
    await user.load('teams')

    return response.ok({
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      avatar: user.avatar,
      role: user.role
        ? {
            id: user.role.id,
            name: user.role.name,
            permissions: user.role.permissions,
          }
        : null,
      teams: user.teams.map((team) => ({
        uuid: team.uuid,
        name: team.name,
        color: team.color,
        roleInTeam: team.$extras.pivot_role_in_team,
      })),
    })
  }

  async logoutUser({ auth, response }: HttpContext) {
    await auth.authenticate()

    const token = auth.user?.currentAccessToken
    if (token) {
      await User.accessTokens.delete(auth.user!, token.identifier)
    }
    response.clearCookie('auth_token')

    return response.redirect().toPath(`http://localhost:3000/login`)
  }
}
