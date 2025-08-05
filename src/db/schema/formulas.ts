import { pgTable, integer, varchar, foreignKey, boolean, text } from "drizzle-orm/pg-core"
import { relations } from 'drizzle-orm';

import { tipo_reformas } from "./tipo_reformas";

export const formulas = pgTable("formulas", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    tipo_reforma_id: integer().notNull(),
    nome: varchar({ length: 100 }).notNull(),
    expressao: text().notNull(),
    valido: boolean().notNull().default(true),
}, (table) => [
    foreignKey({
        columns: [table.tipo_reforma_id],
        foreignColumns: [tipo_reformas.id],
        name: "fk_tipo_reforma_id_formulas"
    }),
]);

export const formulas_relations = relations(formulas, ({ one }) => ({
	tipo_reformas: one(tipo_reformas)
}));
