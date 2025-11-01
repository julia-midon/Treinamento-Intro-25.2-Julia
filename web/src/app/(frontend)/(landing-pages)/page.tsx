// page.tsx (Seu arquivo, CORRIGIDO)
"use client";

import { useEffect, useState } from "react";
import ProdutoCard from "@/components/ui/ProdutoCard";
import BarraNavegacao from "@/components/ui/BarraNavegacao";

interface Produto {
  nome: string;
  imagem: string;
  descricao: string;
  preco: number;
}

export default function Page() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [itensCarrinho, setItensCarrinho] = useState<{ nome: string; preco: number }[]>([]);
  
  const [usuario, setUsuario] = useState<string | null>(null);

  useEffect(() => {
    // Busca os produtos
    fetch("/api/produtos")
      .then((res) => res.json())
      .then((data) => setProdutos(data))
      .catch((err) => console.error("Erro ao buscar produtos:", err));

    // Verifica se há um usuário logado no localStorage.
    const usuarioLogadoJSON = localStorage.getItem('usuario_logado');
    if (usuarioLogadoJSON) {
      const usuarioLogado = JSON.parse(usuarioLogadoJSON);
      setUsuario(usuarioLogado.nome);
    }
    
  }, []); 

  const verificaCarrinho = (produto: { nome: string; preco: number }) => {
    setItensCarrinho((prev) => {
      const jaExiste = prev.find((p) => p.nome === produto.nome);
      if (jaExiste) {
        return prev.filter((p) => p.nome !== produto.nome);
      } else {
        return [...prev, produto];
      }
    });
  };

  // <-- 1. NOVA FUNÇÃO DE LOGOUT AQUI -->
  // Esta função limpa o localStorage E o estado local do React.
  const executarLogout = () => {
    localStorage.removeItem("usuario_logado");
    setUsuario(null); 
  };

  const totalItens = itensCarrinho.length;
  const totalPreco = itensCarrinho.reduce((acc, item) => acc + item.preco, 0);

  return (
    <>
      {/* <-- 2. PASSAR A FUNÇÃO COMO PROP --> */}
      <BarraNavegacao
        totalItens={totalItens}
        totalPreco={totalPreco}
        Adicionados={itensCarrinho}
        nomeUsuario={usuario} 
        onLogout={executarLogout} // Passamos a função para o componente filho
      />

      <main className="min-h-screen bg-purple-300 flex flex-col items-center py-10">
        {/* ... (Restante do seu JSX da página principal) ... */}

        <img
          src="/imagens/teia-com-aranha.webp"
          alt="Teia Halloween"
          className="fixed top-0 left-0 w-65 object-cover opacity-20 pointer-events-none select-none z-0"
        />
        <img
          src="/imagens/aranha-direita.webp"
          alt="Teia 2 Halloween"
          className="fixed top-0 right-0 w-70 object-cover opacity-20 pointer-events-none select-none z-0"
        />

        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Catálogo de Produtos + Especial Halloween!
        </h1>

        <div className="flex flex-wrap justify-center gap-8 px-4">
          {produtos.length === 0 ? (
            <p className="text-gray-600 text-lg">Carregando produtos...</p>
          ) : (
            produtos.map((produto, index) => (
              <ProdutoCard
                key={index}
                nome={produto.nome}
                imagem={produto.imagem}
                descricao={produto.descricao}
                preco={produto.preco}
                alteraCarrinho={verificaCarrinho}
                noCarrinho={!!itensCarrinho.find((p) => p.nome === produto.nome)}
              />
            ))
          )}
        </div>
      </main>
    </>
  );
}