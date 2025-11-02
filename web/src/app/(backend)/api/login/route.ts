import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { email, senha } = await request.json();

    if (!email || !senha) {
      return NextResponse.json({ error: "Email e senha são obrigatórios" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      return NextResponse.json({ error: "Utilizador não encontrado" }, { status: 404 });
    }

    const { ...userSemSenha } = user;

    return NextResponse.json({ user: userSemSenha });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Erro ao fazer login";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}