import { relations } from "drizzle-orm";
import * as t from "drizzle-orm/pg-core";
import { timeStamps } from "./utils/helpers";

/**
 * Tables
 */

export const user = t.pgTable("user", {
	id: t.uuid("id").defaultRandom().primaryKey().notNull(),
	name: t.text("name").notNull(),
	email: t.text("email").notNull().unique(),
	emailVerified: t.boolean("email_verified").default(false).notNull(),
	image: t.text("image"),

	...timeStamps,
});

// Stores logins & has a token that identifies login session
export const session = t.pgTable("session", {
	id: t.uuid("id").defaultRandom().primaryKey().notNull(),
	expiresAt: t.timestamp("expires_at").notNull(),
	token: t.text("token").notNull().unique(),
	...timeStamps,
	ipAddress: t.text("ip_address"),
	userAgent: t.text("user_agent"),
	userId: t
		.uuid("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
});

// Stores auth provider accounts linked to a user
export const account = t.pgTable("account", {
	id: t.uuid("id").defaultRandom().primaryKey().notNull(),
	accountId: t.text("account_id").notNull(),
	providerId: t.text("provider_id").notNull(),
	userId: t
		.uuid("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	accessToken: t.text("access_token"),
	refreshToken: t.text("refresh_token"),
	idToken: t.text("id_token"),
	accessTokenExpiresAt: t.timestamp("access_token_expires_at"),
	refreshTokenExpiresAt: t.timestamp("refresh_token_expires_at"),
	scope: t.text("scope"),
	password: t.text("password"),
	...timeStamps,
});

// Used for email verification and password reset tokens
export const verification = t.pgTable("verification", {
	id: t.uuid("id").defaultRandom().primaryKey().notNull(),
	identifier: t.text("identifier").notNull(),
	value: t.text("value").notNull(),
	expiresAt: t.timestamp("expires_at").notNull(),
	...timeStamps,
});

/**
 * Relations
 */

export const userRelations = relations(user, ({ many }) => ({
	sessions: many(session),
	accounts: many(account),
}));

export const sessionRelations = relations(session, ({ one }) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id],
	}),
}));

export const accountRelations = relations(account, ({ one }) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id],
	}),
}));
