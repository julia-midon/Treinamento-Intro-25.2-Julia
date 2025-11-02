"use client";

import React from "react";
import Image from "next/image";

interface Propriedades {
  nome: string;
  imagem: string;
  descricao: string;
  preco: number;
  noCarrinho: boolean;
  onAdicionarAoCarrinho: () => void;
}

const ProdutoCard: React.FC<Propriedades> = ({
  nome,
  preco,
  descricao,
  imagem,
  noCarrinho,
  onAdicionarAoCarrinho, 
}) => {
  return (
    <div className="max-w-sm w-full bg-white shadow-md rounded-2xl p-6 z-5 hover:shadow-lg transition-shadow duration-300">
      <div className="relative w-full h-80 mb-4">
        <Image
          src={imagem}
          alt={`Imagem de ${nome}`}
          fill
          className="object-cover rounded-xl"
        />
      </div>
      <h2 className="text-xl font-semibold text-gray-800">{nome}</h2>
      <p className="text-gray-600 text-sm mt-2">{descricao}</p>
      <div className="mt-4 text-lg font-semibold text-green-600">
        R$ {preco.toFixed(2)}
      </div>

      <button
        onClick={onAdicionarAoCarrinho}
        className={`mt-4 w-full font-semibold py-2 px-4 rounded-lg transition-colors cursor-pointer ${
          noCarrinho
            ? "bg-green-700 hover:bg-green-800 text-white" 
            : "bg-green-500 hover:bg-green-600 text-white" 
        }`}
      >
        {noCarrinho ? "Adicionado" : "Adicionar ao carrinho"}
      </button>
    </div>
  );
};

export default ProdutoCard;