import type { HttpContext } from '@adonisjs/core/http'

import Role from '#models/role'

export default class RolesController {
  async getAllRoles({ response }: HttpContext) {
    // Récupérer tous les rôles
    const roles = await Role.all()
    return response.json(roles)
  }
  async getRoleById({ params, response }: HttpContext) {
    // Récupérer un rôle par son ID
    const role = await Role.find(params.id)
    if (!role) {
      return response.status(404).json({ message: 'Role not found' })
    }
    return response.json(role)
  }
  async createRole({ request, response }: HttpContext) {
    // Créer un nouveau rôle
    const roleData = request.only(['name', 'description'])
    const role = await Role.create(roleData)
    return response.status(201).json(role)
  }
  async updateRole({ params, request, response }: HttpContext) {
    // Mettre à jour un rôle existant
    const role = await Role.find(params.id)
    if (!role) {
      return response.status(404).json({ message: 'Role not found' })
    }
    const roleData = request.only(['name', 'description'])
    role.merge(roleData)
    await role.save()
    return response.json(role)
  }
  async deleteRole({ params, response }: HttpContext) {
    // Supprimer un rôle
    const role = await Role.find(params.id)
    if (!role) {
      return response.status(404).json({ message: 'Role not found' })
    }
    await role.delete()
    return response.status(204).json(null)
  }
}
