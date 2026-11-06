import * as THREE from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';

// ===================== CENA BÁSICA =====================
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);
scene.fog = new THREE.Fog(0x87ceeb, 40, 120);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 25, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

// Luz
const ambient = new THREE.AmbientLight(0xffffff, 0.55);
scene.add(ambient);
const sun = new THREE.DirectionalLight(0xffffff, 0.85);
sun.position.set(50, 80, 30);
scene.add(sun);

// ===================== MUNDO VOXEL SIMPLES =====================
const BLOCK_SIZE = 1;
const worldSize = 40;
const heightMap = [];

function generateTerrain() {
  const geometry = new THREE.BoxGeometry(BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
  const grassMat = new THREE.MeshLambertMaterial({ color: 0x4caf50 });
  const dirtMat = new THREE.MeshLambertMaterial({ color: 0x8d6e63 });
  const stoneMat = new THREE.MeshLambertMaterial({ color: 0x757575 });

  for (let x = -worldSize / 2; x < worldSize / 2; x++) {
    heightMap[x] = [];
    for (let z = -worldSize / 2; z < worldSize / 2; z++) {
      // altura simples com noise fake
      const h = Math.floor(
        8 +
        Math.sin(x * 0.15) * 3 +
        Math.cos(z * 0.12) * 2 +
        Math.sin((x + z) * 0.08) * 2
      );
      heightMap[x][z] = h;

      for (let y = 0; y <= h; y++) {
        let mat = stoneMat;
        if (y === h) mat = grassMat;
        else if (y > h - 3) mat = dirtMat;

        const block = new THREE.Mesh(geometry, mat);
        block.position.set(x * BLOCK_SIZE, y * BLOCK_SIZE, z * BLOCK_SIZE);
        scene.add(block);
      }
    }
  }
}

generateTerrain();

// ===================== CONTROLES =====================
const controls = new PointerLockControls(camera, document.body);

document.addEventListener('click', () => {
  if (!document.getElementById('telao').classList.contains('hidden')) return;
  controls.lock();
});

const keys = {};
document.addEventListener('keydown', (e) => {
  keys[e.code] = true;

  // Shift + B = Telão
  if (e.shiftKey && e.code === 'KeyB') {
    toggleTelao();
  }

  // Esc já é tratado pelo PointerLock
});

document.addEventListener('keyup', (e) => {
  keys[e.code] = false;
});

const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();
const speed = 12;

function updatePlayer(delta) {
  if (!controls.isLocked) return;

  velocity.x -= velocity.x * 8.0 * delta;
  velocity.z -= velocity.z * 8.0 * delta;

  direction.z = Number(keys['KeyW']) - Number(keys['KeyS']);
  direction.x = Number(keys['KeyD']) - Number(keys['KeyA']);
  direction.normalize();

  if (keys['KeyW'] || keys['KeyS']) velocity.z -= direction.z * speed * delta;
  if (keys['KeyA'] || keys['KeyD']) velocity.x -= direction.x * speed * delta;

  controls.moveRight(-velocity.x * delta);
  controls.moveForward(-velocity.z * delta);

  // altura fixa simples (sem física real ainda)
  camera.position.y = 18;
}

// ===================== TELÃO =====================
const telao = document.getElementById('telao');
const iframe = document.getElementById('telao-iframe');
const searchPanel = document.getElementById('search-panel');

function toggleTelao() {
  const isHidden = telao.classList.contains('hidden');
  if (isHidden) {
    telao.classList.remove('hidden');
    controls.unlock();
  } else {
    telao.classList.add('hidden');
    searchPanel.classList.add('hidden');
  }
}

document.getElementById('close-telao').addEventListener('click', toggleTelao);

document.getElementById('load-url').addEventListener('click', () => {
  const url = document.getElementById('url-input').value.trim();
  if (!url) return;
  let finalUrl = url;
  if (!url.startsWith('http')) finalUrl = 'https://' + url;
  iframe.src = finalUrl;
});

document.getElementById('open-search').addEventListener('click', () => {
  searchPanel.classList.toggle('hidden');
});

// Pesquisa placeholder (APIs reais precisam de proxy/CORS)
document.querySelectorAll('#search-panel button').forEach(btn => {
  btn.addEventListener('click', async () => {
    const query = document.getElementById('search-input').value.trim();
    if (!query) return;

    const api = btn.dataset.api;
    const resultsDiv = document.getElementById('search-results');
    resultsDiv.innerHTML = `<p>Buscando em ${api}...</p>`;

    // Placeholder — as APIs reais precisam de backend ou proxy por causa de CORS
    if (api === 'wikipedia') {
      resultsDiv.innerHTML = `
        <p><strong>Wikipedia</strong> (placeholder)</p>
        <p>Resultado para: <em>${query}</em></p>
        <p>Em breve integração real com a API da Wikipedia.</p>
      `;
    } else if (api === 'tvmaze') {
      resultsDiv.innerHTML = `
        <p><strong>TVMaze</strong></p>
        <p>Busca de séries para: <em>${query}</em></p>
        <p>API pública: https://api.tvmaze.com/search/shows?q=...</p>
      `;
    } else {
      resultsDiv.innerHTML = `<p>API <strong>${api}</strong> ainda em implementação.</p>`;
    }
  });
});

// ===================== TIKTOK (placeholder) =====================
let tiktokWs = null;

document.getElementById('connect-tiktok')?.addEventListener('click', () => {
  const username = document.getElementById('tiktok-username').value.trim();
  if (!username) {
    alert('Coloca o username da live, porra');
    return;
  }

  // Exemplo de como seria com uma API não-oficial
  // const wsUrl = `wss://api.tik.tools?uniqueId=${username}&apiKey=SUA_KEY`;
  document.getElementById('tiktok-status').textContent = `TikTok: tentando conectar @${username}...`;

  // Aqui entraria a conexão real
  console.log('Placeholder: conectar TikTok Live de', username);
  document.getElementById('tiktok-status').textContent = `TikTok: @${username} (simulado)`;
});

// ===================== LOOP =====================
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  const delta = clock.getDelta();
  updatePlayer(delta);
  renderer.render(scene, camera);
}

animate();

// Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

console.log('%cMinecraft Web Clone carregado', 'color: #4caf50; font-size: 14px');
console.log('Shift + B = Telão');
