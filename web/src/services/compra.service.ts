// [ARQUIVO: src/services/compra.service.ts]

import prisma from "@/lib/prisma";

// Interface para os dados da nova compra
interface NovaCompraData {
  userId: string;
  produtosIds: string[]; // Esperamos uma lista de IDs de produtos
}

export const compraService = {

  /**
   * Busca todas as compras de um usuário específico.
   * (Cumpre "Retornar estatísticas de Compras de um user")
   */
  getByUserId: async (userId: string) => {
    try {
      const compras = await prisma.compra.findMany({
        where: { userId },
        // 'include' "puxa" os dados relacionados
        include: {
          produtos: { // Puxa os registros da tabela 'CompraProduto'
            include: {
              produto: true, // E dentro deles, puxa os dados do 'Produto'
            },
          },
        },
      });
      return compras;
    } catch (error) {
      console.error(`Erro no service ao buscar compras do usuário ${userId}:`, error);
      throw new Error("Não foi possível buscar as compras.");
    }
  },

  /**
   * Cria uma nova compra (Efetiva a Compra).
   * Usa uma transação para garantir que a Compra e os CompraProduto
   * sejam criados juntos, ou nada seja criado.
   */
  create: async (data: NovaCompraData) => {
    const { userId, produtosIds } = data;

    try {
      // 1. Buscar os produtos no banco para calcular o preço total
      const produtosNoBanco = await prisma.produto.findMany({
        where: {
          id: { in: produtosIds }, // 'in' busca todos os IDs na lista
        },
      });

      // 2. Calcular o preço total
      const precoTotal = produtosNoBanco.reduce((total, produto) => {
        return total + produto.preco;
      }, 0);

      // 3. Iniciar a transação
      const novaCompra = await prisma.$transaction(async (tx) => {
        
        // 3.1. Criar a Compra principal
        const compra = await tx.compra.create({
          data: {
            userId,
            precoTotal,
          },
        });

        // 3.2. Preparar os dados para a tabela 'CompraProduto'
        const compraProdutoData = produtosIds.map((produtoId) => ({
          compraId: compra.id,
          produtoId: produtoId,
        }));

        // 3.3. Criar as relações na tabela 'CompraProduto'
        await tx.compraProduto.createMany({
          data: compraProdutoData,
        });

        return compra;
      });

      return novaCompra;

    } catch (error) {
      console.error("Erro no service ao criar compra:", error);
      throw new Error("Não foi possível efetivar a compra.");
    }
  },
};