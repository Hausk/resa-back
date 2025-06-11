import Rule from '#models/rule'
import Team from '#models/team'
import type { HttpContext } from '@adonisjs/core/http'

export default class RulesController {
  async getAllRules({ response, auth }: HttpContext) {
    await auth.authenticate()
    const rules = await Rule.all()
    return response.ok(rules)
  }
  async getRuleById({ params, response, auth }: HttpContext) {
    await auth.authenticate()
    const rule = await Rule.find(params.id)
    if (!rule) {
      return response.notFound({ message: 'Règle non trouvée' })
    }
    return response.ok(rule)
  }
  async createRule({ request, response, auth }: HttpContext) {
    await auth.authenticate()
    const ruleData = request.only(['name', 'description', 'conditions', 'actions'])
    const rule = await Rule.create({
      ...ruleData,
    })
    return response.created(rule)
  }
  async updateRule({ params, request, response, auth }: HttpContext) {
    await auth.authenticate()
    const rule = await Rule.find(params.id)
    if (!rule) {
      return response.notFound({ message: 'Règle non trouvée' })
    }
    const ruleData = request.only(['name', 'description', 'conditions', 'actions'])
    rule.merge(ruleData)
    await rule.save()
    return response.ok(rule)
  }
  async deleteRule({ params, response, auth }: HttpContext) {
    await auth.authenticate()
    const rule = await Rule.find(params.id)
    if (!rule) {
      return response.notFound({ message: 'Règle non trouvée' })
    }
    await rule.delete()
    return response.noContent()
  }
  async assignRuleToTeam({ params, request, response, auth }: HttpContext) {
    await auth.authenticate()
    const rule = await Rule.find(params.id)
    if (!rule) {
      return response.notFound({ message: 'Règle non trouvée' })
    }
    const { teamId } = request.only(['teamId'])
    const team = await Team.find(teamId)
    if (!team) {
      return response.notFound({ message: 'Équipe non trouvée' })
    }
    await rule.teams().attach([team.id])
    return response.ok({ message: "Règle assignée à l'équipe avec succès" })
  }
  async removeRuleFromTeam({ params, response, auth }: HttpContext) {
    await auth.authenticate()
    const rule = await Rule.find(params.id)
    if (!rule) {
      return response.notFound({ message: 'Règle non trouvée' })
    }
    const team = await Team.find(params.teamId)
    if (!team) {
      return response.notFound({ message: 'Équipe non trouvée' })
    }
    await rule.teams().detach([team.id])
    return response.ok({ message: "Règle retirée de l'équipe avec succès" })
  }
  async listRulesForTeam({ params, response, auth }: HttpContext) {
    await auth.authenticate()
    const team = await Team.find(params.id)
    if (!team) {
      return response.notFound({ message: 'Équipe non trouvée' })
    }
    await team.load('rules')
    return response.ok(team.rules)
  }
}
