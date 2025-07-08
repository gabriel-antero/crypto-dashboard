// app/components/CoinCard.tsx
import { FaCaretUp, FaCaretDown, FaStar } from 'react-icons/fa';

interface CoinCardProps {
    id: string;
    name: string;
    symbol: string;
    image: string;
    current_price: number;
    price_change_percentage_24h: number;
    isFavorite: boolean;
    onToggleFavorite: (e: React.MouseEvent) => void;
}

export default function CoinCard({ name, symbol, image, current_price, price_change_percentage_24h, isFavorite, onToggleFavorite }: CoinCardProps) {
    const isGainer = price_change_percentage_24h >= 0;
    const priceChangeColor = isGainer ? 'text-green-500' : 'text-red-500';
    const PriceChangeIcon = isGainer ? FaCaretUp : FaCaretDown;

    return (
        <div className="bg-gray-800 p-4 rounded-lg shadow-md flex items-center space-x-4 w-full transition-all duration-200 hover:bg-gray-700 hover:scale-105 hover:shadow-xl relative">
            <button
                onClick={onToggleFavorite}
                className="absolute top-2 right-2 text-xl p-2 rounded-full hover:bg-gray-600 transition-colors z-10"
                aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
            >
                <FaStar className={isFavorite ? 'text-yellow-400' : 'text-gray-500'} />
            </button>

            <img src={image} alt={name} className="w-12 h-12 self-start" />

            {/* Container principal para o texto, permitindo que os itens se empilhem */}
            <div className="flex-1">
                {/* Linha 1: Nome da Moeda */}
                <h3 className="text-xl font-bold">{name}</h3>

                {/* Linha 2: Símbolo e Variação */}
                <div className="flex items-center text-sm text-gray-400 mt-1">
                    <span className="font-bold">{symbol.toUpperCase()}</span>
                    <span className={`flex items-center font-semibold ml-4 ${priceChangeColor}`}>
                        <PriceChangeIcon />
                        {price_change_percentage_24h.toFixed(2)}%
                    </span>
                </div>

                {/* Linha 3: Preço Atual */}
                <p className="text-xl font-mono mt-2">
                    R$ {current_price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
            </div>
        </div>
    );
}