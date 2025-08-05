import { NextResponse } from 'next/server';

import { eq } from 'drizzle-orm';
import { db } from "../../../db/instace";

import { formulas } from "../../../db/schema/formulas";
import { tipo_reformas } from "../../../db/schema/tipo_reformas";

export async function GET(request: Request) {
    const headers = {
        "Content-Type": "application/json",
    };
    
    const resp = {
        ok: false,
        message: "Ocorreu um erro inesperado."
    };

    let status = 500;
    const reformasFormulas = await db
        .select()
        .from(tipo_reformas)
        .leftJoin(formulas, eq(tipo_reformas.id, formulas.tipo_reforma_id))

    try {        
        if (!reformasFormulas) {
            status = 400;
            throw new Error('Dados de INPUT inválidos.');
        }

        resp.ok = true;
        resp.message = 'Registro inserido com sucesso.';        

        status = 200;
    } catch(err) {
        resp.ok = false;
        if (err instanceof Error) resp.message = err.message;  
    }

    return NextResponse.json(reformasFormulas, { status, headers });
}

export async function POST(request: Request) {    
    const headers = {
        "Content-Type": "application/json",
        "Location": ""
    };
    
    const resp = {
        ok: false,
        message: "Ocorreu um erro inesperado."
    };

    let status = 500;

    try {
        const result = await request.json();

        if (!result) {
            status = 400;
            throw new Error('Dados de INPUT inválidos.');
        }

        resp.ok = true;
        resp.message = 'Registro inserido com sucesso.';        
        
        status = 201; 
        headers.Location = '';
    } catch(err) {
        resp.ok = false;
        if (err instanceof Error) resp.message = err.message;  
    }

    return NextResponse.json(resp, { status, headers });
}