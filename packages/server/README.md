# `server`

## Use Cases
A key concept for our server is a Use Case.

A Use Case is unique business logic that:

1. Is not used in other Use Cases.
2. May be used multiple times in the app, but is used at least once.
3. Has its own directory, within a category directory, with types and schemas, tests, and a class. They all possess the Use Case name.
4. Its class must take a Zod schema, a database client (Drizzle). Anything else is Use Case specific.
5. Use Cases have two mandatory functions: validate and execute. validate validates the Zod schema with an input. execute executes the key logic.

If it violates any of the principles above, it is a utility.