# `server`

## Use Cases
A key concept for our server is a Use Case.

A Use Case is unique business logic that:

1. Is not used in other Use Cases.
2. May be used multiple times in the app, but is used at least once.
3. Has its own directory, within a category directory, tests, and a class. Any schemas go in validators in an identical folder organization. They all possess the Use Case name.
4. Its class must take a Zod schema for validation of its input. It almost always takes a database client (Drizzle ORM), and the database schema (Drizzle schema exports). Anything else is Use Case specific.
5. Use Cases have two mandatory functions: validate and execute. validate validates the Zod schema with an input. execute executes the key logic. Anything else is a helper function unique to the Use Case.

If it violates any of the principles above, it is a utility.