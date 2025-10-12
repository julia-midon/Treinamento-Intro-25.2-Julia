"use client";

import { useState } from "react";
import { ShoppingCart, User } from "lucide-react";


interface ItemCarrinho {
  nome: string;
  preco: number;
}

interface BarraNavegacaoProps {
  totalItens: number;
  totalPreco: number;
  Adicionados: ItemCarrinho[];
}

export default function BarraNavegacao({
  totalItens,
  totalPreco,
  Adicionados,

}: BarraNavegacaoProps) {

  const [aberto, setAberto] = useState(false);

  return (
    <nav className="bg-purple-600 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

      <div className="flex items-center gap-2">
        <span className="text-3xl font-bold text-white">Loki & Company 🎃</span>
      </div>

      <button 
        onClick={() => setAberto((prev) => !prev)}
        className="flex items-center gap-2 cursor-pointer">
        <div className="flex items-center gap-4 bg-green-100 px-10 py-2 rounded-full shadow-sm">
          <div className="flex items-center gap-2">
          <User className="text-green-700 w-5 h-5" />
          <span className=" text-gray-700 font-medium sm:block">Petlover</span> 
          </div>
          <div className="flex items-center gap-2">
          <ShoppingCart className="text-green-700 w-5 h-5" />
          <span className="text-gray-800 font-semibold">{totalItens}</span>
          </div>
          <span className="text-green-700 font-bold">R$ {totalPreco.toFixed(2)}</span>
        </div>
        </button>

      {aberto && (
        <div className="absolute right-18 top-15 bg-white shadow-lg rounded-xl w-64 border border-green-200 p-4 z-50">
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
