# World War 2026: Eternum

Jogo de estratégia em tempo real (progressão lenta) com:

- escolha de país inicial
- produção contínua de recursos
- fila de ações com duração real (5m, 30m, 10h e mais)
- treino de tropas, upgrades e pesquisa
- conquista global sem fim
- fase alien após 100% de dominação
- revoltas de resistência para campanha infinita
- save local automático + export/import de save
- globo interativo em canvas
- continentes com contorno de mapa sobre o globo
- rotas animadas no globo para invasão, espionagem, diplomacia e contra-ataque
- retaliações inimigas também aparecem como rotas no globo (com contagem de impacto)
- pulsos de impacto no globo quando um ataque/ação é concluído
- frente geopolítica entre países não-player com conflitos automáticos no globo
- visual alternável: padrão e Ultra Clean
- modo fácil (texto maior e menos movimento)
- assistente de comando com próximo passo sugerido
- clique em qualquer área do card para executar ação
- barra de progresso imediata no próprio card da ação iniciada
- balanceamento por fases (Início, Expansão, Supremacia, Infinito)
- custos e tempos militares dinâmicos por fase da campanha
- chance diplomática exibida em tempo real no card da ação
- simplificação da aba de guerra no Modo Fácil (mostra ação principal recomendada)
- seletor de país de origem para ataques (quando você controla múltiplos territórios)
- ataques avançados (nuclear e biológico) agrupados em seção recolhível para reduzir poluição visual
- sistema de retaliação + defesa ativa (`Defender Agora`) com impacto real em território e recursos
- cancelamento com reembolso parcial proporcional ao tempo restante
- limite lógico de operações simultâneas (escala com Centro de Comando)
- diplomacia bloqueada contra territórios alienígenas (coerência de regras)
- layout responsivo para desktop e mobile

## Rodar local

Basta abrir `index.html` no navegador.

## Como jogar (passo a passo)

1. Escolha um país inicial no modal de abertura.
2. Vá na aba `Ações` e inicie coletas curtas (5 min) para ganhar ritmo.
3. Melhore infraestrutura para aumentar produção passiva.
4. Treine tropas na aba `Exército`.
5. Selecione um alvo no globo e, se tiver mais de um território, escolha a `Origem do ataque`.
6. Use invasão, espionagem e diplomacia; desbloqueie ataques nuclear/biológico na seção avançada.
7. Se aparecer retaliação, selecione seu país ameaçado e clique em `Defender Agora`.
8. Acompanhe a `Fila & Eventos` e o bloco `Operações em Andamento`.
9. Ao iniciar uma ação, acompanhe a barra de progresso no próprio card e na fila rápida.
10. Se o botão estiver bloqueado, clique no card para ver o motivo em aviso rápido.
11. Ao dominar 100%, prepare-se para ondas alienígenas e resistência.
12. Use `Visual: Ultra Clean` se quiser menos poluição visual.
13. Use `Modo Fácil` para leitura maior e navegação mais confortável.
14. Veja a `Fase Atual` na aba `Mundo` para entender o nível de pressão global.
15. Observe as `Rotas ativas` no globo para acompanhar ataques, retaliações e operações em tempo real.
16. Acompanhe o `Próximo Conflito Externo` e `Próxima Retaliação` na aba `Mundo`.

## Deploy no Netlify

1. Suba esses arquivos em um repositório Git.
2. No Netlify, conecte o repositório.
3. Build command: vazio.
4. Publish directory: `.`

O `netlify.toml` já define isso.
