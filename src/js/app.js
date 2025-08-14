//
// Módulo principal que organiza todos os dados e inicializa a aplicação dos componentes.

import { initializeMap } from './map.js';
import { renderCharts, updateCharts } from './charts.js'; // CAMINHO CORRIGIDO

// URL estática do arquivo de teste.
const DATA_URL = './src/data/data.json';

/**
 * Carrega os dados do arquivo JSON.
 * @returns {Promise<Array>} - Uma promessa que resolve para um array de dados.
 */
async function fetchData() {
    try {
        const response = await fetch(DATA_URL);
        if (!response.ok) {
            // CORRIGIDO: interpolação de string
            throw new Error(`Erro ao carregar os dados: ${response.statusText}`);
        }
        return await response.json();

    } catch (erro) { // NOME DA VARIÁVEL 'erro'
        // CORRIGIDO: uso da variável 'erro'
        console.error('Falha no carregamento dos dados:', erro);
        return null;
    }
}

/**
 * Inicialização do Dashboard.
 * Carrega os dados e inicializa o mapa e os gráficos.
 */
async function initializeDashboard() {
    const data = await fetchData();
    if (!data) {
        // Exibir uma mensagem de erro na interface, caso os dados não carreguem.
        document.getElementById('mapa').textContent = 'Erro ao carregar dados.';
        return;
    }

    // Inicializa o mapa e passa a função de atualização de gráficos como callback.
    const updateChartsCallback = (selectedData) => {
        updateCharts(selectedData);
    };
    initializeMap(data, updateChartsCallback);

    // Renderiza os gráficos iniciais com os dados do primeiro local.
    if (data.length > 0) {
        renderCharts(data[0]);
    }
}

// Inicializa o dashboard quando o DOM estiver completamente carregado.
document.addEventListener('DOMContentLoaded', initializeDashboard);