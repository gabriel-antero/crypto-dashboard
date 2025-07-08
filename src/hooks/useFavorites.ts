import { useState, useEffect } from 'react';

const getFavoritesFromStorage = (): string[] => {
    if (typeof window === 'undefined') {
        return [];
    }
    const favorites = localStorage.getItem('cryptoFavorites');
    return favorites ? JSON.parse(favorites) : [];
};

export const useFavorites = () => {
    const [favorites, setFavorites] = useState<string[]>([]);

    useEffect(() => {
        setFavorites(getFavoritesFromStorage());
    }, []);

    const toggleFavorite = (coinId: string) => {
        const newFavorites = favorites.includes(coinId)
            ? favorites.filter(id => id !== coinId)
            : [...favorites, coinId];

        setFavorites(newFavorites);
        localStorage.setItem('cryptoFavorites', JSON.stringify(newFavorites));
    };

    return { favorites, toggleFavorite };
};