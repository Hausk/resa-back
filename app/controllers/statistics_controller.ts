import type { HttpContext } from '@adonisjs/core/http'

export default class StatisticsController {
  async getGlobalStats({ response, auth }: HttpContext) {
    await auth.authenticate()

    // Simulate fetching statistics data
    const statistics = {
      totalUsers: 100,
      totalBookings: 250,
      totalDesks: 50,
      totalRooms: 10,
      bookingsToday: 5,
    }

    return response.ok(statistics)
  }
  async getUsageStatistics({ response, auth }: HttpContext) {
    await auth.authenticate()

    // Simulate fetching booking trends data
    const trends = [
      { date: '2023-10-01', bookings: 10 },
      { date: '2023-10-02', bookings: 15 },
      { date: '2023-10-03', bookings: 20 },
      // ... more data
    ]

    return response.ok(trends)
  }
  async getPopularResources({ response, auth }: HttpContext) {
    await auth.authenticate()

    // Simulate fetching user activity data
    const userActivity = [
      { userId: '1', bookings: 5, lastLogin: '2023-10-03' },
      { userId: '2', bookings: 3, lastLogin: '2023-10-02' },
      // ... more data
    ]

    return response.ok(userActivity)
  }
}
