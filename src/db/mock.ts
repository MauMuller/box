import { db } from "../db/instace";
import { tipo_reformas } from "../db/schema/tipo_reformas"
import { formulas } from "./schema/formulas";
import { variaveis } from "./schema/variaveis";
import { usuarios } from "./schema/usuarios";
import { execucao_formulas } from "./schema/execucao_formulas"

async function main() {
    await db.transaction(async (db) => {
        const usuariosData = [
            { email: "asdasd@asdsa.com", senhaHash: "asd213dfg32t5@!#!!sadsadsad", papel: 'ADMIN' },
            { email: "1asdasd@asdsa.com", senhaHash: "asd213dfg32t5@!#!!sadsadsad", papel: 'USER' },
            { email: "2asdasd@asdsa.com", senhaHash: "asd213dfg32t5@!#!!sadsadsad", papel: 'USER' },
        ];

        const tiposReformasData = [
            { nome: "estrutural", descricao: "Lorem ipsum" },
            { nome: "pintura", descricao: "Lorem ipsum" },
            { nome: "acabamentos", descricao: "Lorem ipsum" },
        ];

        const formulasData = [
            { nome: "teste", expressao: "+", valido: true },
            { nome: "teste2", expressao: "-", valido: false },
            { nome: "teste3", expressao: "*", valido: true },
        ];

        const variaveisData = [
            { nome: "A", tipo: "NUMBER", valor_default: '2' },
            { nome: "B", tipo: "NUMBER", valor_default: '2' },
            { nome: "C", tipo: "BOOLEAN", valor_default: '5' },
        ];

        const execucaoFormulasData = [
            { valores: { variaveis: ['A','B'] }, resultado: '4' }
        ];
 
        const IDsInseridosTiposReformas = await db
            .insert(tipo_reformas)
            .values(tiposReformasData)
            .returning({ insertedID: tipo_reformas.id });

        const formulasInsert = IDsInseridosTiposReformas.map(({ insertedID }, index) => ({
            ...formulasData[index],
            tipo_reforma_id: insertedID,
        }));

        const variaveisInsert = IDsInseridosTiposReformas.map(({ insertedID }, index) => ({
            ...variaveisData[index],
            tipo_reforma_id: insertedID,
        }));

        await db
            .insert(variaveis)
            .values(variaveisInsert);

        const IDsInseridosFormulas = await db
            .insert(formulas)
            .values(formulasInsert)    
            .returning({ insertedID: formulas.id });


        const IDsInseridosUsuarios = await db
            .insert(usuarios)
            .values(usuariosData)
            .returning({ insertedID: usuarios.id });
     
        const execucaoFormulasInsert = execucaoFormulasData.map((object, index) => ({
            ...object,
            usuario_id: IDsInseridosUsuarios[index].insertedID,
            formula_id: IDsInseridosFormulas[index].insertedID,
        }));

        await db
            .insert(execucao_formulas)
            .values(execucaoFormulasInsert);
    });
}

main();
