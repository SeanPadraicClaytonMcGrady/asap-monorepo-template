import { mockDb, type mockDbType } from "@asap/db";
import type z from "zod";
import { AddUserInputSchema, AddUserOutputSchema } from "./add-user.schema";

// TODO: Fix this example & use feedback to fix mockDb.ts and use-case templates

export class AddUserUseCase {
	constructor(
		private input: z.infer<typeof AddUserInputSchema>,
		private dbClient = mockDb,
	) {}

	validate() {
		return AddUserInputSchema.parse(this.input);
	}

	async execute() {
		const validData = this.validate();

		// Insert the user into the database
		const result = await this.dbClient.getDb().insert(this).values({
			id: validData.id,
			name: validData.name,
			email: validData.email,
			emailVerified: validData.emailVerified,
			image: validData.image,
			createdAt: validData.createdAt,
			updatedAt: validData.updatedAt,
		});

		// Return the first (and only) result
		return result[0];
	}
}
