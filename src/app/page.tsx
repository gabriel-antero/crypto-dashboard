// app/page.tsx
"use client";

import { useState, useEffect } from 'react';
import CoinCard from './components/CoinCard'; // Importando nosso novo componente
import Link from 'next/link';
import SkeletonCard from './components/SkeletonCard';
import SummaryCard from './components/SummaryCard';
import { motion } from 'framer-motion';
import { useFavorites } from '../hooks/useFavorites';

// Definindo o tipo para os dados da moeda para melhor organização
type Coin = {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // A mágica do escalonamento: 0.1s de atraso entre cada filho
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 }, // Começa 20px para baixo e invisível
  visible: { y: 0, opacity: 1 },  // Termina na posição Y normal e visível
};

export default function HomePage() {
  // O estado agora vai guardar um ARRAY de moedas
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { favorites, toggleFavorite } = useFavorites();
  const [viewMode, setViewMode] = useState<'all' | 'favorites'>('all');

  const [topGainer, setTopGainer] = useState<Coin | null>(null);
  const [topLoser, setTopLoser] = useState<Coin | null>(null);

  useEffect(() => {
    async function fetchCoins() {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=brl&order=market_cap_desc&per_page=10&page=1&sparkline=false');

        if (!response.ok) {
          throw new Error('Falha ao buscar os dados das moedas.');
        }

        const data = await response.json();
        setCoins(data); // Guardamos o array de moedas no estado

        if (data.length > 0) {
          const sortedByChange = [...data].sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h);
          setTopLoser(sortedByChange[0]);
          setTopGainer(sortedByChange[sortedByChange.length - 1]);
        }
      } catch (error) {
        console.error("Erro ao buscar os dados das moedas:", error);
        setError('Não foi possível carregar os dados. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    }

    fetchCoins();
  }, []);

  const handleFavoriteClick = (coinId: string) => (e: React.MouseEvent) => {
    e.preventDefault(); // Impede que o clique no botão navegue para a página de detalhes
    e.stopPropagation();
    toggleFavorite(coinId);
  };

  const filteredBySearch = coins.filter(coin =>
    coin.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayCoins = viewMode === 'favorites'
    ? filteredBySearch.filter(coin => favorites.includes(coin.id))
    : filteredBySearch;

  // 3. RENDERIZAÇÃO CONDICIONAL PARA O ERRO
  if (error) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-900 text-white">
        <h1 className="text-4xl font-bold mb-8 text-red-500">Ocorreu um Erro</h1>
        <p className="text-xl">{error}</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 lg:p-8">
      {/* Título Centralizado */}
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold">CryptoView Dashboard</h1>
        <p className="text-gray-400 mt-2">Seu resumo do mercado de criptomoedas.</p>
      </div>

      {/* Container Principal do Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">

        {/* === COLUNA PRINCIPAL (ESQUERDA) === */}
        <div className="lg:col-span-2 space-y-4">

          {/* A Barra de Busca vai AQUI DENTRO da coluna principal */}
          <input
            type="text"
            placeholder="Buscar por nome..."
            className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />

          <div className="flex space-x-4 border-b border-gray-700 mb-4">
            <button
              onClick={() => setViewMode('all')}
              className={`py-2 px-4 text-lg cursor-pointer font-semibold ${viewMode === 'all' ? 'border-b-2 border-indigo-500 text-white' : 'text-gray-400'}`}
            >
              Todas
            </button>
            <button
              onClick={() => setViewMode('favorites')}
              className={`py-2 px-4 text-lg cursor-pointer font-semibold ${viewMode === 'favorites' ? 'border-b-2 border-indigo-500 text-white' : 'text-gray-400'}`}
            >
              Favoritas ({favorites.length})
            </button>
          </div>

          {/* A Lista de Moedas (com seus estados de loading/error) */}
          {loading ? (
            // Esqueletos de Carregamento
            Array.from({ length: 10 }).map((_, index) => <SkeletonCard key={index} />)
          ) : error ? (
            // Mensagem de Erro
            <div className="bg-red-900/20 text-red-400 p-4 rounded-lg text-center">
              <p>{error}</p>
            </div>
          ) : (
            // Lista de Moedas Animada
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              {displayCoins.length > 0 ? (
                displayCoins.map(coin => (
                  <motion.div key={coin.id} variants={itemVariants} className="my-4 first:mt-0">
                    <Link href={`/moedas/${coin.id}`} className="block">
                      <CoinCard
                        {...coin}
                        isFavorite={favorites.includes(coin.id)}
                        onToggleFavorite={handleFavoriteClick(coin.id)}
                      />
                    </Link>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-10">
                  <p className="text-gray-400">Nenhuma moeda encontrada.</p>
                </div>
              )}
            </motion.div>
          )}
        </div>

        {/* === COLUNA LATERAL (DIREITA) === */}
        <div className="space-y-6">
          <SummaryCard title="Maior Alta (24h)" coin={topGainer} />
          <SummaryCard title="Maior Baixa (24h)" coin={topLoser} />
        </div>

      </div>
    </main>
  );
}