import prisma from "@/lib/prisma";

export const categoriaService = {
  
  getAll: async () => {
    try {
      const categorias = await prisma.categoria.findMany();
      return categorias;
    } catch (error) {
      console.error("Erro no service ao buscar categorias:", error);
      throw new Error("Não foi possível buscar as categorias.");
    }
  },

  getById: async (id: string) => {
    try {
      const categoria = await prisma.categoria.findUnique({
        where: { id },
      });
      return categoria;
    } catch (error) {
      console.error(`Erro no service ao buscar categoria ${id}:`, error);
      throw new Error("Não foi possível buscar a categoria.");
    }
  },

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

  update: async (id: string, nome: string) => {
    try {
      const categoriaAtualizada = await prisma.categoria.update({
        where: { id },
        data: { nome }, 
      });
      return categoriaAtualizada;
    } catch (error) {
      console.error(`Erro no service ao atualizar categoria ${id}:`, error);
      throw new Error("Não foi possível atualizar a categoria.");
    }
  },

  delete: async (id: string) => {
    try {
      await prisma.categoria.delete({
        where: { id },
      });
      return { message: "Categoria deletada com sucesso" };
    } catch (error) {
      console.error(`Erro no service ao deletar categoria ${id}:`, error);
      throw new Error("Não foi possível deletar a categoria.");
    }
  },
};