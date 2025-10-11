import ProdutoCard from "@/components/ui/ProdutoCard";

export default function HomePage() {
  const produtos = [
    {
      nome: "Kit coleira + guia",
      imagem: "/imagens/61b1+ET5YhL._UF1000,1000_QL80_.jpg",
      descricao: "Linda coleira para arrasar nos passeios",
      preco: "R$40,00"
    },
    {
      nome: "Gravata Borboleta",
      imagem: "/imagens/Gravata-para-Cachorro-Ciano.webp",
      descricao: "Gravata que conquista qualquer uma",
      preco: "R$10,00"
    },
    {
      nome: "Crocs",
      imagem: "/imagens/1660528339df32c60f5ecbf9f87ff1883657c336a8.webp",
      descricao: "Sapatinhos para proteger os pés dos divos",
      preco: "R$20,00"
    },
    {
      nome: "Capa de chuva",
      imagem: "/imagens/Capa-de-Chuva-Rosa.png",
      descricao: "Capa para passear independente do clima",
      preco: "R$30,00"
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Catálogo de Produtos
      </h1>

      <div className="flex flex-wrap justify-center gap-8 px-4">
        {produtos.map((produto, index) => (
          <ProdutoCard
            key={index}
            nome={produto.nome}
            imagem={produto.imagem}
            descricao={produto.descricao}
            preco={produto.preco}
            
          />
        ))}
      </div>
    </main>
  );
}
