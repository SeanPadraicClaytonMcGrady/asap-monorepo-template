import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as config from "../drizzle.config";
import * as schema from "./schema";

const pool = new Pool({ connectionString: config.default.dbCredentials.url });

export const db: NodePgDatabase<typeof schema> = drizzle(pool, {
	schema,
});
