import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  async getAllUsers({ response, auth }: HttpContext) {
    await auth.authenticate()
    const desks = await User.all()
    return response.ok(desks)
  }
  async getUserById({ params, response, auth }: HttpContext) {
    await auth.authenticate()
    const user = await User.find(params.id)
    if (!user) {
      return response.notFound({ message: 'Utilisateur non trouvé' })
    }
    return response.ok(user)
  }
  async createUser({ request, response, auth }: HttpContext) {
    await auth.authenticate()
    const user = await User.create({
      id: crypto.randomUUID(),
      fullName: request.input('fullName'),
      password: crypto.randomUUID(),
      email: request.input('email'),
    })
    return response.created(user)
  }
  async updateUser({ params, request, response, auth }: HttpContext) {
    await auth.authenticate()
    const user = await User.find(params.id)
    if (!user) {
      return response.notFound({ message: 'Utilisateur non trouvé' })
    }
    user.fullName = request.input('fullName', user.fullName)
    user.email = request.input('email', user.email)
    user.avatar = request.input('avatar', user.avatar)
    user.roleId = request.input('roleId', user.roleId)
    await user.save()
    return response.ok(user)
  }
  async deleteUser({ params, response, auth }: HttpContext) {
    await auth.authenticate()
    const user = await User.find(params.id)
    if (!user) {
      return response.notFound({ message: 'Utilisateur non trouvé' })
    }
    await user.delete()
    return response.noContent()
  }
  async assignUserRole({ params, request, response, auth }: HttpContext) {
    await auth.authenticate()
    const user = await User.find(params.id)
    if (!user) {
      return response.notFound({ message: 'Utilisateur non trouvé' })
    }
    const roleId = request.input('roleId')
    if (!roleId) {
      return response.badRequest({ message: 'Role ID requis' })
    }
    user.roleId = roleId
    await user.save()
    return response.ok(user)
  }
  async removeUserRole({ params, response, auth }: HttpContext) {
    await auth.authenticate()
    const user = await User.find(params.id)
    if (!user) {
      return response.notFound({ message: 'Utilisateur non trouvé' })
    }
    user.roleId = null // Remove role
    await user.save()
    return response.ok(user)
  }
}
