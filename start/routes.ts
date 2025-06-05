/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

// Controllers imports
const AuthController = () => import('#controllers/auth_controller')
const UsersController = () => import('#controllers/users_controller')
const RolesController = () => import('#controllers/roles_controller')
const TeamsController = () => import('#controllers/teams_controller')
const DesksController = () => import('#controllers/desks_controller')
const RoomsController = () => import('#controllers/rooms_controller')
const RulesController = () => import('#controllers/rules_controller')
const BookingsController = () => import('#controllers/bookings_controller')
const StatisticsController = () => import('#controllers/statistics_controller')

/*
|--------------------------------------------------------------------------
| Auth Routes (Non protégées)
|--------------------------------------------------------------------------
*/
router
  .group(() => {
    router.get('/google/redirect', [AuthController, 'redirectToGoogle'])
    router.get('/google/callback', [AuthController, 'handleGoogleCallback'])
    router.post('/logout', [AuthController, 'logoutUser'])
    router.get('/me', [AuthController, 'getAuthenticatedUser'])
  })
  .prefix('/auth')

/*
|--------------------------------------------------------------------------
| API Routes (Protégées par authentification)
|--------------------------------------------------------------------------
*/
router
  .group(() => {
    /*
    |--------------------------------------------------------------------------
    | Users Management
    |--------------------------------------------------------------------------
    */
    router
      .group(() => {
        router.get('/', [UsersController, 'getAllUsers'])
        router.get('/:id', [UsersController, 'getUserById'])
        router.post('/', [UsersController, 'createUser'])
        router.put('/:id', [UsersController, 'updateUser'])
        router.delete('/:id', [UsersController, 'deleteUser'])

        // User-role association
        router.post('/:id/roles', [UsersController, 'assignUserRole'])
        router.delete('/:id/roles/:roleId', [UsersController, 'removeUserRole'])
      })
      .prefix('/users')

    /*
    |--------------------------------------------------------------------------
    | Roles Management
    |--------------------------------------------------------------------------
    */
    router
      .group(() => {
        router.get('/', [RolesController, 'getAllRoles'])
        router.get('/:id', [RolesController, 'getRoleById'])
        router.post('/', [RolesController, 'createRole'])
        router.put('/:id', [RolesController, 'updateRole'])
        router.delete('/:id', [RolesController, 'deleteRole'])
      })
      .prefix('/roles')

    /*
    |--------------------------------------------------------------------------
    | Teams Management
    |--------------------------------------------------------------------------
    */
    router
      .group(() => {
        router.get('/', [TeamsController, 'getAllTeams'])
        router.get('/:id', [TeamsController, 'getTeamById'])
        router.post('/', [TeamsController, 'createTeam'])
        router.put('/:id', [TeamsController, 'updateTeam'])
        router.delete('/:id', [TeamsController, 'deleteTeam'])

        // Team members
        router.get('/:id/members', [TeamsController, 'listTeamMembers'])
        router.post('/:id/members', [TeamsController, 'addTeamMember'])
        router.delete('/:id/members/:userId', [TeamsController, 'removeTeamMember'])
      })
      .prefix('/teams')

    /*
    |--------------------------------------------------------------------------
    | Rules Management
    |--------------------------------------------------------------------------
    */
    router
      .group(() => {
        router.get('/', [RulesController, 'getAllRules'])
        router.get('/:id', [RulesController, 'getRuleById'])
        router.post('/', [RulesController, 'createRule'])
        router.put('/:id', [RulesController, 'updateRule'])
        router.delete('/:id', [RulesController, 'deleteRule'])
      })
      .prefix('/rules')

    // BookingsController
    router
      .group(() => {
        router.get('/desks', [BookingsController, 'getDesksWithBookings'])
        router.get('/rooms', [BookingsController, 'getRoomsWithBookings'])
        router.get('/desk/:id/availability', [BookingsController, 'checkDeskAvailability'])
        router.get('/desk/:id/reservations', [BookingsController, 'getDeskBookings'])
        router.get('/my', [BookingsController, 'getMyBookings'])
        router.get('/user/:userId', [BookingsController, 'getUserBookings'])
        router.post('/', [BookingsController, 'createBooking'])
        router.delete('/:id', [BookingsController, 'deleteBooking'])
      })
      .prefix('/bookings')

    router
      .group(() => {
        router.post('/', [DesksController, 'createDesk'])
        router.get('/', [DesksController, 'getAllDesks'])
        router.patch('/:id', [DesksController, 'updateDesk'])
        router.delete('/:id', [DesksController, 'deleteDesk'])
        router.get('/:id/availability', [DesksController, 'getDeskAvailability'])
        router.get('/:id/features', [DesksController, 'getDeskFeatures'])
      })
      .prefix('/desks')
    router
      .group(() => {
        router.post('/', [RoomsController, 'createRoom'])
        router.get('/', [RoomsController, 'getAllRooms'])
        router.patch('/:id', [RoomsController, 'updateRoom'])
        router.delete('/:id', [RoomsController, 'deleteRoom'])
        router.get('/:id', [RoomsController, 'getRoomWithDesks'])
      })
      .prefix('/rooms')

    /*
    |--------------------------------------------------------------------------
    | Dashboard & Statistics (optionnel)
    |--------------------------------------------------------------------------
    */
    router
      .group(() => {
        router.get('/stats', [StatisticsController, 'getGlobalStats'])
        router.get('/usage', [StatisticsController, 'getUsageStatistics'])
        router.get('/popular', [StatisticsController, 'getPopularResources'])
      })
      .prefix('/dashboard')
  })
  .prefix('/api')
  .use(middleware.auth({ guards: ['api'] }))

/*
|--------------------------------------------------------------------------
| Health Check (Non protégée)
|--------------------------------------------------------------------------
*/
router.get('/health', async () => {
  return { status: 'ok', timestamp: new Date().toISOString() }
})
