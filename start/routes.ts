/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const AuthController = () => import('#controllers/auth_controller')
const BookingsController = () => import('#controllers/bookings_controller')
const DesksController = () => import('#controllers/desks_controller')

/*
|--------------------------------------------------------------------------
| Auth
|--------------------------------------------------------------------------
*/
router
  .group(() => {
    router.get('/google/redirect', [AuthController, 'redirect'])
    router.get('/google/callback', [AuthController, 'callback'])
    router.post('/logout', [AuthController, 'logout'])
    router.get('/me', [AuthController, 'me'])
  })
  .prefix('/auth')
router.get('/me', [AuthController, 'me'])

router
  .group(() => {
    // Routes protégées par authentification
    router.get('/desks', [BookingsController, 'desksList'])
    router.get('/rooms', [BookingsController, 'roomsList'])
    router.get('/desks/:id/availability', [BookingsController, 'checkDeskAvailability'])
    router.get('/desks/:id/bookings', [BookingsController, 'getDeskBookings'])
    router.post('/bookings', [BookingsController, 'bookDesk'])
    router.post('/desk', [DesksController, 'store'])
    router.put('/desk/:id', [DesksController, 'update'])
    router.delete('/desk/:id', [DesksController, 'destroy'])
    router.get('/me', [BookingsController, 'getCurrentUser'])
    router.get('/bookings/:userId', [BookingsController, 'getUsersBookings'])
  })
  .prefix('/api')
