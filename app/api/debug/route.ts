import { neon } from "@neondatabase/serverless"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    console.log("[v0] Testing database connection...")

    // Test different connection methods
    const methods = [
      {
        name: "POSTGRES_URL",
        connection: process.env.POSTGRES_URL,
      },
      {
        name: "Constructed string",
        connection: `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}/${process.env.POSTGRES_DATABASE}?sslmode=require`,
      },
    ]

    const results = []

    for (const method of methods) {
      try {
        if (!method.connection) {
          results.push({
            method: method.name,
            status: "error",
            error: "Connection string is undefined",
          })
          continue
        }

        console.log(`[v0] Testing ${method.name}:`, method.connection?.substring(0, 50) + "...")

        const sql = neon(method.connection)
        const result = await sql`SELECT 1 as test`

        results.push({
          method: method.name,
          status: "success",
          result: result,
        })
      } catch (error) {
        console.error(`[v0] Error with ${method.name}:`, error)
        results.push({
          method: method.name,
          status: "error",
          error: error instanceof Error ? error.message : String(error),
        })
      }
    }

    return NextResponse.json({
      environment_variables: {
        POSTGRES_URL: process.env.POSTGRES_URL ? "present" : "missing",
        POSTGRES_HOST: process.env.POSTGRES_HOST ? "present" : "missing",
        POSTGRES_USER: process.env.POSTGRES_USER ? "present" : "missing",
        POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD ? "present" : "missing",
        POSTGRES_DATABASE: process.env.POSTGRES_DATABASE ? "present" : "missing",
      },
      connection_tests: results,
    })
  } catch (error) {
    console.error("[v0] Debug endpoint error:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
