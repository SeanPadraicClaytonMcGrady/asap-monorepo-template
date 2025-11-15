import {
	PostgreSqlContainer,
	type StartedPostgreSqlContainer,
} from "@testcontainers/postgresql";
import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "../schema";

export class MockDb {
	private container: StartedPostgreSqlContainer | null = null;
	private pool: Pool | null = null;
	private mockDb: NodePgDatabase<typeof schema> | null = null;
	private schema = schema;

	/**
	 * Starts a new PostgreSQL container
	 */
	async on(): Promise<void> {
		if (this.container) {
			throw new Error(
				"Database is already running. Call off() before starting a new one.",
			);
		}

		this.container = await new PostgreSqlContainer("postgres:17-alpine")
			.withDatabase("testdb")
			.withUsername("test")
			.withPassword("test")
			.withReuse()
			.start();

		const connectionString = this.container.getConnectionUri();
		this.pool = new Pool({ connectionString });
		this.mockDb = drizzle(this.pool, { schema });
	}

	/**
	 * Seeds the database with initial data
	 */
	async seed(): Promise<void> {
		if (!this.mockDb) {
			throw new Error("Database not started. Call on() first.");
		}

		// Add seed data logic here
	}

	/**
	 * Gets the mock database instance
	 */
	getDb(): NodePgDatabase<typeof schema> {
		if (!this.mockDb) {
			throw new Error("Database not started. Call on() first.");
		}
		return this.mockDb;
	}

	getSchema() {
		return this.schema;
	}

	/**
	 * Stops the PostgreSQL container and cleans up resources
	 */
	async off(): Promise<void> {
		if (this.pool) {
			await this.pool.end();
			this.pool = null;
		}

		if (this.container) {
			await this.container.stop();
			this.container = null;
		}

		this.mockDb = null;
	}
}

// Export a singleton instance
export const mockDb = new MockDb();
export type mockDbType = typeof mockDb;
