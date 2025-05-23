# Adonis Backend

A modern backend API built with [AdonisJS](https://adonisjs.com/) for workspace and desk management, including authentication via Google OAuth, desk reservations, and team management.

## Features

- Google OAuth authentication
- Desk and room management
- Desk reservation system with period and availability checks
- Team and team rules management
- RESTful API with JSON responses
- PostgreSQL database support

## Project Structure

```
.
├── app/
│   ├── controllers/
│   ├── exceptions/
│   ├── middleware/
│   └── models/
├── config/
├── database/
│   ├── migrations/
│   └── seeders/
├── start/
├── tests/
├── bin/
├── .env.example
├── package.json
└── tsconfig.json
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- PostgreSQL

### Setup

1. **Clone the repository**

   ```sh
   git clone <your-repo-url>
   cd adonis-backend
   ```

2. **Install dependencies**

   ```sh
   npm install
   ```

3. **Configure environment variables**

   Copy `.env.example` to `.env` and fill in the required values:

   ```sh
   cp .env.example .env
   ```

4. **Run database migrations and seeders**

   ```sh
   node ace migration:run
   node ace db:seed
   ```

5. **Start the development server**

   ```sh
   npm run dev
   ```

   The server will start on the port specified in your `.env` (default: 3333).

## Scripts

- `npm run dev` – Start the server with hot reload
- `npm run build` – Build the project for production
- `npm start` – Start the production server
- `npm test` – Run tests
- `npm run lint` – Lint the codebase
- `npm run format` – Format the codebase

## License

This project is **UNLICENSED** and intended for internal use only.

---

Made with [AdonisJS](https://adonisjs.com/)
