import type { dbType, schemaType } from "@asap/db";
import type z from "zod";
import { AddUserInputSchema, AddUserOutputSchema } from "./add-user.schema";

// TODO: Fix this example & use feedback to fix mockDb.ts and use-case templates

export class AddUserUseCase {
	constructor(
		private input: z.infer<typeof AddUserInputSchema>,
		private dbClient: dbType,
		private schema: schemaType,
	) {}
	/**
	 *
	 * Name: AddUser Use Case
	 * Description: Adds a new user to the database
	 * Purpose: To create and store user information securely (also to serve as a basic demonstration of Drizzle)
	 * Location of use: None for now.
	 *
	 */

	validate() {
		return AddUserInputSchema.parse(this.input);
	}

	async execute() {
		const validData = this.validate();

		// Insert the user into the database
		const result = await this.dbClient.insert(this.schema.user).values({
			id: validData.id,
			name: validData.name,
			email: validData.email,
			emailVerified: validData.emailVerified,
			image: validData.image,
			createdAt: validData.createdAt,
			updatedAt: validData.updatedAt,
		});

		return result;
	}
}
