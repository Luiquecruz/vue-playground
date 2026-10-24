import type { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise'
import { ConflictError } from '../../shared/errors.js'
import type { City, NewCity } from './city.types.js'

interface CityRow extends RowDataPacket {
  id: number
  name: string
  country: string
  latitude: number
  longitude: number
  created_at: Date
}

const CITY_COLUMNS = 'id, name, country, latitude, longitude, created_at'

/**
 * Persists cities in MySQL.
 */
export class CityRepository {
  constructor(private readonly pool: Pool) {}

  async findAll(): Promise<City[]> {
    const [rows] = await this.pool.query<CityRow[]>(`SELECT ${CITY_COLUMNS} FROM cities ORDER BY name ASC`)
    return rows.map(toCity)
  }

  async findById(id: number): Promise<City | null> {
    const [rows] = await this.pool.query<CityRow[]>(`SELECT ${CITY_COLUMNS} FROM cities WHERE id = ?`, [id])
    const [row] = rows
    return row ? toCity(row) : null
  }

  async create(city: NewCity): Promise<City> {
    try {
      const [result] = await this.pool.execute<ResultSetHeader>(
        'INSERT INTO cities (name, country, latitude, longitude) VALUES (?, ?, ?, ?)',
        [city.name, city.country, city.latitude, city.longitude],
      )
      const created = await this.findById(result.insertId)
      if (!created) {
        throw new Error(`City ${result.insertId} was not persisted`)
      }
      return created
    } catch (error) {
      if (isDuplicateEntry(error)) {
        throw new ConflictError(`${city.name} is already on the watchlist`)
      }
      throw error
    }
  }

  async delete(id: number): Promise<boolean> {
    const [result] = await this.pool.execute<ResultSetHeader>('DELETE FROM cities WHERE id = ?', [id])
    return result.affectedRows > 0
  }
}

function toCity(row: CityRow): City {
  return {
    id: row.id,
    name: row.name,
    country: row.country,
    latitude: row.latitude,
    longitude: row.longitude,
    createdAt: row.created_at.toISOString(),
  }
}

function isDuplicateEntry(error: unknown): boolean {
  return typeof error === 'object' && error !== null && 'code' in error && error.code === 'ER_DUP_ENTRY'
}
