import { neon } from "@neondatabase/serverless"

let sql: ReturnType<typeof neon>

try {
  if (process.env.hi_DATABASE_URL) {
    console.log("[v0] Using hi_DATABASE_URL for database connection")
    sql = neon(process.env.hi_DATABASE_URL)
  }
  // Try POSTGRES_URL as fallback
  else if (process.env.POSTGRES_URL) {
    console.log("[v0] Using POSTGRES_URL for database connection")
    sql = neon(process.env.POSTGRES_URL)
  }
  // Fallback to constructed connection string using hi_ prefixed vars
  else if (process.env.hi_PGHOST && process.env.hi_PGUSER && process.env.hi_PGPASSWORD && process.env.hi_PGDATABASE) {
    console.log("[v0] Using hi_ prefixed env vars for database connection")
    const connectionString = `postgresql://${process.env.hi_PGUSER}:${process.env.hi_PGPASSWORD}@${process.env.hi_PGHOST}/${process.env.hi_PGDATABASE}?sslmode=require`
    sql = neon(connectionString)
  }
  // Fallback to constructed connection string
  else if (
    process.env.POSTGRES_HOST &&
    process.env.POSTGRES_USER &&
    process.env.POSTGRES_PASSWORD &&
    process.env.POSTGRES_DATABASE
  ) {
    console.log("[v0] Using individual env vars for database connection")
    const connectionString = `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}/${process.env.POSTGRES_DATABASE}?sslmode=require`
    sql = neon(connectionString)
  } else {
    throw new Error("No valid database connection string found")
  }
} catch (error) {
  console.error("[v0] Database connection setup failed:", error)
  // Create a dummy function that always throws to prevent runtime errors
  sql = (() => {
    throw new Error("Database connection not configured")
  }) as any
}

export { sql }
