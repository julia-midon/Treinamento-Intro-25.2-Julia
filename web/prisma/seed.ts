import { PrismaClient } from '../src/generated/prisma';
const prisma = new PrismaClient();

async function main() {
  await prisma.produto.createMany({
    data: [
      { nome: "Kit coleira + guia", imagem: "/imagens/coleira-guia.jpg", descricao: "Linda coleira para arrasar nos passeios", preco: 40 },
      { nome: "Gravata Borboleta", imagem: "/imagens/Gravata-para-Cachorro-Ciano.webp", descricao: "Gravata que conquista qualquer uma", preco: 10 },
      { nome: "Crocs", imagem: "/imagens/crocs.webp", descricao: "Sapatinhos para proteger os pés dos divos", preco: 20 },
      { nome: "Capa de chuva", imagem: "/imagens/Capa-de-Chuva-Rosa.png", descricao: "Capa para passear independente do clima", preco: 30 },
      { nome: "Gravata Halloween 🕷️", imagem: "/imagens/gravata-halloween.webp", descricao: "Gravatinha já entrando no clima de outubro", preco: 10 },
      { nome: "Fantasia Halloween 🧛", imagem: "/imagens/fantasias-bruxa.webp", descricao: "Fantasia de bruxa para arrepiar nas festas", preco: 50 },
    ],
  });

  console.log("🛍️ Produtos adicionados com sucesso!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
