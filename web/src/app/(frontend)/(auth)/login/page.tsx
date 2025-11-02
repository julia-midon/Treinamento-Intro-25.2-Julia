"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !senha) {
      setMensagem("Por favor, preencha email e senha.");
      return;
    }
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      });
      const data = await response.json();
      if (!response.ok) {
        setMensagem(data.error || "Email ou senha incorretos.");
      } else {
        localStorage.setItem("usuario_logado", JSON.stringify(data.user));
        router.push("/");
      }
    } catch (error) {
      setMensagem("Erro ao tentar fazer login.");
    }
  };

  const handleCadastro = async () => {
    if (!email || !senha) {
      setMensagem("Preencha email e senha para se cadastrar.");
      return;
    }
    
    const name = email.split('@')[0];

    try {
      const response = await fetch('/api/cadastro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha, name }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMensagem(data.error || "Não foi possível cadastrar.");
      } else {
        setMensagem("Utilizador criado com sucesso! Clique em 'Entrar'.");
      }
    } catch (error) {
      setMensagem("Erro ao tentar se cadastrar.");
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
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700"
          >
            Entrar
          </button>
          <button
            onClick={handleCadastro}
            className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
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