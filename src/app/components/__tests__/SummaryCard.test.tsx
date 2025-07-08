import React from 'react';
import { render, screen } from '@testing-library/react';
import SummaryCard from '../SummaryCard'; // Ajuste o caminho se necessário

// 'describe' agrupa testes relacionados para um mesmo componente
describe('SummaryCard Component', () => {

    // Teste 1: Verifica o estado de esqueleto (loading)
    test('deve renderizar o esqueleto quando não há dados da moeda', () => {
        render(<SummaryCard title="Maior Alta (24h)" coin={null} />);

        // Verificamos se o título aparece, pois ele é exibido mesmo no modo esqueleto
        expect(screen.getByText('Maior Alta (24h)')).toBeInTheDocument();
    });

    // Teste 2: Verifica o estado com dados de uma moeda em alta
    test('deve renderizar as informações da moeda em alta corretamente', () => {
        const mockGainerCoin = {
            name: 'Bitcoin',
            image: 'fake-image-url.png',
            price_change_percentage_24h: 5.75,
        };

        render(<SummaryCard title="Maior Alta (24h)" coin={mockGainerCoin} />);

        // Verificamos se os dados da moeda aparecem na tela
        expect(screen.getByText('Bitcoin')).toBeInTheDocument();
        expect(screen.getByAltText('Bitcoin')).toBeInTheDocument(); // Verifica a imagem pelo alt text
        expect(screen.getByText(/5\.75%/)).toBeInTheDocument(); // Usa regex para encontrar o texto da porcentagem

        // Verifica se a cor do texto está correta (verde para alta)
        const percentageText = screen.getByText(/5\.75%/);
        expect(percentageText).toHaveClass('text-green-500');
    });

    // Teste 3: Verifica o estado com dados de uma moeda em baixa
    test('deve renderizar as informações da moeda em baixa corretamente', () => {
        const mockLoserCoin = {
            name: 'Ethereum',
            image: 'another-fake-image.png',
            price_change_percentage_24h: -2.33,
        };

        render(<SummaryCard title="Maior Baixa (24h)" coin={mockLoserCoin} />);

        expect(screen.getByText('Ethereum')).toBeInTheDocument();
        expect(screen.getByText(/-2\.33%/)).toBeInTheDocument();

        // Verifica se a cor do texto está correta (vermelho para baixa)
        const percentageText = screen.getByText(/-2\.33%/);
        expect(percentageText).toHaveClass('text-red-500');
    });
});