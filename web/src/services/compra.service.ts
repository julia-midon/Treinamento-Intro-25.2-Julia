
import prisma from "@/lib/prisma";

interface NovaCompraData {
  userId: string;
  produtosIds: string[]; 
}

export const compraService = {

  getByUserId: async (userId: string) => {
    try {
      const compras = await prisma.compra.findMany({
        where: { userId },
        include: {
          produtos: {
            include: {
              produto: true,
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

  create: async (data: NovaCompraData) => {
    const { userId, produtosIds } = data;

    try {
      const produtosNoBanco = await prisma.produto.findMany({
        where: {
          id: { in: produtosIds }, 
        },
      });

      const precoTotal = produtosNoBanco.reduce((total, produto) => {
        return total + produto.preco;
      }, 0);

      const novaCompra = await prisma.$transaction(async (tx) => {
        
        const compra = await tx.compra.create({
          data: {
            userId,
            precoTotal,
          },
        });

        const compraProdutoData = produtosIds.map((produtoId) => ({
          compraId: compra.id,
          produtoId: produtoId,
        }));

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