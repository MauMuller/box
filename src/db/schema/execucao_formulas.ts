import { pgTable, integer, foreignKey, jsonb, numeric, timestamp } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"

import { formulas } from "./formulas";
import { usuarios } from "./usuarios";

export const execucao_formulas = pgTable("execucao_formulas", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    formula_id: integer().notNull(),
    usuario_id: integer().notNull(),
    data_execucao: timestamp().defaultNow().notNull(),
    valores: jsonb().notNull(),
    resultado: numeric().notNull(),
}, (table) => [
    foreignKey({
            columns: [table.formula_id],
            foreignColumns: [formulas.id],
            name: "fk_formula_id"
        }),
    foreignKey({
            columns: [table.usuario_id],
            foreignColumns: [usuarios.id],
            name: "fk_usuarios_id_"
        }),
]);

export const execucao_formulas_relations = relations(execucao_formulas, ({ one }) => ({
    formulas: one(formulas),
    usuarios: one(usuarios),
}));