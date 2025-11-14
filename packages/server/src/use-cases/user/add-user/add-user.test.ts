import { mockDb, type mockDbType } from "@asap/db";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { AddUserUseCase } from "./add-user.use-case";

describe("AddUserUseCase", () => {
	const db: mockDbType = mockDb;

	beforeEach(() => {
		db.on();
	});

	afterEach(() => {
		db.off();
	});

	it("should validate input correctly", () => {
		const validInput = {
			id: "123",
			name: "John Doe",
			email: "john.doe@example.com",
			emailVerified: true,
			image: "https://example.com/image.jpg",
			createdAt: new Date(),
			updatedAt: new Date(),
		};
		// TODO: Add validation tests
		const useCase = new AddUserUseCase(
			validInput, // Provide valid input for your tests
			db,
		);

		expect(() => useCase.validate()).to.not.throw();
	});

	it("should execute use case successfully", () => {
		const validInput = {
			id: "123",
			name: "John Doe",
			email: "john.doe@example.com",
			emailVerified: true,
			image: "https://example.com/image.jpg",
			createdAt: new Date(),
			updatedAt: new Date(),
		};
		// TODO: Add validation tests
		const useCase = new AddUserUseCase(
			validInput, // Provide valid input for your tests
			db,
		);

		const result = useCase.execute();
		// TODO: Add assertions based on expected output
		expect(result).toBeDefined();
	});
});
