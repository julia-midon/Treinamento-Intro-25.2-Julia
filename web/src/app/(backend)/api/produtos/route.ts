import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // ou "@lib/prisma" se configurou o alias

export async function GET() {
  try {
    const produtos = await prisma.produto.findMany();
    return NextResponse.json(produtos);
  } catch (error) {
    console.error("Erro na rota /api/produtos:", error);
    return NextResponse.json({ error: "Erro ao buscar produtos" }, { status: 500 });
  }
}
