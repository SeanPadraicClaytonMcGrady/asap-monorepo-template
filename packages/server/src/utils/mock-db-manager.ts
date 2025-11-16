import { mockDb } from "@asap/db/mockDb";

export async function setupTestDb() {
	await mockDb.on();
	return {
		db: mockDb.getDb(),
		schema: mockDb.getSchema(),
		teardown: async () => await mockDb.off(),
	};
}
