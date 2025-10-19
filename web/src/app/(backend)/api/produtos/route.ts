// [ARQUIVO: app/(backend)/api/produtos/route.ts]

import { NextResponse } from "next/server";
import { produtoService } from "src/services/produto.service";

/**
 * Rota GET para buscar todos os produtos
 */
export async function GET() {
  try {
    const produtos = await produtoService.getAll();
    return NextResponse.json(produtos);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Erro ao buscar produtos";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

/**
 * (NOVO) Rota POST para criar um novo produto
 */
export async function POST(request: Request) {
  try {
    // 1. Pega os dados do corpo da requisição
    const data = await request.json();

    // 2. Validação simples (adicione mais se precisar)
    if (!data.nome || !data.preco || !data.imagem) {
       return NextResponse.json({ error: "Nome, preço e imagem são obrigatórios" }, { status: 400 });
    }

    // 3. Chama o service para criar o produto
    const novoProduto = await produtoService.create(data);
    
    // 4. Retorna o produto criado com status 201 (Created)
    return NextResponse.json(novoProduto, { status: 201 });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Erro ao criar produto";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}