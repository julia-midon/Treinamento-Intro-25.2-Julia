import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { itens, total } = body;

    const novoPedido = await prisma.pedido.create({
      data: {
        total,
        itens: {
          create: itens.map((item: any) => ({
            nome: item.nome,
            preco: item.preco,
          })),
        },
      },
    });

    return NextResponse.json(novoPedido, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao criar pedido" }, { status: 500 });
  }
}
