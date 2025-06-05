import type { HttpContext } from '@adonisjs/core/http'

import Team from '#models/team'

export default class TeamsController {
  async getAllTeams({ response, auth }: HttpContext) {
    await auth.authenticate()
    const teams = await Team.all()
    return response.ok(teams)
  }
  async getTeamById({ params, response, auth }: HttpContext) {
    await auth.authenticate()
    const team = await Team.find(params.id)
    if (!team) {
      return response.notFound({ message: 'Équipe non trouvée' })
    }
    return response.ok(team)
  }
  async createTeam({ request, response, auth }: HttpContext) {
    await auth.authenticate()
    const teamData = request.only(['name', 'color'])
    const team = await Team.create({
      ...teamData,
      uuid: crypto.randomUUID(),
    })
    return response.created(team)
  }
  async updateTeam({ params, request, response, auth }: HttpContext) {
    await auth.authenticate()
    const team = await Team.find(params.id)
    if (!team) {
      return response.notFound({ message: 'Équipe non trouvée' })
    }
    const teamData = request.only(['name', 'color'])
    team.merge(teamData)
    await team.save()
    return response.ok(team)
  }
  async deleteTeam({ params, response, auth }: HttpContext) {
    await auth.authenticate()
    const team = await Team.find(params.id)
    if (!team) {
      return response.notFound({ message: 'Équipe non trouvée' })
    }
    await team.delete()
    return response.noContent()
  }
  async listTeamMembers({ params, response, auth }: HttpContext) {
    await auth.authenticate()
    const team = await Team.find(params.id)
    if (!team) {
      return response.notFound({ message: 'Équipe non trouvée' })
    }
    await team.load('users')
    return response.ok(team.users)
  }
  async addTeamMember({ params, request, response, auth }: HttpContext) {
    await auth.authenticate()
    const team = await Team.find(params.id)
    if (!team) {
      return response.notFound({ message: 'Équipe non trouvée' })
    }
    const userId = request.input('userId')
    if (!userId) {
      return response.badRequest({ message: 'ID utilisateur requis' })
    }
    await team.related('users').save(userId)
    return response.ok({ message: "Membre ajouté à l'équipe" })
  }
  async removeTeamMember({ params, response, auth }: HttpContext) {
    await auth.authenticate()
    const team = await Team.find(params.id)
    if (!team) {
      return response.notFound({ message: 'Équipe non trouvée' })
    }
    const userId = params.userId
    if (!userId) {
      return response.badRequest({ message: 'ID utilisateur requis' })
    }
    await team.related('users').query().where('id', userId).delete()
    return response.ok({ message: "Membre retiré de l'équipe" })
  }
}
