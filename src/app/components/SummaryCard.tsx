import { FaCaretUp, FaCaretDown } from 'react-icons/fa';
import Image from 'next/image';

type Coin = {
    name: string;
    image: string;
    price_change_percentage_24h: number;
};

interface SummaryCardProps {
    title: string;
    coin: Coin | null;
}

export default function SummaryCard({ title, coin }: SummaryCardProps) {
    if (!coin) {
        return (
            <div className="bg-gray-800 p-4 rounded-lg shadow-md animate-pulse">
                <h2 className="text-lg font-semibold text-gray-400 mb-2">{title}</h2>
                <div className="h-6 bg-gray-700 rounded w-3/4"></div>
                <div className="h-4 bg-gray-700 rounded w-1/2 mt-2"></div>
            </div>
        );
    }

    const isGainer = coin.price_change_percentage_24h >= 0;
    const colorClass = isGainer ? 'text-green-500' : 'text-red-500';
    const Icon = isGainer ? FaCaretUp : FaCaretDown;

    return (
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-400 mb-2">{title}</h2>
            <div className="flex items-center space-x-3">
                <Image src={coin.image} alt={coin.name} width={48} height={48} className="w-12 h-12 self-start" />
                <span className="font-bold text-white">{coin.name}</span>
                <span className={`flex items-center font-bold ${colorClass}`}>
                    <Icon className="mr-1" />
                    {coin.price_change_percentage_24h.toFixed(2)}%
                </span>
            </div>
        </div>
    );
}