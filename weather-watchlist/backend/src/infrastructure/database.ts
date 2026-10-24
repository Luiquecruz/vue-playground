import mysql, { type Pool } from 'mysql2/promise'
import type { Environment } from '../config/environment.js'

/**
 * Creates the MySQL connection pool.
 */
export function createDatabasePool(environment: Environment): Pool {
  return mysql.createPool({
    host: environment.MYSQL_HOST,
    port: environment.MYSQL_PORT,
    user: environment.MYSQL_USER,
    password: environment.MYSQL_PASSWORD,
    database: environment.MYSQL_DATABASE,
    connectionLimit: 10,
    decimalNumbers: true,
    dateStrings: false,
    timezone: 'Z',
  })
}

/**
 * Creates the database schema when it does not exist.
 */
export async function migrate(pool: Pool): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS cities (
      id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(120) NOT NULL,
      country VARCHAR(120) NOT NULL,
      latitude DECIMAL(8, 5) NOT NULL,
      longitude DECIMAL(8, 5) NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      UNIQUE KEY cities_coordinates_unique (latitude, longitude)
    )
  `)
}
