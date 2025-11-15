import { mockDb, type mockDbType } from "@asap/db/mockDb";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { AddUserUseCase } from "./add-user.use-case";

describe("AddUserUseCase", async () => {
	beforeEach(async () => {
		await mockDb.on();
	}, 60000);

	afterEach(async () => {
		await mockDb.off();
	}, 60000);

	it("should validate input correctly", async () => {
		const validInput = {
			id: "123",
			name: "John Doe",
			email: "john.doe@example.com",
			emailVerified: true,
			image: "https://example.com/image.jpg",
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		const useCase = new AddUserUseCase(
			validInput,
			await mockDb.getDb(),
			await mockDb.getSchema(),
		);

		expect(() => useCase.validate()).to.not.throw();
	});

	it("should execute use case successfully", async () => {
		const validInput = {
			id: "123",
			name: "John Doe",
			email: "john.doe@example.com",
			emailVerified: true,
			image: "https://example.com/image.jpg",
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		const useCase = new AddUserUseCase(
			validInput,
			await mockDb.getDb(),
			await mockDb.getSchema(),
		);

		const result = await useCase.execute();
		// TODO: Add assertions based on expected output
		// console.log(result)
		expect(result).toBeDefined();
	});
}, 60000);
