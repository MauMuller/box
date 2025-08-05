import { pgTable, check, integer, varchar, foreignKey } from "drizzle-orm/pg-core"
import { sql, relations } from "drizzle-orm"

import { tipo_reformas } from "./tipo_reformas";

export const variaveis = pgTable("variaveis", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    tipo_reforma_id: integer().notNull(),
    nome: varchar({ length: 50 }).notNull(),
    tipo: varchar({ length: 10 }).notNull(),
    valor_default: varchar({ length: 100 }),
}, (table) => [
    check("check_tipo", sql`${table.tipo} IN ('NUMBER','BOOLEAN')`),
    foreignKey({
            columns: [table.tipo_reforma_id],
            foreignColumns: [tipo_reformas.id],
            name: "fk_tipo_reforma_id_variaveis"
        }),
]);

export const variaveis_relations = relations(variaveis, ({ one }) => ({
    tipo_reformas: one(tipo_reformas)
}));
