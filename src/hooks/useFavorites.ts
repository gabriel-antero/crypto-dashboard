// hooks/useFavorites.ts
import { useState, useEffect } from 'react';

const getFavoritesFromStorage = (): string[] => {
    // Verifica se o código está rodando no navegador antes de acessar o localStorage
    if (typeof window === 'undefined') {
        return [];
    }
    const favorites = localStorage.getItem('cryptoFavorites');
    return favorites ? JSON.parse(favorites) : [];
};

export const useFavorites = () => {
    const [favorites, setFavorites] = useState<string[]>([]);

    // Carrega os favoritos do localStorage quando o hook é usado pela primeira vez
    useEffect(() => {
        setFavorites(getFavoritesFromStorage());
    }, []);

    const toggleFavorite = (coinId: string) => {
        const newFavorites = favorites.includes(coinId)
            ? favorites.filter(id => id !== coinId) // Remove se já existe
            : [...favorites, coinId]; // Adiciona se não existe

        setFavorites(newFavorites);
        localStorage.setItem('cryptoFavorites', JSON.stringify(newFavorites));
    };

    return { favorites, toggleFavorite };
};