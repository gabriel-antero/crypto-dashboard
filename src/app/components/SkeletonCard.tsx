// app/components/SkeletonCard.tsx

export default function SkeletonCard() {
    return (
        <div className="bg-gray-800 p-4 rounded-lg shadow-md flex items-center space-x-4 w-full animate-pulse">
            {/* Círculo para a imagem da moeda */}
            <div className="w-12 h-12 bg-gray-700 rounded-full self-start"></div>

            {/* Container para o texto do esqueleto */}
            <div className="flex-1 space-y-2">
                {/* Linha 1: Retângulo para o nome da moeda */}
                <div className="h-5 bg-gray-700 rounded w-1/2"></div>

                {/* Linha 2: Container para Símbolo e Variação */}
                <div className="flex items-center space-x-4">
                    <div className="h-3 bg-gray-700 rounded w-1/6"></div>
                    <div className="h-3 bg-gray-700 rounded w-1/5"></div>
                </div>

                {/* Linha 3: Retângulo para o preço */}
                <div className="h-5 bg-gray-700 rounded w-2/5 mt-2"></div>
            </div>
        </div>
    );
}