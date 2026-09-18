let gameState = {
gems: 0,
clicks: 0,
totalClicksLifetime: 0,
baseClickPower: 1,
baseCps: 0,
rebirthCount: 0,
rebirthMultiplier: 1.0,
equippedSkin: 'classic',
skinMultiplier: 1.0,
totalUpgradesBought: 0
};
const BASE_REBIRTH_MIN_CLICKS = 25000;
function getRebirthMinClicks() {
return Math.floor(BASE_REBIRTH_MIN_CLICKS * Math.pow(2.5, gameState.rebirthCount || 0));
}
let upgrades = [
{ id: 'u1', name: 'Clique Mais Forte', desc: '+1 Poder Base por clique', cost: 15, type: 'click', value: 1, count: 0 },
{ id: 'u2', name: 'Auto-Cursor', desc: '+1 Click automático/s', cost: 50, type: 'cps', value: 1, count: 0 },
{ id: 'u3', name: 'Ponteiro Turbo', desc: '+8 Clicks automáticos/s', cost: 300, type: 'cps', value: 8, count: 0 },
{ id: 'u4', name: 'Mouse Ultrafast', desc: '+15 Poder Base por clique', cost: 1200, type: 'click', value: 15, count: 0 },
{ id: 'u5', name: 'Fazenda de Clicks', desc: '+50 Clicks automáticos/s', cost: 5000, type: 'cps', value: 50, count: 0 },
{ id: 'u6', name: 'Nuvem de Cursores', desc: '+180 Clicks automáticos/s', cost: 20000, type: 'cps', value: 180, count: 0 },
{ id: 'u7', name: 'Estação Espacial de Clicks', desc: '+600 Clicks automáticos/s', cost: 75000, type: 'cps', value: 600, count: 0 },
{ id: 'u8', name: 'Supercomputador Quântico', desc: '+250 Poder Base por clique', cost: 250000, type: 'click', value: 250, count: 0 },
{ id: 'u9', name: 'Matriz de Mentes Conectadas', desc: '+2.500 Clicks automáticos/s', cost: 1000000, type: 'cps', value: 2500, count: 0 }
];

const cursorSkins = [

{ id: 'classic', name: 'Ponteiro Clássico', desc: 'Padrão do sistema.', story: 'Criado nas primeiras versões dos sistemas operacionais dos anos 80.', cost: 0, color: '#38bdf8', mult: 1.0, path: 'M13.64 21.97L10.13 16.76L6.88 19.37V3.5L20.09 9.14L15.3 13.15L17.47 17.89L13.64 21.97Z', unlocked: true, dropChance: 0, rarity: 'comum' },
{ id: 'hand', name: 'Mão de Clique', desc: '+20% Poder de clique', story: 'Um ponteiro amigável desenhado para navegar pela antiga web 1.0.', cost: 500, color: '#fbbf24', mult: 1.2, path: 'M9 11.24V7.5C9 6.12 10.12 5 11.5 5S14 6.12 14 7.5v3.74c1.21-.81 2-2.18 2-3.74C16 5.01 13.99 3 11.5 3S7 5.01 7 7.5c0 1.56.79 2.93 2 3.74zM18.5 10h-1.81c-.45 0-.85.27-1.02.69L14.2 14.3c-.23.57-.79.95-1.4.95H11c-.83 0-1.5-.67-1.5-1.5V11c0-.55-.45-1-1-1s-1 .45-1 1v6.5c0 2.48 2.02 4.5 4.5 4.5h3.69c1.92 0 3.61-1.22 4.22-3.04l1.43-4.28C20.48 11.23 19.61 10 18.5 10z', unlocked: false, dropChance: 0, rarity: 'comum' },
{ id: 'neon_cross', name: 'Mira Neon', desc: '+50% Poder de clique', story: 'Projetada para jogadores que exigem precisão absoluta em alta velocidade.', cost: 2000, color: '#22c55e', mult: 1.5, path: 'M11 2h2v7h7v2h-7v7h-2v-7H4v-2h7V2z', unlocked: false, dropChance: 0, rarity: 'comum' },
{ id: 'cosmic_pointer', name: 'Ponteiro Cósmico', desc: '+60% Poder de clique', story: 'Carregado com a energia das estrelas e nebulosas.', cost: 2800, color: '#818cf8', mult: 1.6, path: 'M12 2l2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5z', unlocked: false, dropChance: 0, rarity: 'comum' },
{ id: 'cyber_cursor', name: 'Cursor Cibernético', desc: '+80% Poder de clique', story: 'Construído com circuitos de fibra óptica ultrarrápidos.', cost: 5000, color: '#06b6d4', mult: 1.8, path: 'M3 3h18v4H7v10H3V3zm6 6h12v4H9V9zm4 6h8v4h-8v-4z', unlocked: false, dropChance: 0, rarity: 'comum' },
{ id: 'retro', name: 'Ponteiro Retro', desc: '+35% Poder de clique', story: 'Extraído de um antigo fliperama esquecido na década de 90.', cost: 1500, color: '#f97316', mult: 1.35, path: 'M3 3h4v4H3zm4 4h4v4H7zm4 4h4v4h-4zm4 4h4v4h-4z', unlocked: false, dropChance: 0, rarity: 'comum' },
{ id: 'fire', name: 'Cursor de Fogo', desc: '+50% Poder de clique', story: 'Forjado no calor escaldante de um servidor sobrecarregado.', cost: 3500, color: '#f43f5e', mult: 1.5, path: 'M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z', unlocked: false, dropChance: 0, rarity: 'comum' },
{ id: 'purple_vortex', name: 'Vórtice Roxo', desc: '+70% Poder de clique', story: 'Diz a lenda que ele suga os cliques direto do hiperespaço.', cost: 8000, color: '#a855f7', mult: 1.7, path: 'M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3z', unlocked: false, dropChance: 0, rarity: 'comum' },
{ id: 'snow_cursor', name: 'Ponteiro de Neve', desc: '+90% Poder de clique', story: 'Congelado nas montanhas digitais do norte virtual.', cost: 15000, color: '#e0e7ff', mult: 1.9, path: 'M12 2v20M2 12h20M5 5l14 14M5 19L19 5', unlocked: false, dropChance: 0, rarity: 'comum' },

{ id: 'secret_crystal', name: 'Ponteiro de Cristal', desc: 'Multiplica por 10.0x seus cliques!', story: 'Um cristal puríssimo encontrado nos confins das minas de dados.', cost: 0, color: '#06b6d4', mult: 10.0, path: 'M12 2L4 9l8 13 8-13-8-7zm0 3l5 4.5-5 8-5-8 5-4.5z', unlocked: false, dropChance: 0.0005, rarity: 'rare' },
{ id: 'rare_amethyst', name: 'Ametista Celestial', desc: 'Multiplica por 12.5x seus cliques!', story: 'Sua energia mística ressoa com o cosmos aumentando a sorte.', cost: 0, color: '#c084fc', mult: 12.5, path: 'M12 2l4 8-4 12-4-12 4-8z', unlocked: false, dropChance: 0.0008, rarity: 'rare' },
{ id: 'rare_emerald_ray', name: 'Raio Esmeralda', desc: 'Multiplica por 14.0x seus cliques!', story: 'Um feixe verde cintilante que corta o espaço digital com perfeição.', cost: 0, color: '#34d399', mult: 14.0, path: 'M13 2L3 14h8l-2 8 11-12h-8l2-8z', unlocked: false, dropChance: 0.0007, rarity: 'rare' },
{ id: 'rare_emerald', name: 'Esmeralda Radiante', desc: 'Multiplica por 15.0x seus cliques!', story: 'Utilizada pelos antigos imperadores para extrair riqueza em cada clique.', cost: 0, color: '#10b981', mult: 15.0, path: 'M6 3h12l4 6-10 13L2 9l4-6z', unlocked: false, dropChance: 0.0006, rarity: 'rare' },
{ id: 'rare_mystic_flame', name: 'Chama Mística', desc: 'Multiplica por 16.5x seus cliques!', story: 'Fogo purificador queimando continuamente com luz azulada.', cost: 0, color: '#38bdf8', mult: 16.5, path: 'M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z', unlocked: false, dropChance: 0.0006, rarity: 'rare' },
{ id: 'rare_plasma', name: 'Ponteiro de Plasma', desc: 'Multiplica por 18.0x seus cliques!', story: 'Feito de gás ionizado puro que eletrifica a tela a cada toque.', cost: 0, color: '#38bdf8', mult: 18.0, path: 'M11 2L4 13h6l-2 9 11-12h-6l3-8z', unlocked: false, dropChance: 0.0008, rarity: 'rare' },
{ id: 'rare_obsidian', name: 'Cursor de Obsidiana', desc: 'Multiplica por 20.0x seus cliques!', story: 'Tão denso e escuro que absorve a própria luz ao redor.', cost: 0, color: '#475569', mult: 20.0, path: 'M12 2L2 22l10-4 10 4L12 2z', unlocked: false, dropChance: 0.0005, rarity: 'rare' },
{ id: 'rare_dark_eclipse', name: 'Eclipse Sombrio', desc: 'Multiplica por 21.0x seus cliques!', story: 'A sombra perfeita gerada no momento de alinhamento dos planetas.', cost: 0, color: '#6366f1', mult: 21.0, path: 'M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16z', unlocked: false, dropChance: 0.0004, rarity: 'rare' },
{ id: 'rare_blood', name: 'Ponteiro de Sangue', desc: 'Multiplica por 22.5x seus cliques!', story: 'Sua lâmina escarlate pulsa com vitalidade incansável.', cost: 0, color: '#dc2626', mult: 22.5, path: 'M12 2c0 0-5 4-5 8s3 6 5 12c2-6 5-8 5-12s-5-8-5-8z', unlocked: false, dropChance: 0.0004, rarity: 'rare' },
{ id: 'rare_blue_thunder', name: 'Trovão Azul', desc: 'Multiplica por 25.0x seus cliques!', story: 'Um raio tempestuoso capturado no exato instante do impacto.', cost: 0, color: '#2563eb', mult: 25.0, path: 'M13 2L3 14h9l-1 8 10-12h-8l1-8z', unlocked: false, dropChance: 0.0003, rarity: 'rare' },
{ id: 'rare_star_shards', name: 'Fragmentos de Estrela', desc: 'Multiplica por 28.0x seus cliques!', story: 'Fragmentos estelares reluzentes que brilham no escuro digital.', cost: 0, color: '#facc15', mult: 28.0, path: 'M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z', unlocked: false, dropChance: 0.00025, rarity: 'rare' },
{ id: 'rare_void_walker', name: 'Caminhante do Vazio', desc: 'Multiplica por 32.0x seus cliques!', story: 'Atravessa dimensões ocultas trazendo energia pura.', cost: 0, color: '#8b5cf6', mult: 32.0, path: 'M12 2L2 12h5v8h10v-8h5L12 2z', unlocked: false, dropChance: 0.00020, rarity: 'rare' },

{ id: 'leg_prisma', name: 'Prisma Divino', desc: 'Super Multiplicador de 50.0x!', story: 'Refrata a luz estelar produzindo um arco-íris infinito de pontos.', cost: 0, color: '#f43f5e', mult: 50.0, path: 'M12 2l9 16H3l9-16z', unlocked: false, dropChance: 0.0001, rarity: 'legendary' },
{ id: 'leg_void', name: 'Ponteiro do Vazio', desc: 'Super Multiplicador de 100.0x!', story: 'Um buraco negro em miniatura capaz de dobrar o espaço-tempo.', cost: 0, color: '#8b5cf6', mult: 100.0, path: 'M12 2a10 10 0 100 20 10 10 0 000-20z', unlocked: false, dropChance: 0.00008, rarity: 'legendary' },
{ id: 'leg_eternity', name: 'Ponteiro da Eternidade', desc: 'Super Multiplicador de 150.0x!', story: 'Existe simultaneamente no passado, presente e futuro do código.', cost: 0, color: '#6366f1', mult: 150.0, path: 'M6 2h12v6l-4 4 4 4v6H6v-6l4-4-4-4V2z', unlocked: false, dropChance: 0.00009, rarity: 'legendary' },
{ id: 'leg_chaos', name: 'Cursor do Caos', desc: 'Super Multiplicador de 200.0x!', story: 'Nascido da desordem e entropia máxima do universo digital.', cost: 0, color: '#d97706', mult: 200.0, path: 'M12 2L2 12l10 10 10-10L12 2zm0 6a4 4 0 110 8 4 4 0 010-8z', unlocked: false, dropChance: 0.00006, rarity: 'legendary' },
{ id: 'leg_galactic_crown', name: 'Coroa Galáctica', desc: 'Super Multiplicador de 250.0x!', story: 'Forjada com poeira de supernovas para governar todo o universo digital.', cost: 0, color: '#eab308', mult: 250.0, path: 'M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z', unlocked: false, dropChance: 0.00005, rarity: 'legendary' },
{ id: 'leg_star_core', name: 'Núcleo Estelar', desc: 'Super Multiplicador de 300.0x!', story: 'Possui o poder e o brilho acumulado de cem sóis ardentes.', cost: 0, color: '#facc15', mult: 300.0, path: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z', unlocked: false, dropChance: 0.00004, rarity: 'legendary' },
{ id: 'leg_phoenix', name: 'Fênix Dourada', desc: 'Super Multiplicador de 400.0x!', story: 'Renasce das cinzas a cada clique para trazer poder supremo.', cost: 0, color: '#fb923c', mult: 400.0, path: 'M12 2L9 9l-8 3 8 3 3 8 3-8 8-3-8-3z', unlocked: false, dropChance: 0.00002, rarity: 'legendary' },
{ id: 'leg_supernova', name: 'Ponteiro Supernova', desc: 'Super Multiplicador de 500.0x!', story: 'A explosão final de uma estrela condensada em um cursor.', cost: 0, color: '#ec4899', mult: 500.0, path: 'M12 1l3 7 7 3-7 3-3 7-3-7-7-3 7-3z', unlocked: false, dropChance: 0.00001, rarity: 'legendary' },
{ id: 'leg_antimatter', name: 'Reator de Antimatéria', desc: 'Super Multiplicador de 600.0x!', story: 'Gera energia infinita ao colidir matérias opostas em altíssima rotação.', cost: 0, color: '#a855f7', mult: 600.0, path: 'M12 2a10 10 0 100 20 10 10 0 000-20zm0 3a7 7 0 016.93 6H15.8a3.8 3.8 0 00-2.8-2.8V5.07zM5.07 12H8.2a3.8 3.8 0 002.8 2.8v3.13A7 7 0 015.07 12z', unlocked: false, dropChance: 0.000015, rarity: 'legendary' },
{ id: 'leg_dark_matter', name: 'Matéria Escura', desc: 'MÍTICO! Multiplicador Incrível de 1000.0x!', story: 'A substância misteriosa que sustenta todas as galáxias.', cost: 0, color: '#1e1b4b', mult: 1000.0, path: 'M12 2a10 10 0 100 20 10 10 0 000-20zm0 3a7 7 0 110 14 7 7 0 010-14z', unlocked: false, dropChance: 0.000005, rarity: 'legendary' },
{ id: 'leg_chronos', name: 'Ampulheta de Chronos', desc: 'Super Multiplicador de 750.0x!', story: 'Dobra o tempo a cada clique gerando um número imenso de pontos.', cost: 0, color: '#eab308', mult: 750.0, path: 'M6 2h12v4l-4 4 4 4v4H6v-4l4-4-4-4V2z', unlocked: false, dropChance: 0.000008, rarity: 'legendary' },
{ id: 'leg_singularity', name: 'Singularidade Primal', desc: 'Super Multiplicador de 1200.0x!', story: 'O ponto de origem do universo compactado no seu ponteiro.', cost: 0, color: '#c084fc', mult: 1200.0, path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z', unlocked: false, dropChance: 0.000004, rarity: 'legendary' },
{ id: 'leg_genesis', name: 'Gênesis Divina', desc: 'Super Multiplicador de 1500.0x!', story: 'A faísca primordial que deu início ao código cósmico.', cost: 0, color: '#fef08a', mult: 1500.0, path: 'M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9Z', unlocked: false, dropChance: 0.0000035, rarity: 'legendary' },
{ id: 'leg_stellar_eclipse', name: 'Eclipse Estelar', desc: 'Super Multiplicador de 2000.0x!', story: 'A fusão entre a luz de mil estrelas e a escuridão do espaço.', cost: 0, color: '#38bdf8', mult: 2000.0, path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18a8 8 0 110-16 8 8 0 010 16z', unlocked: false, dropChance: 0.0000025, rarity: 'legendary' },
{ id: 'leg_cosmic_sword', name: 'Espada Cósmica', desc: 'Super Multiplicador de 2500.0x!', story: 'Uma lâmina tecida em energia capaz de fatiar o espaço-tempo.', cost: 0, color: '#f43f5e', mult: 2500.0, path: 'M14.5 2.5L21.5 9.5L9.5 21.5L2.5 14.5Z', unlocked: false, dropChance: 0.0000020, rarity: 'legendary' },

{ id: 'galactic_overlord', name: 'Soberano Galáctico', desc: 'PODER GALÁTICO! Multiplicador de 2500.0x!', story: 'O artefato supremo definitivo das galáxias. Apenas um escolhido consegue o obter.', cost: 0, color: '#f43f5e', mult: 2500.0, path: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z', unlocked: false, dropChance: 0.000001, rarity: 'galactic' },
{ id: 'galactic_nebula', name: 'Nebulosa Prismática', desc: 'PODER GALÁTICO! Multiplicador de 3000.0x!', story: 'Condensa o brilho de um berçário estelar inteiro no topo da sua tela.', cost: 0, color: '#38bdf8', mult: 3000.0, path: 'M12 2l2.5 6.5L21 11l-6.5 2.5L12 20l-2.5-6.5L3 11l6.5-2.5z', unlocked: false, dropChance: 0.0000008, rarity: 'galactic' },
{ id: 'galactic_pulsar', name: 'Pulsar Infinito', desc: 'PODER GALÁTICO! Multiplicador de 3500.0x!', story: 'Emite pulsações rítmicas de energia pura que aceleram seus cliques.', cost: 0, color: '#22c55e', mult: 3500.0, path: 'M12 2a10 10 0 00-10 10a10 10 0 0010 10a10 10 0 0010-10A10 10 0 0012 2zm0 4a6 6 0 110 12 6 6 0 010-12z', unlocked: false, dropChance: 0.0000006, rarity: 'galactic' },
{ id: 'galactic_horizon', name: 'Horizonte de Eventos', desc: 'PODER GALÁTICO! Multiplicador de 4000.0x!', story: 'A fronteira final da física estelar convertida em força de cliques.', cost: 0, color: '#a855f7', mult: 4000.0, path: 'M12 2L4 7v10l8 5 8-5V7l-8-5zm0 3.3L18 8v8l-6 3.7L6 16V8l6-2.7z', unlocked: false, dropChance: 0.0000004, rarity: 'galactic' },
{ id: 'galactic_emperor', name: 'Imperador do Cosmos', desc: 'PODER GALÁTICO! Multiplicador de 5000.0x!', story: 'O cetro definitivo de comando que rege todo o universo jogável.', cost: 0, color: '#fbbf24', mult: 5000.0, path: 'M12 2l3 6 6 1-4.5 4.5 1.5 6-6-3.5-6 3.5 1.5-6L2.5 9l6-1z', unlocked: false, dropChance: 0.0000002, rarity: 'galactic' },
{ id: 'galactic_lord', name: 'Lorde Galáctico', desc: 'PODER GALÁTICO! Multiplicador de 6000.0x!', story: 'Dominador de constelações antigas cuja sola marca galáxias.', cost: 0, color: '#e879f9', mult: 6000.0, path: 'M12 2L15 8L22 9L17 14L18.5 21L12 17.5L5.5 21L7 14L2 9L9 8L12 2Z', unlocked: false, dropChance: 0.00000018, rarity: 'galactic' },
{ id: 'galactic_supreme_nova', name: 'Supernova Suprema', desc: 'PODER GALÁTICO! Multiplicador de 7500.0x!', story: 'Uma explosão estelar perpétua aprisionada na ponta do seu ponteiro.', cost: 0, color: '#f43f5e', mult: 7500.0, path: 'M12 0L14.5 8.5L23 6L17.5 12.5L23 19L14.5 16.5L12 25L9.5 16.5L1 19L6.5 12.5L1 6L9.5 8.5L12 0Z', unlocked: false, dropChance: 0.00000015, rarity: 'galactic' },
{ id: 'galactic_singularity', name: 'Singularidade Cósmica', desc: 'PODER GALÁTICO! Multiplicador de 9000.0x!', story: 'A gravidade é tão intensa que converte o próprio tempo em pontos por segundo.', cost: 0, color: '#818cf8', mult: 9000.0, path: 'M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17Z', unlocked: false, dropChance: 0.00000012, rarity: 'galactic' },
{ id: 'galactic_quasar', name: 'Ponteiro Quasár', desc: 'PODER GALÁTICO! Multiplicador de 11000.0x!', story: 'O núcleo ativo mais brilhante do universo visível ao alcance dos seus cliques.', cost: 0, color: '#38bdf8', mult: 11000.0, path: 'M12 1L15 9L23 12L15 15L12 23L9 15L1 12L9 9L12 1Z', unlocked: false, dropChance: 0.0000001, rarity: 'galactic' },
{ id: 'galactic_hyper_rift', name: 'Fenda do Hiperespaço', desc: 'PODER GALÁTICO! Multiplicador de 15000.0x!', story: 'Rasga a própria fábrica do espaço-tempo para rasgar o contador de pontos.', cost: 0, color: '#c084fc', mult: 15000.0, path: 'M2 12L12 2L22 12L12 22L2 12ZM12 6L7 12L12 18L17 12L12 6Z', unlocked: false, dropChance: 0.00000008, rarity: 'galactic' },
{ id: 'galactic_annihilator', name: 'Aniquilador de Galáxias', desc: 'PODER GALÁTICO! Multiplicador de 20000.0x!', story: 'Poder capaz de obliterar sistemas solares inteiros com um único toque.', cost: 0, color: '#ef4444', mult: 20000.0, path: 'M12 2L15 8L22 9L17 14L18.5 21L12 17.5L5.5 21L7 14L2 9L9 8L12 2Z', unlocked: false, dropChance: 0.00000006, rarity: 'galactic' },
{ id: 'galactic_big_bang', name: 'Big Bang Primal', desc: 'PODER GALÁTICO! Multiplicador de 30000.0x!', story: 'Contém toda a força da grande explosão da criação.', cost: 0, color: '#fbbf24', mult: 30000.0, path: 'M12 2L14.5 8.5L23 6L17.5 12.5L23 19L14.5 16.5L12 25L9.5 16.5L1 19L6.5 12.5L1 6L9.5 8.5L12 2Z', unlocked: false, dropChance: 0.00000004, rarity: 'galactic' },
{ id: 'galactic_god', name: 'Deus do Multiverso', desc: 'SUPREMO DEFINITIVO! Multiplicador de 50000.0x!', story: 'Entidade além do próprio tempo e espaço. O topo absoluto.', cost: 0, color: '#ffffff', mult: 50000.0, path: 'M12 1L15 9L23 12L15 15L12 23L9 15L1 12L9 9L12 1Z', unlocked: false, dropChance: 0.00000001, rarity: 'galactic' }
];
/* BASE DE DADOS COMPLETA DE CONQUISTAS */
const achievements = [
{ id: 'a1', name: 'Primeiro Clique', desc: 'Acumule 1 Clique no total', reqType: 'clicks', reqValue: 1, unlocked: false },
{ id: 'a2', name: 'Iniciante do Cursor', desc: 'Acumule 500 Clicks no total', reqType: 'clicks', reqValue: 500, unlocked: false },
{ id: 'a3', name: 'Magnata dos Clicks', desc: 'Acumule 50.000 Clicks no total', reqType: 'clicks', reqValue: 50000, unlocked: false },
{ id: 'a4', name: 'Imperador Estelar', desc: 'Acumule 1.000.000 Clicks no total', reqType: 'clicks', reqValue: 1000000, unlocked: false },
{ id: 'a5_high1', name: 'Lenda Intergaláctica', desc: 'Acumule 10.000.000 Clicks no total', reqType: 'clicks', reqValue: 10000000, unlocked: false },
{ id: 'a6_high2', name: 'Mestre do Espaço-Tempo', desc: 'Acumule 100.000.000 Clicks no total', reqType: 'clicks', reqValue: 100000000, unlocked: false },
{ id: 'a7_high3', name: 'Deus dos Clicks', desc: 'Acumule 1.000.000.000 Clicks no total', reqType: 'clicks', reqValue: 1000000000, unlocked: false },
{ id: 'a8_extreme1', name: 'Omnipresença do Clique', desc: 'Acumule 100.000.000.000 Clicks no total', reqType: 'clicks', reqValue: 100000000000, unlocked: false },
{ id: 'a9_extreme2', name: 'Entropia Absoluta', desc: 'Acumule 1.000.000.000.000 Clicks no total', reqType: 'clicks', reqValue: 1000000000000, unlocked: false },
{ id: 'a_up1', name: 'Cliente Fiel', desc: 'Compre 10 Upgrades no total', reqType: 'upgrades', reqValue: 10, unlocked: false },
{ id: 'a_up2', name: 'Mestre dos Upgrades', desc: 'Compre 50 Upgrades no total', reqType: 'upgrades', reqValue: 50, unlocked: false },
{ id: 'a_up3', name: 'Engenheiro de Sistemas', desc: 'Compre 100 Upgrades no total', reqType: 'upgrades', reqValue: 100, unlocked: false },
{ id: 'a_up4', name: 'Magnata da Tecnologia', desc: 'Compre 250 Upgrades no total', reqType: 'upgrades', reqValue: 250, unlocked: false },
{ id: 'a_up5', name: 'Engenheiro Multiversal', desc: 'Compre 500 Upgrades no total', reqType: 'upgrades', reqValue: 500, unlocked: false },
{ id: 'a_up6', name: 'Arquiteto do Cosmos', desc: 'Compre 1.000 Upgrades no total', reqType: 'upgrades', reqValue: 1000, unlocked: false },
{ id: 'a_rebirth', name: 'Novo Começo', desc: 'Realize seu primeiro Renascimento', reqType: 'rebirths', reqValue: 1, unlocked: false },
{ id: 'a_rare_10', name: 'Colecionador de Relíquias', desc: 'Acumule 10 Skins Raras de Ponteiro', reqType: 'rare_count', reqValue: 10, unlocked: false },
{ id: 'a_leg_10', name: 'Mestre Lendário', desc: 'Acumule 10 Skins Lendárias de Ponteiro', reqType: 'leg_count', reqValue: 10, unlocked: false },
{ id: 'a_leg_15', name: 'Mestre das Lendárias', desc: 'Acumule 15 Skins Lendárias de Ponteiro', reqType: 'leg_count', reqValue: 15, unlocked: false },
{ id: 'a_skins_20', name: 'Soberano dos Ponteiros', desc: 'Desbloqueie 20 Skins no total', reqType: 'total_skins', reqValue: 20, unlocked: false },
{ id: 'a_gal_1', name: 'Descobridor Galáctico', desc: 'Desbloqueie sua 1ª Skin Galáctica', reqType: 'galactic_count', reqValue: 1, unlocked: false },
{ id: 'a_gal_3', name: 'Mestre do Cosmos', desc: 'Desbloqueie 3 Skins Galácticas', reqType: 'galactic_count', reqValue: 3, unlocked: false },
{ id: 'a_gal_5', name: 'Colecionador do Cosmos', desc: 'Desbloqueie 5 Skins Galácticas', reqType: 'galactic_count', reqValue: 5, unlocked: false },
{ id: 'a_gal_7', name: 'Dominador de Galáxias', desc: 'Desbloqueie 7 Skins Galácticas', reqType: 'galactic_count', reqValue: 7, unlocked: false },
{ id: 'a_gal_10', name: 'Senhor do Galáxico', desc: 'Desbloqueie 10 Skins Galácticas', reqType: 'galactic_count', reqValue: 10, unlocked: false }
];

function saveGame(showNotify = false) {
const dataToSave = {
gameState: gameState,
upgrades: upgrades.map(u => ({ id: u.id, count: u.count, cost: u.cost })),
skinsUnlocked: cursorSkins.filter(s => s.unlocked).map(s => s.id),
achievementsUnlocked: achievements.filter(a => a.unlocked).map(a => a.id)
};
localStorage.setItem('space_cursor_save_v3', JSON.stringify(dataToSave));
if (showNotify) {
triggerNotification('Jogo Salvo!', 'Seu progresso foi salvo com sucesso.', '💾');
}
}
function loadGame() {
const savedData = localStorage.getItem('space_cursor_save_v3');
if (!savedData) return;
try {
const parsed = JSON.parse(savedData);
if (parsed.gameState) gameState = { ...gameState, ...parsed.gameState };
if (parsed.upgrades) {
parsed.upgrades.forEach(savedUp => {
const originalUp = upgrades.find(u => u.id === savedUp.id);
if (originalUp) {
originalUp.count = savedUp.count;
originalUp.cost = savedUp.cost;
}
});
}
if (parsed.skinsUnlocked) {
parsed.skinsUnlocked.forEach(skinId => {
const skin = cursorSkins.find(s => s.id === skinId);
if (skin) skin.unlocked = true;
});
}
if (parsed.achievementsUnlocked) {
parsed.achievementsUnlocked.forEach(achId => {
const ach = achievements.find(a => a.id === achId);
if (ach) ach.unlocked = true;
});
}
if (gameState.equippedSkin) {
const skin = cursorSkins.find(s => s.id === gameState.equippedSkin);
if (skin) {
gameState.skinMultiplier = skin.mult;
document.getElementById('cursor-path').setAttribute('d', skin.path);
document.getElementById('main-cursor-svg').style.fill = skin.color;
document.getElementById('main-cursor-svg').style.filter = `drop-shadow(0 0 25px ${skin.color})`;
}
}
} catch (e) {
console.error("Erro ao carregar o arquivo salvo:", e);
}
}
function hardResetGame() {
if (confirm("TEM CERTEZA QUE DESEJA RESETAR TUDO?\n\nIsso apagará permanentemente seu progresso, conquistas, skins, gemas e multiplicadores salvos!")) {
localStorage.removeItem('space_cursor_save_v3');
location.reload();
}
}
window.addEventListener('keydown', (e) => {
if (e.ctrlKey && e.shiftKey && (e.key === 'R' || e.key === 'r')) {
e.preventDefault();
hardResetGame();
}
});
function getClickPower() { return Math.floor(gameState.baseClickPower * gameState.rebirthMultiplier * gameState.skinMultiplier); }
function getCPS() { return Math.floor(gameState.baseCps * gameState.rebirthMultiplier * gameState.skinMultiplier); }
function toggleLayout() {
document.body.classList.toggle('mobile-mode');
document.getElementById('toggle-view-btn').innerText = document.body.classList.contains('mobile-mode') ? 'Modo Desktop' : 'Modo Celular';
}
function switchTab(tabId, btnElement) {
document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
document.getElementById(tabId).classList.add('active');
btnElement.classList.add('active');
}
function openModal(id) { document.getElementById(id).classList.add('active'); }
function closeModal(id) { document.getElementById(id).classList.remove('active'); }
function showSkinInfo(skinId) {
const skin = cursorSkins.find(s => s.id === skinId);
if (!skin) return;
document.getElementById('info-skin-name').innerText = skin.name;
document.getElementById('info-skin-story').innerText = `"${skin.story}"`;
document.getElementById('info-skin-mult').innerText = `${skin.mult}x`;
const rarityEl = document.getElementById('info-skin-rarity');
if (skin.rarity === 'galactic') {
rarityEl.innerHTML = '<span class="rarity-badge rarity-galactic">Raridade Galáctica</span>';
} else if (skin.rarity === 'legendary') {
rarityEl.innerHTML = '<span class="rarity-badge rarity-legendary">Raridade Lendária</span>';
} else if (skin.rarity === 'rare') {
rarityEl.innerHTML = '<span class="rarity-badge rarity-rare">Raridade Rara</span>';
} else {
rarityEl.innerHTML = '<span style="color: #94a3b8;">Raridade Comum</span>';
}
const dropEl = document.getElementById('info-skin-drop');
if (skin.dropChance > 0) {
dropEl.innerText = `${(skin.dropChance * 100).toFixed(6)}% de chance a cada clique!`;
} else {
dropEl.innerText = "Comprável na Loja de Ponteiros";
}
openModal('skin-info-modal');
}

const clickBtn = document.getElementById('click-btn');
clickBtn.addEventListener('click', (e) => {
const power = getClickPower();
gameState.clicks += power;
gameState.totalClicksLifetime += power;
const availableDrops = cursorSkins.filter(s => s.dropChance > 0 && !s.unlocked);
availableDrops.sort((a, b) => a.dropChance - b.dropChance);
for (let skin of availableDrops) {
if (Math.random() < skin.dropChance) {
skin.unlocked = true;
const title = skin.rarity === 'galactic' ? '🌌 DROP GALÁTICO!' : (skin.rarity === 'legendary' ? '🔥 DROP LENDÁRIO!' : '💎 DROP RARO!');
const icon = skin.rarity === 'galactic' ? '🌌' : (skin.rarity === 'legendary' ? '🔥' : '💎');
triggerNotification(title, `Obteve a skin ${skin.name}!`, icon);
break;
}
}
createFloatingNumber(e.clientX, e.clientY, `+${power}`);
checkAchievements();
updateUI();
});
function createFloatingNumber(x, y, text) {
const el = document.createElement('div');
el.className = 'click-number';
el.innerText = text;
const rect = clickBtn.getBoundingClientRect();
el.style.left = `${x - rect.left - 10}px`;
el.style.top = `${y - rect.top - 20}px`;
clickBtn.appendChild(el);
setTimeout(() => el.remove(), 750);
}
function renderShop() {
const shopList = document.getElementById('shop-list');
shopList.innerHTML = '';
upgrades.forEach((up, index) => {
const card = document.createElement('div');
const canAfford = gameState.clicks >= up.cost;
card.className = `item-card ${canAfford ? '' : 'disabled'}`;
card.onclick = () => buyUpgrade(index);
card.innerHTML = `
<div class="item-info">
<svg class="item-icon" viewBox="0 0 24 24"><path d="M13.64 21.97L10.13 16.76L6.88 19.37V3.5L20.09 9.14L15.3 13.15L17.47 17.89L13.64 21.97Z"/></svg>
<div class="item-details">
<h4>${up.name} (${up.count})</h4>
<p>${up.desc}</p>
</div>
</div>
<div class="item-cost">${Math.floor(up.cost).toLocaleString('pt-BR')} Clicks</div>
`;
shopList.appendChild(card);
});
}
function buyUpgrade(index) {
const up = upgrades[index];
if (gameState.clicks >= up.cost) {
gameState.clicks -= up.cost;
up.count++;
gameState.totalUpgradesBought++;
if (up.type === 'click') gameState.baseClickPower += up.value;
if (up.type === 'cps') gameState.baseCps += up.value;
up.cost = Math.floor(up.cost * 1.35);
checkAchievements();
updateUI();
}
}
function renderSkins() {
const skinsList = document.getElementById('skins-list');
skinsList.innerHTML = '';
cursorSkins.forEach(skin => {
const card = document.createElement('div');
const isEquipped = gameState.equippedSkin === skin.id;
const isDrop = skin.dropChance > 0;
const canAfford = gameState.clicks >= skin.cost || skin.unlocked;
let cardClass = 'item-card ';
if (isEquipped) cardClass += 'equipped ';
if (skin.rarity === 'rare') cardClass += 'rare-card ';
if (skin.rarity === 'legendary') cardClass += 'legendary-card ';
if (skin.rarity === 'galactic') cardClass += 'galactic-card ';
if (!canAfford && !isDrop) cardClass += 'disabled';
let badge = skin.rarity === 'galactic' ? '<span class="rarity-badge rarity-galactic">Galáctico</span>' :
(skin.rarity === 'legendary' ? '<span class="rarity-badge rarity-legendary">Lendário</span>' :
(skin.rarity === 'rare' ? '<span class="rarity-badge rarity-rare">Raro</span>' : ''));
card.className = cardClass;
card.innerHTML = `
<div class="item-info">
<svg class="item-icon" style="fill: ${skin.unlocked || !isDrop ? skin.color : '#64748b'}" viewBox="0 0 24 24">
<path d="${skin.path}"/>
</svg>
<div class="item-details">
<h4>${isDrop && !skin.unlocked ? '??? (Drop Secreto)' : skin.name} ${badge}</h4>
<p>${skin.desc}</p>
</div>
</div>
<div class="card-actions">
<button class="info-btn" onclick="event.stopPropagation(); showSkinInfo('${skin.id}')">i</button>
<div class="item-cost" onclick="selectSkin('${skin.id}')">
${skin.unlocked ? (isEquipped ? 'Equipado' : 'Usar') : (!isDrop ? skin.cost.toLocaleString('pt-BR') + ' Clicks' : 'Clique p/ Drop')}
</div>
</div>
`;
skinsList.appendChild(card);
});
}
function selectSkin(skinId) {
const skin = cursorSkins.find(s => s.id === skinId);
if (!skin || (skin.dropChance > 0 && !skin.unlocked)) return;
if (!skin.unlocked) {
if (gameState.clicks >= skin.cost) {
gameState.clicks -= skin.cost;
skin.unlocked = true;
} else return;
}
gameState.equippedSkin = skin.id;
gameState.skinMultiplier = skin.mult;
document.getElementById('cursor-path').setAttribute('d', skin.path);
document.getElementById('main-cursor-svg').style.fill = skin.color;
document.getElementById('main-cursor-svg').style.filter = `drop-shadow(0 0 25px ${skin.color})`;
checkAchievements();
updateUI();
}

let popupTimeout = null;
function triggerNotification(title, text, icon = '🏆') {
const popup = document.getElementById('achievement-popup');
document.getElementById('achievement-popup-icon').innerText = icon;
document.getElementById('achievement-popup-title').innerText = title;
document.getElementById('achievement-popup-name').innerText = text;
popup.classList.add('show');
if (popupTimeout) {
clearTimeout(popupTimeout);
}
popupTimeout = setTimeout(() => {
popup.classList.remove('show');
}, 3500);
}
function checkAchievements() {
const unlockedRares = cursorSkins.filter(s => s.rarity === 'rare' && s.unlocked).length;
const unlockedLegs = cursorSkins.filter(s => s.rarity === 'legendary' && s.unlocked).length;
const unlockedGalactics = cursorSkins.filter(s => s.rarity === 'galactic' && s.unlocked).length;
const totalUnlockedSkins = cursorSkins.filter(s => s.unlocked).length;
achievements.forEach(ach => {
if (!ach.unlocked) {
let unlock = false;
if (ach.reqType === 'clicks' && gameState.totalClicksLifetime >= ach.reqValue) unlock = true;
if (ach.reqType === 'upgrades' && gameState.totalUpgradesBought >= ach.reqValue) unlock = true;
if (ach.reqType === 'rebirths' && gameState.gems > 0) unlock = true;
if (ach.reqType === 'rare_count' && unlockedRares >= ach.reqValue) unlock = true;
if (ach.reqType === 'leg_count' && unlockedLegs >= ach.reqValue) unlock = true;
if (ach.reqType === 'galactic_count' && unlockedGalactics >= ach.reqValue) unlock = true;
if (ach.reqType === 'total_skins' && totalUnlockedSkins >= ach.reqValue) unlock = true;
if (unlock) {
ach.unlocked = true;
triggerNotification('Conquista Desbloqueada!', ach.name, '🏆');
}
}
});
}
function renderAchievements() {
const totalCount = achievements.length;
const unlockedCount = achievements.filter(a => a.unlocked).length;
const remainingCount = totalCount - unlockedCount;
document.getElementById('ach-total-count').innerText = totalCount;
document.getElementById('ach-unlocked-count').innerText = unlockedCount;
document.getElementById('ach-remaining-count').innerText = remainingCount;
const achList = document.getElementById('achievements-list');
achList.innerHTML = '';
achievements.forEach(ach => {
const card = document.createElement('div');
card.className = `item-card ${ach.unlocked ? 'unlocked-achievement' : 'disabled'}`;
card.innerHTML = `
<div class="item-info">
<svg class="item-icon" style="fill: ${ach.unlocked ? '#facc15' : '#94a3b8'}" viewBox="0 0 24 24">
<path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94A5.01 5.01 0 0011 15.9V18H8v2h8v-2h-3v-2.1c1.86-.41 3.28-1.92 3.61-3.81C19.08 11.63 21 9.55 21 7V5h-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"/>
</svg>
<div class="item-details">
<h4>${ach.name}</h4>
<p>${ach.desc}</p>
</div>
</div>
<div class="achievement-status ${ach.unlocked ? 'status-unlocked' : 'status-locked'}">
${ach.unlocked ? 'Desbloqueado' : 'Bloqueado'}
</div>
`;
achList.appendChild(card);
});
}
function calculatePendingGems() {
const minClicks = getRebirthMinClicks();
if (gameState.totalClicksLifetime < minClicks) return 0;
return Math.floor(Math.sqrt(gameState.totalClicksLifetime / minClicks));
}
function doRebirth() {
const minClicks = getRebirthMinClicks();
const earnedGems = calculatePendingGems();
if (earnedGems <= 0 || gameState.totalClicksLifetime < minClicks) return;
gameState.gems += earnedGems;
gameState.rebirthCount = (gameState.rebirthCount || 0) + 1;
gameState.rebirthMultiplier = 1.0 + (gameState.gems * 0.5);
gameState.clicks = 0;
gameState.baseClickPower = 1;
gameState.baseCps = 0;
upgrades.forEach(up => { up.count = 0; });
checkAchievements();
saveGame();
updateUI();
}
function enterNewUniverse() {
const totalUnlockedSkins = cursorSkins.filter(s => s.unlocked).length;
if (gameState.totalClicksLifetime >= 1000000000 && totalUnlockedSkins >= 15) {
if (confirm("VOCÊ ESTÁ PRESTES A VIAJAR PARA UM NOVO UNIVERSO!\n\nSeu progresso de Clicks e Upgrades será zerado, mas você ganhará +5.0 no seu multiplicador de Rebirth de Bônus Cósmico permanente!")) {
gameState.rebirthMultiplier += 5.0;
gameState.clicks = 0;
gameState.baseClickPower = 1;
gameState.baseCps = 0;
upgrades.forEach(up => { up.count = 0; });
triggerNotification("VIAGEM DIMENSIONAL!", "Você chegou a um Novo Universo Clicker com Sucesso!", "🚀");
saveGame();
updateUI();
}
}
}

setInterval(() => {
const currentCPS = getCPS();
if (currentCPS > 0) {
const add = currentCPS / 10;
gameState.clicks += add;
gameState.totalClicksLifetime += add;
checkAchievements();
updateUI();
}
}, 100);
setInterval(() => {
saveGame(false);
}, 10000);
function updateUI() {
document.getElementById('clicks-display').innerText = Math.floor(gameState.clicks).toLocaleString('pt-BR');
document.getElementById('cps-display').innerText = getCPS().toLocaleString('pt-BR');
document.getElementById('click-power-display').innerText = getClickPower().toLocaleString('pt-BR');
document.getElementById('rebirth-multiplier').innerText = gameState.rebirthMultiplier.toFixed(1);
const minClicks = getRebirthMinClicks();
const pendingGems = calculatePendingGems();
const canRebirth = pendingGems > 0 && gameState.totalClicksLifetime >= minClicks;
document.getElementById('required-x-clicks').innerText = `${minClicks.toLocaleString('pt-BR')} Clicks Acumulados`;
document.getElementById('current-x-mult').innerText = `${gameState.rebirthMultiplier.toFixed(1)}x`;
document.getElementById('next-x-mult').innerText = `${(1.0 + ((gameState.gems + pendingGems) * 0.5)).toFixed(1)}x`;
document.getElementById('pending-gems').innerText = `+${pendingGems} Gemas`;
document.getElementById('rebirth-btn').disabled = !canRebirth;
const totalUnlockedSkins = cursorSkins.filter(s => s.unlocked).length;
const reqClicksOk = gameState.totalClicksLifetime >= 1000000000;
const reqSkinsOk = totalUnlockedSkins >= 15;
const reqClicksEl = document.getElementById('req-clicks-status');
const reqSkinsEl = document.getElementById('req-skins-status');
if (reqClicksEl) {
reqClicksEl.innerText = reqClicksOk ? 'Concluído' : 'Incompleto';
reqClicksEl.style.color = reqClicksOk ? '#4ade80' : '#f43f5e';
}
if (reqSkinsEl) {
reqSkinsEl.innerText = reqSkinsOk ? 'Concluído' : 'Incompleto';
reqSkinsEl.style.color = reqSkinsOk ? '#4ade80' : '#f43f5e';
}
const universeBtn = document.getElementById('universe-btn');
if (universeBtn) {
universeBtn.disabled = !(reqClicksOk && reqSkinsOk);
}
renderShop();
renderSkins();
renderAchievements();
}
loadGame();
updateUI();
