# Sistema de Monitoramento de Qualidade do Ar (Protótipo Estático)

## 🌎 Visão Geral

Este projeto é um protótipo estático de um Dashboard de Monitoramento de Qualidade do Ar. Ele simula a coleta e visualização de dados de poluentes e condições meteorológicas em tempo real, utilizando um conjunto de dados fixo (mock data).

O objetivo principal deste projeto piloto é demonstrar a arquitetura e as funcionalidades de um sistema completo, focando na interatividade do mapa e na visualização de dados com gráficos dinâmicos.

## ✨ Funcionalidades

* **Mapa Interativo:** Exibe a localização de estações de monitoramento com marcadores coloridos que indicam a qualidade do ar em tempo real (simulado).
* **Visualização de Dados:** Gráficos interativos que mostram a evolução dos níveis de poluentes (CO, CO₂, NOx) e condições meteorológicas (temperatura, umidade) para um local selecionado.
* **Interatividade:** Ao clicar em um marcador no mapa, os gráficos são atualizados dinamicamente para exibir os dados correspondentes àquele local.
* **Design Responsivo:** O layout se adapta para uma visualização clara tanto em telas de desktop quanto em dispositivos móveis.

## 🛠️ Tecnologias Utilizadas

O projeto foi construído utilizando as seguintes tecnologias e bibliotecas:

* **HTML5 & CSS3:** Estrutura e estilização do dashboard.
* **JavaScript (ES6 Modules):** Lógica principal, modularização e interatividade.
* **[Leaflet.js](https://leafletjs.com/):** Biblioteca de código aberto e leve para a visualização de mapas interativos. Perfeita para este protótipo, pois não requer chaves de API.
* **[Plotly.js](https://plotly.com/javascript/):** Biblioteca de gráficos robusta para a criação de visualizações de dados científicas e interativas.

## 🚀 Como Executar o Projeto

Para executar este projeto em sua máquina local, você não precisa de um servidor complexo. Basta seguir estes passos:

1.  **Clone o Repositório** (ou baixe os arquivos do projeto).
2.  **Abra a Pasta do Projeto:** Navegue até a pasta raiz do projeto.
3.  **Utilize um Servidor Local:** A forma mais recomendada é usar a extensão **"Live Server"** do VS Code.
    * No VS Code, clique com o botão direito no arquivo `index.html`.
    * Selecione **"Open with Live Server"**.
    * Isso abrirá o projeto no seu navegador em `http://127.0.0.1:5500/`.

**Importante:** Abrir o arquivo `index.html` diretamente no navegador (sem um servidor local) pode causar erros de CORS e de carregamento de módulos.



## 📂 Estrutura de Arquivos

O projeto segue uma arquitetura modular, com a seguinte organização de arquivos:

-   `index.html`: A página principal do dashboard.
-   `README.md`: Este arquivo.
-   `src/`: Contém todos os arquivos de desenvolvimento.
    -   `css/style.css`: Estilos de layout e design.
    -   `data/data.json`: Conjunto de dados estáticos do projeto.
    -   `js/`: Módulos JavaScript.
        -   `app.js`: O módulo principal que controla a aplicação.
        -   `charts.js`: Lógica para criar e atualizar os gráficos.
        -   `map.js`: Lógica para o mapa interativo.

## ✍️ Próximos Passos (Evolução do Projeto)

Este protótipo pode ser expandido para um projeto completo, com as seguintes funcionalidades:

* **Integração com Sensores Reais:** Conectar o frontend a um backend que colete dados de dispositivos IoT (Internet das Coisas).
* **Banco de Dados Dinâmico:** Armazenar os dados em um banco de dados real (como PostgreSQL ou MongoDB) e buscar as informações via uma API.
* **Sistema de Alertas:** Implementar notificações em tempo real (via e-mail, SMS, etc.) quando a qualidade do ar atingir níveis críticos.
* **Análise de Dados:** Adicionar funcionalidades de previsão ou análise histórica para identificar tendências de poluição.

---

*Este projeto foi criado como parte de um estudo sobre desenvolvimento de protótipos e modularização de código.*