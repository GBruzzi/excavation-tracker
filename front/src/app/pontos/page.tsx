"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

interface Ponto {
  id: number;
  tipoPonto: string;
  descricao: string;
  latitude: number;
  longitude: number;
  altitude: number;
  dataDescoberta: string;
  pesquisadorId: number;
}

export default function Pontos() {
  const [pontos, setPontos] = useState<Ponto[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [novoPonto, setNovoPonto] = useState<Omit<Ponto, "id">>({
    tipoPonto: "",
    descricao: "",
    latitude: 0,
    longitude: 0,
    altitude: 0,
    dataDescoberta: "",
    pesquisadorId: 0,
  });

  const router = useRouter();

  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      router.push("/");
      return;
    }

    try {
      const decoded: any = jwtDecode(token); // decodifica token
      setUserId(decoded.sub); // captura ID
    } catch (error) {
      console.error("Erro ao decodificar o token", error);
      router.push("/");
      return;
    }

    axios
      .get<Ponto[]>("http://localhost:3000/ponto", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setPontos(res.data))
      .catch(() => {
        alert("Erro ao carregar pontos");
        router.push("/");
      });
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNovoPonto({ ...novoPonto, [e.target.name]: e.target.value });
  };

  const excluirPonto = async (pontoId: number) => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      alert("Usuário não autenticado!");
      return;
    }

    console.log(pontoId);
    try {
      const response = await axios.delete(
        `http://localhost:3000/ponto/${pontoId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Atualiza a lista de pontos após a exclusão
      setPontos(pontos.filter((ponto) => ponto.id !== pontoId));
      alert("Ponto excluído com sucesso ! ");
    } catch (error) {
      alert("Erro ao excluir ponto ");
      console.error("Erro ao excluir ponto:", error);
    }
  };

  const adicionarPonto = async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      alert("Usuário não autenticado!");
      return;
    }

    try {
      const decoded: any = jwtDecode(token);
      const pesquisadorId = decoded.sub;

      const pontoComPesquisadorId = { ...novoPonto, pesquisadorId };

      const res = await axios.post<Ponto>(
        "http://localhost:3000/ponto",
        pontoComPesquisadorId,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setPontos([...pontos, res.data]);
      setIsModalOpen(false);
      setNovoPonto({
        tipoPonto: "",
        descricao: "",
        latitude: 0,
        longitude: 0,
        altitude: 0,
        dataDescoberta: "",
        pesquisadorId: 0,
      });

      alert("Ponto criado com sucesso !");
    } catch (error) {
      alert("Erro ao adicionar ponto");
    }
  };

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();

    const isConfirmed = window.confirm("Tem certeza que deseja logar ?");
    if (isConfirmed) {
      localStorage.clear();
      router.push("/");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-5">
      <button
        onClick={handleLogout}
        className="!mb-5 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded"
      >
        Deslogar
      </button>

      <h1 className="text-2xl font-bold !mb-8">Pontos Cadastrados</h1>

      {/* Botão Adicionar Ponto */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="!mb-5 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded"
      >
        ➕ Adicionar Ponto
      </button>

      {/* Modal de Adição de Ponto */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-6">
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold text-center mb-6">Novo Ponto</h2>

            <div className="flex flex-col gap-2">
              <div>
                <label htmlFor="tipoPonto" className="text-white block mb-1">
                  Tipo do Ponto
                </label>
                <input
                  id="tipoPonto"
                  type="text"
                  name="tipoPonto"
                  placeholder="Digite o tipo do ponto"
                  value={novoPonto.tipoPonto}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg bg-gray-700 text-white"
                />
              </div>

              <div>
                <label htmlFor="descricao" className="text-white block mb-1">
                  Descrição
                </label>
                <input
                  id="descricao"
                  type="text"
                  name="descricao"
                  placeholder="Digite a descrição"
                  value={novoPonto.descricao}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg bg-gray-700 text-white"
                />
              </div>

              <div>
                <label htmlFor="latitude" className="text-white block mb-1">
                  Latitude
                </label>
                <input
                  id="latitude"
                  type="number"
                  name="latitude"
                  placeholder="Digite a latitude"
                  value={novoPonto.latitude}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg bg-gray-700 text-white"
                />
              </div>

              <div>
                <label htmlFor="longitude" className="text-white block mb-1">
                  Longitude
                </label>
                <input
                  id="longitude"
                  type="number"
                  name="longitude"
                  placeholder="Digite a longitude"
                  value={novoPonto.longitude}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg bg-gray-700 text-white"
                />
              </div>

              <div>
                <label htmlFor="altitude" className="text-white block mb-1">
                  Altitude
                </label>
                <input
                  id="altitude"
                  type="number"
                  name="altitude"
                  placeholder="Digite a altitude"
                  value={novoPonto.altitude}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg bg-gray-700 text-white"
                />
              </div>

              <div>
                <label
                  htmlFor="dataDescoberta"
                  className="text-white block mb-1"
                >
                  Data de Descoberta
                </label>
                <input
                  id="dataDescoberta"
                  type="date"
                  name="dataDescoberta"
                  value={novoPonto.dataDescoberta}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg bg-gray-700 text-white mb-6"
                />
              </div>
            </div>

            <div className="flex justify-between gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg"
              >
                ❌ Cancelar
              </button>
              <button
                onClick={adicionarPonto}
                className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg"
              >
                ✅ Adicionar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tabela de Pontos */}
      {pontos.length > 0 ? (
        <div className="overflow-x-auto w-full max-w-6xl">
          <table className="w-full border-collapse border border-gray-700 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="border border-gray-600 px-6 py-4 text-center">
                  Tipo
                </th>
                <th className="border border-gray-600 px-6 py-4 text-center">
                  Descrição
                </th>
                <th className="border border-gray-600 px-6 py-4 text-center min-w-[120px]">
                  Latitude
                </th>
                <th className="border border-gray-600 px-6 py-4 text-center min-w-[120px]">
                  Longitude
                </th>
                <th className="border border-gray-600 px-6 py-4 text-center">
                  Altitude (m)
                </th>
                <th className="border border-gray-600 px-6 py-4 text-center min-w-[140px]">
                  Data
                </th>
                <th className="border border-gray-600 px-6 py-4 text-left min-w-[160px]">
                  Pesquisador
                </th>
                <th className="border border-gray-600 px-6 py-4 text-center min-w-[180px]">
                  Instituição
                </th>
                <th className="border border-gray-600 !px-6 py-4 text-center">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {pontos.map((ponto: any) => (
                <tr
                  key={ponto.id}
                  className="odd:bg-gray-700 even:bg-gray-800 hover:bg-gray-600 transition-colors"
                >
                  <td className="border border-gray-600 !px-6 !py-4 text-center">
                    {ponto.tipoPonto}
                  </td>
                  <td className="border border-gray-600 px-6 py-4 break-words max-w-xs !p-4">
                    {ponto.descricao}
                  </td>
                  <td className="border border-gray-600 px-6 py-4 text-center">
                    {ponto.latitude}
                  </td>
                  <td className="border border-gray-600 px-6 py-4 text-center">
                    {ponto.longitude}
                  </td>
                  <td className="border border-gray-600 px-6 py-4 text-center">
                    {ponto.altitude}
                  </td>
                  <td className="border border-gray-600 px-6 py-4 text-center">
                    {new Date(ponto.dataDescoberta).toLocaleDateString("pt-BR")}
                  </td>
                  <td className="border border-gray-600 px-6 py-4 text-left">
                    {ponto.pesquisador?.nome}
                  </td>
                  <td className="border border-gray-600 px-6 py-4 text-center">
                    {ponto.pesquisador?.instituicao}
                  </td>
                  <td className="border border-gray-600 px-6 py-4 text-center">
                    {ponto.pesquisador?.id === userId && (
                      <button
                        onClick={() => excluirPonto(ponto.id)}
                        className="text-red-600 hover:text-red-400 transition-colors"
                      >
                        ❌
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-lg">Nenhum ponto encontrado.</p>
      )}
    </div>
  );
}
