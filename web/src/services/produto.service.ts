
import prisma from "@/lib/prisma";
import { Produto } from "@/generated/prisma"; 

type ProdutoData = Omit<Produto, "id">; 

export const produtoService = {
  
  getAll: async () => {
    try {
      const produtos = await prisma.produto.findMany();
      return produtos;
    } catch (error) {
      console.error("Erro no service ao buscar produtos:", error);
      throw new Error("Não foi possível buscar os produtos.");
    }
  },

  getById: async (id: string) => {
    try {
      const produto = await prisma.produto.findUnique({
        where: { id },
      });
      return produto;
    } catch (error) {
      console.error(`Erro no service ao buscar produto ${id}:`, error);
      throw new Error("Não foi possível buscar o produto.");
    }
  },

  create: async (data: ProdutoData) => {
    try {
      const novoProduto = await prisma.produto.create({
        data,
      });
      return novoProduto;
    } catch (error) {
      console.error("Erro no service ao criar produto:", error);
      throw new Error("Não foi possível criar o produto.");
    }
  },

  update: async (id: string, data: Partial<ProdutoData>) => {
    
    try {
      const produtoAtualizado = await prisma.produto.update({
        where: { id },
        data,
      });
      return produtoAtualizado;
    } catch (error) {
      console.error(`Erro no service ao atualizar produto ${id}:`, error);
      throw new Error("Não foi possível atualizar o produto.");
    }
  },

  delete: async (id: string) => {
    try {
      await prisma.produto.delete({
        where: { id },
      });
      return { message: "Produto deletado com sucesso" };
    } catch (error) {
      console.error(`Erro no service ao deletar produto ${id}:`, error);
      throw new Error("Não foi possível deletar o produto.");
    }
  },
};