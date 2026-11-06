# Minecraft Web Clone 🎮

**Projeto experimental e ambicioso** de uma réplica do Minecraft rodando no navegador.

> ⚠️ Aviso: Isso é um projeto em construção pesada. Não é um Minecraft completo (ainda). Estamos construindo peça por peça.

## O que já existe / está sendo montado

- Base 3D com **Three.js**
- Mundo voxel simples (geração de terreno básica)
- Controles de movimento (WASD + mouse)
- Sistema de **Telão** (Shift + B)
- Estrutura para WebSocket
- Configuração para integração com TikTok Live
- Placeholders para as APIs (TheSportsDB, Wikipedia, DuckDuckGo, TVMaze, etc)

## Funcionalidades planejadas

### Core do jogo
- [ ] Física de colisão decente
- [ ] Quebrar e colocar blocos
- [ ] Inventário
- [ ] Geração de terreno procedural melhor
- [ ] Chunks e meshing otimizado
- [ ] Iluminação e dia/noite

### Telão (Shift + B)
- [x] Ativar/desativar com atalho
- [ ] Colocar URL qualquer
- [ ] Mini navegador embutido
- [ ] Pesquisa integrada (Wikipedia, DuckDuckGo, TVMaze, TheSportsDB...)
- [ ] (Avançado) Captura de janela do computador (limitado por segurança do browser)

### Integração TikTok Live
- [ ] Campo para username da live
- [ ] Conexão via WebSocket (usando APIs não-oficiais tipo tik.tools / EulerStream)
- [ ] Notificações de follow, gift, share, like, join

### Multiplayer / WebSocket
- [ ] Servidor Node.js básico
- [ ] Sincronização de posição e blocos

## Como rodar

1. Clone o repositório
2. Abra o `index.html` direto no navegador (ou use um servidor local)

```bash
# Se quiser servidor local simples
npx serve .
```

## Stack

- HTML + CSS + JavaScript
- Three.js
- WebSocket
- (Futuro) Node.js para servidor

## Aviso importante sobre TikTok

O TikTok **não tem API oficial** para eventos de live em tempo real.  
Tudo que existe é não-oficial e pode parar de funcionar a qualquer momento.  
Você vai precisar de uma API key de serviços como:
- [tik.tools](https://tik.tools)
- EulerStream
- Outros wrappers semelhantes

## Status atual

**Em desenvolvimento ativo.**  
Estamos montando a fundação. O jogo ainda não é jogável de verdade como Minecraft.

---

Feito com 💀 e muita ambição por Ainoã + Grok.
