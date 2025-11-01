

import { NextResponse } from "next/server";
import { categoriaService } from "src/services/categoria.service";

export async function GET() {
  try {
    const categorias = await categoriaService.getAll();
    return NextResponse.json(categorias);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Erro ao buscar categorias";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { nome } = await request.json();

    if (!nome) {
       return NextResponse.json({ error: "Nome é obrigatório" }, { status: 400 });
    }

    const novaCategoria = await categoriaService.create(nome);
    return NextResponse.json(novaCategoria, { status: 201 });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Erro ao criar categoria";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}