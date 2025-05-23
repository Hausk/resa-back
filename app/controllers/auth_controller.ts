import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { randomUUID } from 'node:crypto'

export default class AuthController {
  async redirect({ ally }: HttpContext) {
    return ally.use('google').redirect()
  }

  async callback({ ally, response }: HttpContext) {
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

    const user = await User.firstOrCreate(
      { email: googleUser.email },
      {
        id: randomUUID(),
        fullName: googleUser.name,
        password: crypto.randomUUID(), // générer un mot de passe aléatoire
        email: googleUser.email,
        avatar: googleUser.avatarUrl,
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
  async me({ auth, response }: HttpContext) {
    await auth.authenticate()

    const user = auth.user!

    return response.ok({
      id: user.id,
      email: user.email,
      fullName: user.fullName,
    })
  }
  async logout({ auth, response }: HttpContext) {
    await auth.authenticate()

    const token = auth.user?.currentAccessToken
    if (token) {
      await User.accessTokens.delete(auth.user!, token.identifier)
    }
    response.clearCookie('auth_token')

    return response.redirect().toPath(`http://localhost:3000/login`)
  }
}
