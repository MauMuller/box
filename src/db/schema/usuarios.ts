import { pgTable, check, integer, varchar } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const usuarios = pgTable("usuarios", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    email: varchar({ length: 255 }).notNull().unique(),
    senhaHash: varchar({ length: 255 }).notNull(),
    papel: varchar({ length: 10 }).notNull(),
}, (table) => [
    check("papel_usuario", sql`${table.papel} IN ('ADMIN','USER')`),
]);
