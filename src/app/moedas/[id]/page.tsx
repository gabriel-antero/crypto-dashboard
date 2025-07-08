// app/moedas/[id]/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// A interface da nossa página espera receber 'params', que contém o 'id' da URL
interface DetailPageProps {
    params: { id: string };
}

// O tipo de dado que esperamos para o nosso gráfico
type ChartData = {
    date: string;
    price: number;
};

export default function CoinDetailPage({ params }: DetailPageProps) {
    const [chartData, setChartData] = useState<ChartData[]>([]);
    const [loading, setLoading] = useState(true);
    const coinId = params.id; // Pegando o ID da moeda a partir dos parâmetros da URL
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchChartData() {
            try {
                const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=brl&days=7`);
                const data = await response.json();

                // A API retorna um array de arrays: [[timestamp, price], ...].
                // Precisamos formatá-lo para o formato que o Recharts espera: [{date: '...', price: ...}, ...]
                if (!response.ok) {
                    throw new Error('Falha ao buscar os dados das moedas.');
                }

                const formattedData = data.prices.map((priceData: [number, number]) => ({
                    date: new Date(priceData[0]).toLocaleDateString('pt-BR'),
                    price: priceData[1],
                }));

                setChartData(formattedData);
            } catch (error) {
                console.error("Erro ao buscar dados do gráfico:", error);
                setError('Não foi possível carregar o gráfico. Tente novamente mais tarde.');
            } finally {
                setLoading(false);
            }
        }

        fetchChartData();
    }, [coinId]); // O efeito depende do coinId, se ele mudar, a busca é refeita.

    if (error) {
        return (
            <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-900 text-white">
                <h1 className="text-4xl font-bold mb-8 text-red-500">Ocorreu um Erro</h1>
                <p className="text-xl">{error}</p>
            </main>
        );
    }

    return (
        <main className="flex min-h-screen flex-col items-center p-8 bg-gray-900 text-white">
            <h1 className="text-4xl font-bold mb-2 capitalize">{coinId}</h1>
            <p className="text-lg text-gray-400 mb-8">Histórico de Preços (Últimos 7 dias)</p>

            {loading ? (
                <p className="text-xl text-yellow-400">Carregando gráfico...</p>
            ) : (
                <div className="w-full max-w-4xl h-96 bg-gray-800 p-4 rounded-lg">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                            <defs>
                                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="date" stroke="#8884d8" />
                            <YAxis stroke="#8884d8" tickFormatter={(value) => `R$${value.toLocaleString('pt-BR')}`} />
                            <Tooltip formatter={(value: number) => [`R$${value.toLocaleString('pt-BR')}`, 'Preço']} contentStyle={{ backgroundColor: '#333' }} />
                            <Area type="monotone" dataKey="price" stroke="#8884d8" fillOpacity={1} fill="url(#colorPrice)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            )}
        </main>
    );
}