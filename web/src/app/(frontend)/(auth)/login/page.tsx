
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const router = useRouter();

  const handleCadastro = () => {
    if (!nome || !senha) {
      setMensagem("Por favor, preencha nome e senha.");
      return;
    }
    // Salva o novo usuário no localStorage
    // Em um app real, você checaria se o usuário já existe
    localStorage.setItem("usuario_cadastrado", JSON.stringify({ nome, senha }));
    setMensagem("Usuário cadastrado com sucesso! Agora você pode fazer login.");
  };

  const handleLogin = () => {
    if (!nome || !senha) {
      setMensagem("Por favor, preencha nome e senha.");
      return;
    }

    // Tenta buscar o usuário cadastrado
    const usuarioCadastradoJSON = localStorage.getItem("usuario_cadastrado");
    if (!usuarioCadastradoJSON) {
      setMensagem("Nenhum usuário cadastrado. Por favor, cadastre-se primeiro.");
      return;
    }

    const usuarioCadastrado = JSON.parse(usuarioCadastradoJSON);

    // Verifica se o nome e a senha batem
    if (
      usuarioCadastrado.nome === nome &&
      usuarioCadastrado.senha === senha
    ) {
      // Salva o usuário "logado" na sessão (localStorage)
      localStorage.setItem("usuario_logado", JSON.stringify({ nome }));
      // Redireciona para a página principal
      router.push("/");
    } else {
      setMensagem("Nome de usuário ou senha incorretos.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Login e Cadastro
        </h1>
        
        {mensagem && (
          <p className="mb-4 text-center text-red-500">{mensagem}</p>
        )}

        <div className="mb-4">
          <label 
            htmlFor="nome" 
            className="block text-sm font-medium text-gray-700 mb-1">
            Nome de Usuário
          </label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-black"
          />
        </div>

        <div className="mb-6">
          <label 
            htmlFor="senha" 
            className="block text-sm font-medium text-gray-700 mb-1">
            Senha
          </label>
          <input
            type="password"
            id="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-black"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleLogin}
            className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          >
            Entrar
          </button>
          <button
            onClick={handleCadastro}
            className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
          >
            Cadastrar
          </button>
        </div>

        <div className="mt-6 text-center">
            <Link href="/" className="text-sm text-purple-600 hover:underline">
              Voltar para a loja
            </Link>
        </div>
      </div>
    </div>
  );
}