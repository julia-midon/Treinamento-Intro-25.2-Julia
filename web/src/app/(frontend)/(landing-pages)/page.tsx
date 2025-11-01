"use client";

import { useEffect, useState } from "react";
import ProdutoCard from "@/components/ui/ProdutoCard";
import BarraNavegacao from "@/components/ui/BarraNavegacao";
import { Search, DollarSign } from "lucide-react"; 

interface Produto {
  nome: string;
  imagem: string;
  descricao: string;
  preco: number;
}

interface ItemCarrinho extends Produto {
  quantidade: number;
}


export default function Page() {
  const [termoBusca, setTermoBusca] = useState("");
  const [precoMin, setPrecoMin] = useState("");
  const [precoMax, setPrecoMax] = useState("");

  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [usuario, setUsuario] = useState<string | null>(null);

  const [itensCarrinho, setItensCarrinho] = useState<ItemCarrinho[]>([]);

  useEffect(() => {
    try {
      const carrinhoSalvo = localStorage.getItem('carrinho');
      if (carrinhoSalvo) {
        setItensCarrinho(JSON.parse(carrinhoSalvo));
      }
    } catch (error) {
      console.error("Erro ao carregar o carrinho do localStorage", error);
    }
  }, []); 

  useEffect(() => {
    if (itensCarrinho.length > 0) {
      localStorage.setItem('carrinho', JSON.stringify(itensCarrinho));
    }
  }, [itensCarrinho]);

  useEffect(() => {
    fetch("/api/produtos")
      .then((res) => res.json())
      .then((data) => setProdutos(data))
      .catch((err) => console.error("Erro ao buscar produtos:", err));

    const usuarioLogadoJSON = localStorage.getItem('usuario_logado');
    if (usuarioLogadoJSON) {
      const usuarioLogado = JSON.parse(usuarioLogadoJSON);
      setUsuario(usuarioLogado.nome);
    }
  }, []); 

  const adicionarAoCarrinho = (produto: Produto) => {
    setItensCarrinho((prev) => {
      const jaExiste = prev.find((p) => p.nome === produto.nome);
      if (jaExiste) {
        return prev.map((item) =>
          item.nome === produto.nome
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      } else {
        return [...prev, { ...produto, quantidade: 1 }];
      }
    });
  };

  const alterarQuantidade = (nome: string, delta: number) => {
    setItensCarrinho((prev) => {
      return prev.map((item) => {
        if (item.nome === nome) {
          return { ...item, quantidade: item.quantidade + delta };
        }
        return item;
      }).filter(item => item.quantidade > 0);
    });
  };

  const removerItemDoCarrinho = (nome: string) => {
    setItensCarrinho((prev) => prev.filter((item) => item.nome !== nome));
  };
  
  const executarLogout = () => {
    localStorage.removeItem("usuario_logado");
    setUsuario(null);
  };

  const totalItens = itensCarrinho.reduce((acc, item) => acc + item.quantidade, 0);
  const totalPreco = itensCarrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);

  const produtosFiltrados = produtos.filter((produto) => {
    const correspondeBusca = produto.nome.toLowerCase().includes(termoBusca.toLowerCase());
    const numPrecoMin = parseFloat(precoMin);
    const numPrecoMax = parseFloat(precoMax);
    const correspondePrecoMin = !numPrecoMin || produto.preco >= numPrecoMin;
    const correspondePrecoMax = !numPrecoMax || produto.preco <= numPrecoMax;
    return correspondeBusca && correspondePrecoMin && correspondePrecoMax;
  });

  return (
    <>
      <BarraNavegacao
        totalItens={totalItens}
        totalPreco={totalPreco}
        nomeUsuario={usuario}
        onLogout={executarLogout}
        itensDoCarrinho={itensCarrinho} 
        onAlterarQuantidade={alterarQuantidade}
        onRemoverItem={removerItemDoCarrinho}
      />

      <main className="min-h-screen bg-purple-300 flex flex-col items-center py-10">
         
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Catálogo de Produtos + Especial Halloween!
        </h1>

        <div className="w-full max-w-4xl bg-white/30 backdrop-blur-sm p-4 rounded-lg shadow-md mb-8 flex flex-col sm:flex-row gap-4 items-center">
          <div className="flex-1 relative w-full">
            <input
              type="text"
              placeholder="Buscar por nome..."
              value={termoBusca}
              onChange={(e) => setTermoBusca(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg text-black shadow-sm"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
          
          <div className="flex items-center gap-2 w-full sm:w-auto">
        <DollarSign className="text-gray-700" size={20}/>
        <input
          type="text"         
          inputMode="numeric"  
          placeholder="Min"
          min="0"
          value={precoMin}
          onChange={(e) => setPrecoMin(e.target.value)}
          className="w-full sm:w-24 px-2 py-2 rounded-lg text-black shadow-sm"
        />
        <span className="text-gray-700 font-medium">-</span>
        <input
         type="text"          
         inputMode="numeric"  
         placeholder="Máx"
         min="0"
         value={precoMax}
         onChange={(e) => setPrecoMax(e.target.value)}
         className="w-full sm:w-24 px-2 py-2 rounded-lg text-black shadow-sm"
        />
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-8 px-4">
          {produtos.length === 0 ? (
            <p className="text-gray-600 text-lg">Carregando produtos...</p>
          ) : produtosFiltrados.length === 0 ? (
            <p className="text-gray-600 text-lg">Nenhum produto encontrado.</p>
          ) : (
            produtosFiltrados.map((produto) => (
              <ProdutoCard
                key={produto.nome}
                nome={produto.nome}
                imagem={produto.imagem}
                descricao={produto.descricao}
                preco={produto.preco}
                onAdicionarAoCarrinho={() => adicionarAoCarrinho(produto)}
                noCarrinho={!!itensCarrinho.find((p) => p.nome === produto.nome)}
              />
            ))
          )}
        </div>
      </main>
    </>
  );
}