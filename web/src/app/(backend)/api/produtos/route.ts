

import { NextResponse } from "next/server";
import { produtoService } from "src/services/produto.service";

export async function GET() {
  try {
    const produtos = await produtoService.getAll();
    return NextResponse.json(produtos);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Erro ao buscar produtos";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (!data.nome || !data.preco || !data.imagem) {
       return NextResponse.json({ error: "Nome, preço e imagem são obrigatórios" }, { status: 400 });
    }

    const novoProduto = await produtoService.create(data);

    return NextResponse.json(novoProduto, { status: 201 });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Erro ao criar produto";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}