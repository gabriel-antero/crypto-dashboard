# ✨ CryptoView Dashboard

![Prévia do CryptoView Dashboard]([https://imgur.com/a/ph9c3cK])


## 📖 Sobre o Projeto

O CryptoView Dashboard é uma aplicação web interativa e responsiva construída para acompanhar o mercado de criptomoedas em tempo real. O projeto foi desenvolvido como uma forma de aplicar e solidificar conhecimentos avançados em desenvolvimento front-end, desde o consumo de APIs e gerenciamento de estado até a implementação de testes automatizados e uma experiência de usuário polida.

**Acesse a aplicação ao vivo:** [**https://crypto-dashboard-nine-teal.vercel.app/**]

---

## 🚀 Funcionalidades Principais

* **Dashboard Principal:** Visualização de um resumo do mercado com as principais moedas, maiores altas e baixas das últimas 24h.
* **Busca em Tempo Real:** Campo de busca que filtra a lista de moedas instantaneamente conforme o usuário digita.
* **Página de Detalhes Dinâmica:** Rotas dinâmicas (`/moedas/[id]`) que exibem informações detalhadas e um gráfico interativo com o histórico de preços dos últimos 7 dias para cada moeda.
* **Sistema de Favoritos:** Os usuários podem marcar suas moedas favoritas, e essa escolha persiste no navegador através do `localStorage`.
* **Filtro de Visualização:** Abas para alternar entre a visualização de "Todas" as moedas e apenas as "Favoritas".
* **Experiência de Usuário Aprimorada:**
    * **Layout Responsivo:** Interface adaptável para desktops, tablets e celulares usando Tailwind CSS Grid.
    * **Esqueletos de Carregamento:** Indicadores de carregamento que imitam o layout final, melhorando a percepção de performance.
    * **Animações Sutis:** Efeitos de hover e animações de entrada na lista com `Framer Motion`.
    * **Tratamento de Erros:** Mensagens amigáveis são exibidas caso a API falhe.
* **Testes Automatizados:** Cobertura de testes para componentes críticos para garantir a qualidade e estabilidade do código.

---

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído com as seguintes tecnologias e bibliotecas:

* **Framework:** [Next.js](https://nextjs.org/) (com App Router)
* **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
* **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
* **Animação:** [Framer Motion](https://www.framer.com/motion/)
* **Gráficos:** [Recharts](https://recharts.org/)
* **Ícones:** [React Icons](https://react-icons.github.io/react-icons/)
* **Testes:** [Jest](https://jestjs.io/) + [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
* **Fonte de Dados:** [CoinGecko API](https://www.coingecko.com/en/api)

---

## ⚙️ Como Executar o Projeto Localmente

Para rodar este projeto na sua máquina, siga os passos abaixo:

```bash
# 1. Clone o repositório
git clone [https://github.com/seu-usuario/crypto-dashboard.git](https://github.com/seu-usuario/crypto-dashboard.git)

# 2. Navegue até a pasta do projeto
cd crypto-dashboard

# 3. Instale as dependências
npm install

# 4. Rode o servidor de desenvolvimento
npm run dev

# 5. Abra http://localhost:3000 no seu navegador para ver o resultado.

# Para rodar os testes:
npm test
```

## 📄 Licença
Este projeto está sob a licença MIT.

## 📬 Contato
Gabriel Antero - [LinkedIn]([https://www.linkedin.com/in/gabriel-antero/])