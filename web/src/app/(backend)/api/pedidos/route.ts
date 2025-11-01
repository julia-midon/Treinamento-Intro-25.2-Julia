import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface Item {
  nome: string;
  preco: number;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { itens, total } = body as { itens: Item[]; total: number };

    const novoPedido = await prisma.pedido.create({
      data: {
        total,
        itens: {
          create: itens.map((item: Item) => ({
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

