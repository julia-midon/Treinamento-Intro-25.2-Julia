import { NextResponse } from "next/server";
import { categoriaService } from "src/services/categoria.service"; // Ajuste o caminho se necessário

// GET /api/categorias/[id] - Buscar uma categoria
export async function GET(request: Request, context: { params: { id: string } }) {
  try {
    const id = context.params.id;
    const categoria = await categoriaService.getById(id);
    
    if (!categoria) {
      return NextResponse.json({ error: "Categoria não encontrada" }, { status: 404 });
    }

    return NextResponse.json(categoria);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Erro ao buscar categoria";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// PUT /api/categorias/[id] - Atualizar uma categoria
export async function PUT(request: Request, context: { params: { id: string } }) {
  try {
    const id = context.params.id;
    const { nome } = await request.json();

    if (!nome) {
      return NextResponse.json({ error: "Nome é obrigatório" }, { status: 400 });
    }

    const categoriaAtualizada = await categoriaService.update(id, nome);
    return NextResponse.json(categoriaAtualizada);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Erro ao atualizar categoria";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// DELETE /api/categorias/[id] - Deletar uma categoria
export async function DELETE(request: Request, context: { params: { id: string } }) {
  try {
    const id = context.params.id;
    await categoriaService.delete(id);
    
    // Retorna 204 (No Content) que é o padrão para delete bem-sucedido
    return new NextResponse(null, { status: 204 }); 
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Erro ao deletar categoria";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}