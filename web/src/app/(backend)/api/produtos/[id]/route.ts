
import { NextResponse } from "next/server";

import { produtoService } from "@/services/produto.service";

interface Context {
  params: {
    id: string;
  };
}

export async function GET(request: Request, context: Context) {
  const { id } = context.params;
  
  try {
    const produto = await produtoService.getById(id);

    if (!produto) {
      return NextResponse.json({ error: "Produto não encontrado" }, { status: 404 });
    }
    return NextResponse.json(produto);

  } catch (error) {
     const errorMessage = error instanceof Error ? error.message : "Erro ao buscar produto";
     return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function PUT(request: Request, context: Context) {
  const { id } = context.params;
  
  try {

    const data = await request.json();
    const produtoAtualizado = await produtoService.update(id, data);

    return NextResponse.json(produtoAtualizado);

  } catch (error) {
     const errorMessage = error instanceof Error ? error.message : "Erro ao atualizar produto";
     return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: Context) {
  const { id } = context.params;

  try {
    await produtoService.delete(id);
    return new NextResponse(null, { status: 204 }); 
  } catch (error) {
     const errorMessage = error instanceof Error ? error.message : "Erro ao deletar produto";
     return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}