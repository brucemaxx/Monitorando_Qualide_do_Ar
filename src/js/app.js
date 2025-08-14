//
// Módulo principal que organiza todos os dados e inicializa a aplicação dos componentes.

import { initializeMap } from './map.js';
import {renderCharts, updateCharts} from '.charts.js';

// URL estática do arquivo de teste.
const DATA_URL = './src/data/data.json';

/**
 * Carrega os dados do arquivo JSON.
 * @retuns {Promise<Array>} - Uma promessa que resolve para um array de dados.
 */
async function fetchData() {
    try {
        const response = await fetch(DATA_URL);
        if (!response.ok) {
            throw new Error('Erro ao carregar os dados: $reponse.statusText}');
        } 
        return await response.json();

    } catch (erro) {
        console.error('Falha no carregamento dos dados:', error);
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
        // Exibir uma de erro na interface, caso os dados não carreguem.
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