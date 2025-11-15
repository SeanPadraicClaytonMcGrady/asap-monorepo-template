import * as t from "drizzle-orm/pg-core";

export const timeStamps = {
	createdAt: t.timestamp("created_at").defaultNow().notNull(),
	updatedAt: t
		.timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => /* @__PURE__ */ new Date())
		.notNull(),
};
