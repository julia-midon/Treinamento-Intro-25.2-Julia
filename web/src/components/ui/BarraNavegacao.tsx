"use client";

import { useState } from "react";
import { ShoppingCart, User, LogOut } from "lucide-react"; 
import Link from "next/link";

interface ItemCarrinho {
  nome: string;
  preco: number;
}

interface BarraNavegacaoProps {
  totalItens: number;
  totalPreco: number;
  Adicionados: ItemCarrinho[];
  nomeUsuario: string | null;
  onLogout: () => void;
}

export default function BarraNavegacao({
  totalItens,
  totalPreco,
  Adicionados,
  nomeUsuario,
  onLogout,
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
            Loki & Company 🎃
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
              <User className="w-5 h-5 text-purple-700"/>
              
              <span className="hidden sm:block">Entrar / Cadastrar</span>
            </Link>
          )}

          <button
            onClick={() => setAberto((prev) => !prev)}
            className="flex items-center gap-2 sm:gap-4 bg-white px-4 sm:px-6 py-2 rounded-full shadow-sm cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <ShoppingCart className="text-purple-700 w-5 h-5" />
              <span className="text-gray-800 font-semibold">{totalItens}</span>
            </div>
           
            <span className="hidden sm:block text-purple-700 font-bold">
              R$ {totalPreco.toFixed(2)}
            </span>
          </button>
        </div>

        {aberto && (
         
          <div className="absolute right-4 sm:right-6 top-20 bg-white shadow-lg rounded-xl w-64 border border-green-200 p-4 z-50">
            <h3 className="font-semibold text-gray-800 mb-2">Meus Pedidos:</h3>
            {Adicionados.length === 0 ?
              (<p className="text-gray-500 text-sm">Carrinho vazio</p>)
              :
              (<ul className="space-y-2 max-h-60 overflow-y-auto">
                {Adicionados.map((produto, index) => (
                  <li
                    key={index}
                    className="flex justify-between text-sm text-gray-700 border-b pb-1">
                    <span>{produto.nome}</span>
                    <span className="font-semibold">R$ {produto.preco.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              )}
            {Adicionados.length > 0 && (
              <div className="mt-3 text-right font-bold text-green-700">Total: R$ {totalPreco.toFixed(2)}</div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}