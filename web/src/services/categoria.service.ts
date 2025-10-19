// [ARQUIVO: src/services/categoria.service.ts]

import prisma from "@/lib/prisma";

export const categoriaService = {
  
  /**
   * Busca todas as categorias.
   */
  getAll: async () => {
    try {
      const categorias = await prisma.categoria.findMany();
      return categorias;
    } catch (error) {
      console.error("Erro no service ao buscar categorias:", error);
      throw new Error("Não foi possível buscar as categorias.");
    }
  },

  /**
   * Cria uma nova categoria.
   */
  create: async (nome: string) => {
    try {
      const novaCategoria = await prisma.categoria.create({
        data: { nome },
      });
      return novaCategoria;
    } catch (error) {
      console.error("Erro no service ao criar categoria:", error);
      throw new Error("Não foi possível criar a categoria.");
    }
  },
};