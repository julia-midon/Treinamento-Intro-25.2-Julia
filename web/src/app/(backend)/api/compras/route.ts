

import { NextResponse } from "next/server";
import { compraService } from "src/services/compra.service";
const MOCK_USER_ID = "julia-1234"; 

export async function GET() {
  try {
    const compras = await compraService.getByUserId(MOCK_USER_ID);
    return NextResponse.json(compras);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Erro ao buscar compras";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { produtosIds } = await request.json(); 

    if (!produtosIds || !Array.isArray(produtosIds) || produtosIds.length === 0) {
      return NextResponse.json({ error: "Lista de produtos (produtosIds) é obrigatória" }, { status: 400 });
    }

    const novaCompra = await compraService.create({
      userId: MOCK_USER_ID,
      produtosIds,
    });

    return NextResponse.json(novaCompra, { status: 201 });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Erro ao efetivar compra";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}