import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; 
interface ProdutoCompra {
  produtoId: string;
  quantidade: number;
}

export async function GET() {
 try {

    const MOCK_USER_ID = "julia-1234"; 
    const compras = await prisma.compra.findMany({ 
      where: { userId: MOCK_USER_ID }
    });
   return NextResponse.json(compras);
  } catch (error) {
   const errorMessage = error instanceof Error ? error.message : "Erro ao buscar compras";
   return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}


export async function POST(request: Request) {
   try {
   const body = await request.json();
    const { 
      userId, 
      precoTotal, 
      produtos 
    } = body as { 
      userId: string, 
      precoTotal: number, 
      produtos: ProdutoCompra[] 
    };

   if (!userId || !precoTotal || !produtos || produtos.length === 0) {
    return NextResponse.json({ error: "Dados da compra inválidos (userId, precoTotal e produtos são obrigatórios)" }, { status: 400 });
   }

   const novaCompra = await prisma.compra.create({
      data: {
        userId: userId, 
        precoTotal: precoTotal, 
        produtos: { 
          create: produtos.map(produto => ({
            produtoId: produto.produtoId,
            quantidade: produto.quantidade 
          }))
        }
      }
    });

   return NextResponse.json(novaCompra, { status: 201 });

  } catch (error) {
    console.error("Erro ao criar compra:", error); 
    const errorMessage = error instanceof Error ? error.message : "Erro ao efetivar compra";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
 }
}