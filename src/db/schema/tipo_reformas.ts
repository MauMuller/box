import { pgTable, integer, varchar, text } from "drizzle-orm/pg-core"

export const tipo_reformas = pgTable("tipo_reformas", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    nome: varchar({ length: 100 }).notNull().unique(),
    descricao: text(),
});
