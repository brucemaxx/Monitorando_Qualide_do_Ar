//
// Arquivo: charts.js
// Descrição: Módulo para criar e atualizar os gráficos usando a biblioteca Plotly.js.
//            Ele gerencia a visualização dos dados de qualidade do ar e condições meteorológicas.
//

/**
 * Cria a estrutura de layout para os gráficos do Plotly.
 * @param {string} title O título do gráfico.
 * @param {string} yaxisTitle O título do eixo Y.
 * @returns {object} Objeto de layout do Plotly.
 */
const createChartLayout = (title, yaxisTitle) => {
    return {
        title: {
            text: title,
            font: {
                family: 'Arial, sans-serif',
                size: 18,
                color: '#333'
            }
        },
        xaxis: {
            title: 'Hora do Dia',
            tickformat: '%H:%M',
            showgrid: true,
            zeroline: false
        },
        yaxis: {
            title: yaxisTitle,
            showgrid: true,
            zeroline: false
        },
        paper_bgcolor: 'rgba(255, 255, 255, 0.9)',
        plot_bgcolor: 'rgba(255, 255, 255, 0.9)',
        margin: { t: 50, b: 50, l: 50, r: 20 },
        responsive: true
    };
};

/**
 * Mapeia o nome dos poluentes para nomes mais amigáveis e cores.
 */
const getPollutantInfo = (pollutant) => {
    const info = {
        co: { name: 'Monóxido de Carbono (CO)', color: '#FF7F0E' },
        co2: { name: 'Dióxido de Carbono (CO₂)', color: '#1F77B4' },
        nox: { name: 'Óxidos de Nitrogênio (NOx)', color: '#2CA02C' }
    };
    return info[pollutant] || { name: pollutant, color: '#000000' };
};

/**
 * Renderiza os três gráficos iniciais no dashboard.
 * Esta função é chamada uma vez na inicialização.
 * @param {object} locationData Dados completos de um local (incluindo o array 'dados').
 */
export function renderCharts(locationData) {
    if (!locationData || !locationData.dados) {
        console.error("Dados de localização inválidos para renderizar gráficos.");
        return;
    }

    // Prepara os dados para os gráficos
    const timestamps = locationData.dados.map(d => new Date(d.data_hora));
    const coValues = locationData.dados.map(d => d.co);
    const co2Values = locationData.dados.map(d => d.co2);
    const noxValues = locationData.dados.map(d => d.nox);
    const tempValues = locationData.dados.map(d => d.temp);
    const umidadeValues = locationData.dados.map(d => d.umidade);

    // Gráfico 1: Poluentes do Ar (CO, CO₂)
    const coTrace = {
        x: timestamps,
        y: coValues,
        mode: 'lines+markers',
        name: getPollutantInfo('co').name,
        line: { color: getPollutantInfo('co').color }
    };
    const co2Trace = {
        x: timestamps,
        y: co2Values,
        mode: 'lines+markers',
        name: getPollutantInfo('co2').name,
        line: { color: getPollutantInfo('co2').color }
    };
    const poluentesLayout = createChartLayout(`Níveis de Poluentes - ${locationData.local}`, 'Concentração (ppm)');
    Plotly.newPlot('poluentes-graph', [coTrace, co2Trace], poluentesLayout);

    // Gráfico 2: Condições Meteorológicas (Temperatura e Umidade)
    const tempTrace = {
        x: timestamps,
        y: tempValues,
        name: 'Temperatura (°C)',
        mode: 'lines+markers',
        yaxis: 'y',
        line: { color: '#D62728' }
    };
    const umidadeTrace = {
        x: timestamps,
        y: umidadeValues,
        name: 'Umidade (%)',
        mode: 'lines+markers',
        yaxis: 'y2',
        line: { color: '#008080' }
    };
    const meteoLayout = {
        ...createChartLayout(`Condições Meteorológicas - ${locationData.local}`, 'Valor'),
        yaxis2: {
            title: 'Umidade (%)',
            overlaying: 'y',
            side: 'right'
        }
    };
    Plotly.newPlot('meteo-graph', [tempTrace, umidadeTrace], meteoLayout);

    // Gráfico 3: Nível de Qualidade do Ar (baseado no mock data)
    const qualidadeTrace = {
        x: timestamps,
        y: locationData.dados.map(d => {
            // Mapeia a qualidade para um valor numérico para o gráfico
            const qualidades = { "Bom": 1, "Moderado": 2, "Crítico": 3 };
            return qualidades[d.qualidade];
        }),
        mode: 'markers',
        marker: {
            color: locationData.dados.map(d => {
                const cores = { "Bom": '#4CAF50', "Moderado": '#FFC107', "Crítico": '#F44336' };
                return cores[d.qualidade];
            }),
            size: 15
        },
        text: locationData.dados.map(d => `Qualidade: ${d.qualidade}`),
        hoverinfo: 'text+x'
    };
    const qualidadeLayout = {
        ...createChartLayout(`Índice de Qualidade do Ar - ${locationData.local}`, 'Qualidade'),
        yaxis: {
            title: 'Índice de Qualidade',
            tickmode: 'array',
            tickvals: [1, 2, 3],
            ticktext: ['Bom', 'Moderado', 'Crítico'],
            range: [0.5, 3.5]
        }
    };
    Plotly.newPlot('qualidade-ar-graph', [qualidadeTrace], qualidadeLayout);
}

/**
 * Atualiza os gráficos existentes com novos dados de um local selecionado.
 * Esta função é chamada quando o usuário clica em um marcador no mapa.
 * @param {object} locationData Dados completos do novo local selecionado.
 */
export function updateCharts(locationData) {
    if (!locationData || !locationData.dados) {
        console.error("Dados de localização inválidos para atualizar gráficos.");
        return;
    }

    const timestamps = locationData.dados.map(d => new Date(d.data_hora));
    const coValues = locationData.dados.map(d => d.co);
    const co2Values = locationData.dados.map(d => d.co2);
    const noxValues = locationData.dados.map(d => d.nox);
    const tempValues = locationData.dados.map(d => d.temp);
    const umidadeValues = locationData.dados.map(d => d.umidade);

    // Atualiza o Gráfico de Poluentes
    const updatePoluentes = {
        'x': [timestamps, timestamps],
        'y': [coValues, co2Values]
    };
    Plotly.restyle('poluentes-graph', updatePoluentes);
    Plotly.relayout('poluentes-graph', { title: `Níveis de Poluentes - ${locationData.local}` });

    // Atualiza o Gráfico de Condições Meteorológicas
    const updateMeteo = {
        'x': [timestamps, timestamps],
        'y': [tempValues, umidadeValues]
    };
    Plotly.restyle('meteo-graph', updateMeteo);
    Plotly.relayout('meteo-graph', { title: `Condições Meteorológicas - ${locationData.local}` });

    // Atualiza o Gráfico de Qualidade do Ar
    const updateQualidade = {
        'x': [timestamps],
        'y': [locationData.dados.map(d => {
            const qualidades = { "Bom": 1, "Moderado": 2, "Crítico": 3 };
            return qualidades[d.qualidade];
        })],
        'marker.color': [locationData.dados.map(d => {
            const cores = { "Bom": '#4CAF50', "Moderado": '#FFC107', "Crítico": '#F44336' };
            return cores[d.qualidade];
        })],
        'text': [locationData.dados.map(d => `Qualidade: ${d.qualidade}`)]
    };
    Plotly.restyle('qualidade-ar-graph', updateQualidade);
    Plotly.relayout('qualidade-ar-graph', { title: `Índice de Qualidade do Ar - ${locationData.local}` });
}