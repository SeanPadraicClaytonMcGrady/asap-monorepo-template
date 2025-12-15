import type { NodePgDatabase } from "drizzle-orm/node-postgres";

export { and, desc, eq } from "drizzle-orm";
export * from "drizzle-orm/node-postgres";
export { alias } from "drizzle-orm/pg-core";
export * from "./utils/helpers";
export * from "./utils/mockDb";

import type * as schema from "./schema";
export type dbType = NodePgDatabase<typeof schema>;
export type schemaType = typeof schema;
