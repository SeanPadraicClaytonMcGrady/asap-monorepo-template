import { randomUUID } from "node:crypto";
import { eq, MockDb } from "@asap/db";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { AddUserUseCase } from "./add-user.use-case";

describe("AddUserUseCase", () => {
	const mockDb = new MockDb();
	let db: ReturnType<typeof mockDb.getDb>;
	let schema: ReturnType<typeof mockDb.getSchema>;
	beforeEach(async () => {
		await mockDb.on();
		db = mockDb.getDb();
		schema = mockDb.getSchema();
	}, 60000);

	afterEach(async () => {
		await mockDb.off();
	}, 60000);

	it("should validate input correctly", async () => {
		const testUUID = randomUUID();
		const validInput = {
			id: testUUID,
			name: "John Doe",
			email: "john.doe@example.com",
			emailVerified: true,
			image: "https://example.com/image.jpg",
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		const useCase = new AddUserUseCase(validInput, db, schema);

		const validatedData = useCase.validate();
		expect(validatedData).toEqual(validInput);
	});

	it("should execute use case successfully", async () => {
		const userId = randomUUID();
		const validInput = {
			id: userId,
			name: "John Doe",
			email: "john.doe@example.com",
			emailVerified: true,
			image: "https://example.com/image.jpg",
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		const useCase = new AddUserUseCase(validInput, db, schema);

		await useCase.execute();
		const newData = await db
			.select()
			.from(schema.user)
			.where(eq(schema.user.id, userId));
		// TODO: Add assertions based on expected output
		// console.log(result)
		expect(newData[0]!.id).toEqual(userId);
	});
}, 60000);
