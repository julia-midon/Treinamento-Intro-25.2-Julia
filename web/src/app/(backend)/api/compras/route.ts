// [ARQUIVO: app/(backend)/api/compras/route.ts]

import { NextResponse } from "next/server";
import { compraService } from "@/services/compra.service";
// NOTA: Em um app real, você pegaria o 'userId' da sessão de login!
// Como ainda não temos login, vamos "simular" um ID de usuário.
// Lembre-se de trocar isso quando implementar o login.
const MOCK_USER_ID = "user_mock_id_12345"; // Troque isso pelo ID de um usuário real no seu banco

/**
 * Rota GET para buscar as compras do usuário logado
 */
export async function GET() {
  try {
    // NOTA: Trocar MOCK_USER_ID pelo ID do usuário da sessão!
    const compras = await compraService.getByUserId(MOCK_USER_ID);
    return NextResponse.json(compras);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Erro ao buscar compras";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

/**
 * Rota POST para criar uma nova compra (Efetivar Compra)
 */
export async function POST(request: Request) {
  try {
    // 1. Pegar os IDs dos produtos do carrinho
    const { produtosIds } = await request.json(); // ex: { produtosIds: ["id1", "id2"] }

    if (!produtosIds || !Array.isArray(produtosIds) || produtosIds.length === 0) {
      return NextResponse.json({ error: "Lista de produtos (produtosIds) é obrigatória" }, { status: 400 });
    }

    // 2. Chamar o service para criar a compra
    // NOTA: Trocar MOCK_USER_ID pelo ID do usuário da sessão!
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