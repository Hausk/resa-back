import { UserFactory } from '#database/factories/user_factory'
import Role from '#models/role'
import User from '#models/user'

export async function loginWithGoogleMock(type: string | null) {
  let role = await Role.findBy('name', 'user')
  if (type === 'admin') {
    role = await Role.create({
      name: 'admin',
      description: 'Administrateur',
      permissions: ['*'],
      isActive: true,
    })
  } else {
    role = await Role.create({
      name: 'user',
      description: 'Utilisateur',
      permissions: ['read', 'write'],
      isActive: true,
    })
  }

  const user = await UserFactory.merge({
    roleId: role.id,
  }).create()

  const token = await User.accessTokens.create(user, ['*'], {
    name: 'auth_token',
    expiresIn: '30 days',
  })

  return {
    user,
    token: token.value!.release(),
  }
}
