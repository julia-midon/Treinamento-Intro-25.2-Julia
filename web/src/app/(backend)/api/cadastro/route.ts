import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { email, senha, name } = await request.json();

    if (!email || !senha || !name) {
      return NextResponse.json({ error: "Email, nome e senha são obrigatórios" }, { status: 400 });
    }

    const userExists = await prisma.user.findUnique({
      where: { email: email },
    });

    if (userExists) {
      return NextResponse.json({ error: "Este email já está em uso" }, { status: 409 });
    }
    
    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: senha,
        role: 'USER', 
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    });

    return NextResponse.json(newUser, { status: 201 }); 

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Erro ao criar utilizador";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}