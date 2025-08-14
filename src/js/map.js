//
// Arquivo: map.js (com Leaflet)
// Descrição: Módulo para inicializar o mapa usando a biblioteca Leaflet.
//            Adiciona marcadores interativos com base nos dados do projeto.
//

/**
 * Mapeia o índice de qualidade do ar para uma cor HEX.
 * @param {string} qualidade O valor da qualidade do ar ('Bom', 'Moderado', 'Crítico').
 * @returns {string} A cor HEX correspondente.
 */
const getMarkerColor = (qualidade) => {
    switch (qualidade) {
        case 'Bom':
            return '#4CAF50'; // Verde
        case 'Moderado':
            return '#FFC107'; // Amarelo
        case 'Crítico':
            return '#F44336'; // Vermelho
        default:
            return '#337ab7'; // Azul padrão
    }
};

/**
 * Cria um ícone de marcador personalizado com a cor da qualidade do ar.
 * @param {string} cor A cor do marcador em formato HEX.
 * @returns {L.Icon} O objeto de ícone do Leaflet.
 */
const createCustomIcon = (cor) => {
    return L.divIcon({
        className: 'custom-div-icon',
        html: `<div style='background-color: ${cor}; width: 15px; height: 15px; border-radius: 50%; border: 2px solid #fff;'></div>`,
        iconSize: [15, 15]
    });
};

/**
 * Inicializa o mapa do Leaflet, adiciona os marcadores e a interatividade.
 * @param {Array<object>} data O conjunto de dados de todos os locais.
 * @param {function} onMarkerClickCallback A função a ser chamada quando um marcador for clicado.
 */
export function initializeMap(data, onMarkerClickCallback) {
    if (!data || data.length === 0) {
        console.error("Dados de mapa inválidos. Não foi possível inicializar o mapa.");
        return;
    }

    // Inicializa o mapa centralizado em São Paulo
    const map = L.map('mapa').setView([-23.55052, -46.633308], 10);

    // Adiciona uma camada de mapa base do OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // Adiciona um marcador para cada local nos dados
    data.forEach(location => {
        // Pega a última medição para determinar a cor do marcador
        const lastReading = location.dados[location.dados.length - 1];
        const markerColor = getMarkerColor(lastReading.qualidade);

        // Cria o ícone e o marcador
        const customIcon = createCustomIcon(markerColor);
        const marker = L.marker([location.lat, location.lon], { icon: customIcon }).addTo(map);

        // Adiciona um evento de clique ao marcador para interagir com os gráficos
        marker.on('click', () => {
            console.log(`Marcador de "${location.local}" clicado.`);
            // Chama a função de callback do módulo principal para atualizar os gráficos
            onMarkerClickCallback(location);
        });

        // Adiciona um popup simples com o nome do local
        marker.bindPopup(`<b>${location.local}</b><br>Qualidade do Ar: ${lastReading.qualidade}`);
    });
}