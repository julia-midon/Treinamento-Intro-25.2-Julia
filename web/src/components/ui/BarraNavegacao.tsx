"use client";

import { useState } from "react";
import { ShoppingCart, User, LogOut, X, Plus, Minus } from "lucide-react"; 
import Link from "next/link";

interface ItemCarrinho {
  nome: string;
  preco: number;
  quantidade: number;
}

interface BarraNavegacaoProps {
  totalItens: number;
  totalPreco: number;
  nomeUsuario: string | null;
  onLogout: () => void;
  itensDoCarrinho: ItemCarrinho[];
  onAlterarQuantidade: (nome: string, delta: number) => void;
  onRemoverItem: (nome: string) => void;
  onFinalizarCompra: () => void;
  compraStatus: string;
  compraLoading: boolean;
}

export default function BarraNavegacao({
  totalItens,
  totalPreco,
  nomeUsuario,
  onLogout,
  itensDoCarrinho,
  onAlterarQuantidade,
  onRemoverItem,
  onFinalizarCompra,
  compraStatus,
  compraLoading,
}: BarraNavegacaoProps) {

  const [aberto, setAberto] = useState(false);

  const handleLogout = () => {
    onLogout();
    setAberto(false); 
  };

  return (
    <nav className="bg-purple-600 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">

        <div className="flex items-center gap-2">
          <Link href="/" className="text-2xl sm:text-3xl font-bold text-white">
            Loki & Company 
          </Link>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          
          {nomeUsuario ? (
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-2">
                <User className="text-white w-5 h-5" />
                <span className="hidden sm:block text-white font-medium">
                  Olá, {nomeUsuario}
                </span>
              </div>
              
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-white hover:text-red-300 transition-colors"
                title="Sair"
              >
                <LogOut className="w-5 h-5"/>
                <span className="hidden sm:block font-medium">Sair</span>
              </button>
            </div>
          ) : (
             <Link 
              href="/login" 
              className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm text-gray-800 font-medium hover:bg-gray-100"
            >
              <User className="w-5 h-5 text-gray-700"/>
              <span className="hidden sm:block">Entrar / Cadastrar</span>
            </Link>
          )}

          <button
            onClick={() => setAberto((prev) => !prev)}
            className="flex items-center gap-2 sm:gap-4 bg-white px-4 sm:px-6 py-2 rounded-full shadow-sm cursor-pointer hover:bg-gray-100"
          >
            <div className="flex items-center gap-2">
              <ShoppingCart className="text-gray-700 w-5 h-5" />
              <span className="text-gray-800 font-semibold">{totalItens}</span>
            </div>
            <span className="hidden sm:block text-gray-700 font-bold">
              R$ {totalPreco.toFixed(2)}
            </span>
          </button>
        </div>

        {aberto && (
          <div 
            className="
              absolute top-20 bg-white shadow-lg rounded-xl border border-green-200 p-4 z-50
              left-4 right-4 
              sm:left-auto sm:right-6 sm:w-80
            "
          >
            <h3 className="font-semibold text-gray-800 mb-2">Meus Pedidos:</h3>
            
            {itensDoCarrinho.length === 0 ?
              (<p className="text-gray-500 text-sm">Carrinho vazio</p>)
              :
              (<ul className="space-y-3 max-h-60 overflow-y-auto">
                {itensDoCarrinho.map((produto) => (
                  <li
                    key={produto.nome}
                    className="flex justify-between items-center text-sm text-gray-700 border-b pb-2 gap-2"
                  >
                    <span className="font-medium flex-1">{produto.nome}</span>
                    
                    <div className="flex items-center gap-2 border rounded-full px-2">
                      <button onClick={() => onAlterarQuantidade(produto.nome, -1)} className="text-red-500">
                        <Minus size={14} />
                      </button>
                      <span className="font-bold text-xs">{produto.quantidade}</span>
                      <button onClick={() => onAlterarQuantidade(produto.nome, 1)} className="text-green-500">
                        <Plus size={14} />
                      </button>
                    </div>

                    <span className="font-semibold w-16 text-right">
                      R$ {(produto.preco * produto.quantidade).toFixed(2)}
                    </span>

                    <button onClick={() => onRemoverItem(produto.nome)} className="text-gray-400 hover:text-red-500">
                      <X size={16}/>
                    </button>
                  </li>
                ))}
              </ul>
              )}
            
            {itensDoCarrinho.length > 0 && (
              <div className="mt-4">
                <div className="flex justify-between font-bold text-green-700">
                  <span>Total:</span>
                  <span>R$ {totalPreco.toFixed(2)}</span>
                </div>
                
                <button
                  onClick={onFinalizarCompra}
                  disabled={compraLoading}
                  className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded-lg mt-3 hover:bg-green-600 disabled:bg-gray-400"
                >
                  {compraLoading ? "A processar..." : "Finalizar Compra"}
                </button>
              </div>
            )}
            
            {compraStatus && (
              <p className="text-center text-sm font-medium text-red-600 mt-3">
                {compraStatus}
              </p>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}