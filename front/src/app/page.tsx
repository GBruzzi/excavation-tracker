"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; 

export default function CadastroLogin() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    nome: "",
    contato: "",
    instituicao: "",
    especialidade: "",
  });

  const [loginData, setLoginData] = useState({
    nome: "",
    contato: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleCadastro = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/pesquisador", formData);
      alert("Cadastro realizado com sucesso!");
      console.log(response.data);
    } catch (error) {
      alert("Erro no cadastro!");
      console.error(error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/auth/login", loginData);
      
      // armazena tokem no ls
      localStorage.setItem("authToken", response.data.token);

      router.push("/pontos");

      alert("Login realizado!");
      console.log(response.data);
    } catch (error) {
      alert("Erro no login!");
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <div className="flex flex-col md:flex-row gap-8 bg-gray-800 p-8 rounded-lg shadow-lg">
        {/* Formulário de Cadastro */}
        <div>
          <h2 className="text-xl font-bold mb-4 text-center !mt-3">Cadastro</h2>
          <form onSubmit={handleCadastro} className="flex flex-col gap-3">
            <input
              type="text"
              name="nome"
              placeholder="Nome"
              value={formData.nome}
              onChange={handleChange}
              className="p-2 rounded bg-gray-700 !pl-4"
              required
            />
            <input
              type="text"
              name="contato"
              placeholder="Contato"
              value={formData.contato}
              onChange={handleChange}
              className="p-2 rounded bg-gray-700 !pl-4"
            />
            <input
              type="text"
              name="instituicao"
              placeholder="Instituição"
              value={formData.instituicao}
              onChange={handleChange}
              className="p-2 rounded bg-gray-700 !pl-4"
            />
            <input
              type="text"
              name="especialidade"
              placeholder="Especialidade"
              value={formData.especialidade}
              onChange={handleChange}
              className="p-2 rounded bg-gray-700 !pl-4"
            />
            <button type="submit" className="bg-green-600 p-2 rounded mt-2 !mb-2">
              Cadastrar
            </button>
          </form>
        </div>

        {/* Formulário de Login */}
        <div>
          <h2 className="text-xl font-bold mb-4 text-center !mt-3">Login</h2>
          <form onSubmit={handleLogin} className="flex flex-col gap-3">
            <input
              type="text"
              name="nome"
              placeholder="Nome"
              value={loginData.nome}
              onChange={handleLoginChange}
              className="p-2 rounded bg-gray-700 "
              required
            />
            <input
              type="text"
              name="contato"
              placeholder="Contato"
              value={loginData.contato}
              onChange={handleLoginChange}
              className="p-2 rounded bg-gray-700"
              required
            />
            <button type="submit" className="bg-blue-600 p-2 rounded !mt-18">
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
