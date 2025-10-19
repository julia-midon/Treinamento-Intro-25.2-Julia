// [ARQUIVO: src/services/produto.service.ts]

import prisma from "@/lib/prisma";
import { Produto } from "@/generated/prisma"; // Importa o TIPO Produto

// Define um tipo para os dados de criação/update, para não repetir
type ProdutoData = Omit<Produto, "id">; // Omit<...> remove o 'id' do tipo

export const produtoService = {
  
  /**
   * Busca todos os produtos.
   */
  getAll: async () => {
    try {
      const produtos = await prisma.produto.findMany();
      return produtos;
    } catch (error) {
      console.error("Erro no service ao buscar produtos:", error);
      throw new Error("Não foi possível buscar os produtos.");
    }
  },

  /**
   * (NOVO) Busca um produto pelo seu ID.
   */
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

  /**
   * (NOVO) Cria um novo produto.
   */
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

  /**
   * (NOVO) Atualiza um produto existente.
   */
  update: async (id: string, data: Partial<ProdutoData>) => {
    // Partial<...> torna todos os campos opcionais (para PUT/PATCH)
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

  /**
   * (NOVO) Deleta um produto.
   */
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