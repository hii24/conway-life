<div align="center">

# 🦠 conway-life

**Conway's Game of Life — React + Canvas, 60fps with 100k cells**

_Sandbox project for animation-loop patterns, requestAnimationFrame timing, and bit-packed grids._

[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=000)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=fff)](https://www.typescriptlang.org)
[![Canvas](https://img.shields.io/badge/Canvas-FF6F61?style=for-the-badge)](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
[![License: MIT](https://img.shields.io/badge/License-MIT-00C853?style=for-the-badge)](LICENSE)

</div>

---

## ✨ Features

- ⚡ 60fps simulation with 100,000+ cells
- 🖼️ Canvas rendering (no DOM nodes per cell)
- 🧮 Bit-packed grid — 1 bit per cell, 8x memory reduction
- 🖱️ Click-to-toggle cells, drag-to-paint
- 🎮 Speed slider, step-by-step mode, glider/pulsar presets
- 💾 Save/load patterns as RLE (the same format used by golly)

## 🚀 Run locally

```bash
git clone https://github.com/hii24/conway-life.git
cd conway-life
npm install
npm run dev
```

## 🧠 Why I built it

I wanted to drill animation-loop patterns I'd later need for production work — `requestAnimationFrame`, frame budgeting, separating "tick" from "render". Conway's Life is a perfect target: trivial rules, but performance gets interesting fast at >10k cells.

The optimization journey was the actual point:
1. ✅ Naive `boolean[][]` — 60fps at 50×50, dies at 200×200
2. ✅ `Uint8Array` — 60fps at 200×200
3. ✅ Bit-packed `Uint32Array` — 60fps at 1000×100
4. ✅ Web Worker offload — 60fps at 1000×1000

## 📜 License

MIT
