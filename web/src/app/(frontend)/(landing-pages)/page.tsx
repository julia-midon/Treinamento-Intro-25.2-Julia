"use client";

import { useEffect, useState } from "react";
import ProdutoCard from "@/components/ui/ProdutoCard";
import BarraNavegacao from "@/components/ui/BarraNavegacao";
import { Search, DollarSign } from "lucide-react"; 

interface Produto {
  id: string; 
  nome: string;
  imagem: string;
  descricao: string;
  preco: number;
}

interface Categoria {
  id: string;
  nome: string;
}

interface ItemCarrinho extends Produto {
  quantidade: number;
}

interface Usuario {
  id: string;
  name: string;
  email: string;
}

export default function Page() {
  
  const [termoBusca, setTermoBusca] = useState("");
  const [precoMin, setPrecoMin] = useState("");
  const [precoMax, setPrecoMax] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  
 
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  
  
  const [usuario, setUsuario] = useState<Usuario | null>(null);

 
  const [itensCarrinho, setItensCarrinho] = useState<ItemCarrinho[]>([]);
  const [carrinhoCarregado, setCarrinhoCarregado] = useState(false);
  
  const [compraLoading, setCompraLoading] = useState(false);
  const [compraStatus, setCompraStatus] = useState("");

  useEffect(() => {
    try {
      const carrinhoSalvo = localStorage.getItem('carrinho');
      if (carrinhoSalvo) {
        setItensCarrinho(JSON.parse(carrinhoSalvo));
      }
    } catch (error) {
      console.error("Erro ao carregar o carrinho do localStorage", error);
    }
    setCarrinhoCarregado(true);
  }, []); 

  useEffect(() => {
    if (carrinhoCarregado) {
      localStorage.setItem('carrinho', JSON.stringify(itensCarrinho));
    }
  }, [itensCarrinho, carrinhoCarregado]); 

  useEffect(() => {
    fetch("/api/categoria") 
      .then((res) => res.json())
      .then((data) => setCategorias(data))
      .catch((err) => console.error("Erro ao buscar categorias:", err));

    const usuarioLogadoJSON = localStorage.getItem('usuario_logado');
    if (usuarioLogadoJSON) {
      const usuarioLogado = JSON.parse(usuarioLogadoJSON);
      setUsuario(usuarioLogado);
    }
  }, []); 

  useEffect(() => {
    const params = new URLSearchParams();
    if (termoBusca) params.append('busca', termoBusca);
    if (categoriaId) params.append('categoriaId', categoriaId);
    if (precoMin) params.append('precoMin', precoMin);
    if (precoMax) params.append('precoMax', precoMax);
    
    fetch(`/api/produtos?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => setProdutos(data))
      .catch((err) => console.error("Erro ao buscar produtos:", err));

  }, [termoBusca, categoriaId, precoMin, precoMax]);

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

  const handleFinalizarCompra = async () => {
    if (!usuario) {
      setCompraStatus("Erro: Faça login para finalizar a compra!");
      return;
    }
    if (itensCarrinho.length === 0) {
      setCompraStatus("Erro: O seu carrinho está vazio!");
      return;
    }

    setCompraLoading(true);
    setCompraStatus("");

    const dadosCompra = {
      userId: usuario.id,
      precoTotal: totalPreco,
      produtos: itensCarrinho.map(item => ({
        produtoId: item.id,
        quantidade: item.quantidade
      }))
    };

    try {
      const response = await fetch('/api/compras', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosCompra)
      });

      if (!response.ok) {
        const erro = await response.json();
        throw new Error(erro.error || "Não foi possível registar a compra.");
      }
      
      setCompraStatus("Compra realizada com sucesso!");
      setItensCarrinho([]); 

    } catch (error) {
      setCompraStatus(error instanceof Error ? error.message : "Erro desconhecido.");
    } finally {
      setCompraLoading(false);
    }
  };

  const totalItens = itensCarrinho.reduce((acc, item) => acc + item.quantidade, 0);
  const totalPreco = itensCarrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
  
  return (
    <>
      <BarraNavegacao
        totalItens={totalItens}
        totalPreco={totalPreco}
        nomeUsuario={usuario ? usuario.name : null} 
        onLogout={executarLogout}
        itensDoCarrinho={itensCarrinho} 
        onAlterarQuantidade={alterarQuantidade}
        onRemoverItem={removerItemDoCarrinho}
        onFinalizarCompra={handleFinalizarCompra}
        compraStatus={compraStatus}
        compraLoading={compraLoading}
      />

      <main className="min-h-screen bg-purple-300 flex flex-col items-center py-10">
        
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Catálogo de Produtos
        </h1>

        <div className="w-full max-w-4xl bg-white/30 backdrop-blur-sm p-4 rounded-lg shadow-md mb-8 flex flex-col sm:flex-row gap-4">
          
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

          <select 
            value={categoriaId}
            onChange={(e) => setCategoriaId(e.target.value)}
            className="w-full sm:w-auto px-4 py-2 rounded-lg text-black shadow-sm"
          >
            <option value="">Todas as categorias</option>
            {categorias.map(categoria => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nome}
              </option>
            ))}
          </select>
          
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto sm:items-center">
            
            <div className="flex items-center gap-2 w-full">
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
            </div>

            <span className="hidden sm:block text-gray-700 font-medium">-</span>

            <div className="flex items-center gap-2 w-full">
              <DollarSign className="text-gray-700 sm:hidden" size={20} style={{ opacity: 0 }}/>
              <input
                type="text"
                inputMode="numeric"
                placeholder="Max"
                min="0"
                value={precoMax}
                onChange={(e) => setPrecoMax(e.target.value)}
                className="w-full sm:w-24 px-2 py-2 rounded-lg text-black shadow-sm"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-8 px-4">
          {produtos.length === 0 ? (
            <p className="text-gray-600 text-lg">
              {categorias.length === 0 ? "Carregando..." : "Nenhum produto encontrado."}
            </p>
          ) : (
            produtos.map((produto) => (
              <ProdutoCard
                key={produto.id}
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