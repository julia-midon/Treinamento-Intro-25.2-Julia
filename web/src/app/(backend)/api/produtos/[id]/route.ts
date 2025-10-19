// [ARQUIVO: app/(backend)/api/produtos/[id]/route.ts]

import { NextResponse } from "next/server";
// 1. Importação CORRETA (usando o atalho '@')
import { produtoService } from "@/services/produto.service";

// Interface para definir que 'params' terá um 'id'
interface Context {
  params: {
    id: string;
  };
}

/**
 * Rota GET para buscar um produto específico pelo ID
 */
export async function GET(request: Request, context: Context) {
  const { id } = context.params;
  
  // 5. Adicionado try...catch
  try {
    const produto = await produtoService.getById(id);
    
    // 3. Adicionada verificação e RETORNO
    if (!produto) {
      return NextResponse.json({ error: "Produto não encontrado" }, { status: 404 });
    }
    return NextResponse.json(produto);

  } catch (error) {
     const errorMessage = error instanceof Error ? error.message : "Erro ao buscar produto";
     return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

/**
 * Rota PUT para atualizar um produto
 */
export async function PUT(request: Request, context: Context) {
  const { id } = context.params;
  
  try {
    // 4. Lógica de "PUT" CORRETA
    const data = await request.json();
    const produtoAtualizado = await produtoService.update(id, data);

    // 3. Adicionado RETORNO
    return NextResponse.json(produtoAtualizado);

  } catch (error) {
     const errorMessage = error instanceof Error ? error.message : "Erro ao atualizar produto";
     return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

/**
 * Rota DELETE para deletar um produto
 * (Faltava no seu código, mas é parte do CRUD)
 */
export async function DELETE(request: Request, context: Context) {
  const { id } = context.params;

  try {
    await produtoService.delete(id);
    // Retorna uma resposta vazia com status 204 (No Content)
    return new NextResponse(null, { status: 204 }); 
  } catch (error) {
     const errorMessage = error instanceof Error ? error.message : "Erro ao deletar produto";
     return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}