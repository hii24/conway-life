/**
 * Bit-packed Game of Life grid.
 * 1 bit per cell, 32 cells per Uint32 word.
 */
export class BitGrid {
  readonly width: number;
  readonly height: number;
  private buffer: Uint32Array;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.buffer = new Uint32Array(Math.ceil((width * height) / 32));
  }

  get(x: number, y: number): boolean {
    const idx = y * this.width + x;
    return (this.buffer[idx >>> 5] & (1 << (idx & 31))) !== 0;
  }

  set(x: number, y: number, alive: boolean): void {
    const idx = y * this.width + x;
    const word = idx >>> 5;
    const mask = 1 << (idx & 31);
    if (alive) this.buffer[word] |= mask;
    else this.buffer[word] &= ~mask;
  }

  toggle(x: number, y: number): void {
    this.set(x, y, !this.get(x, y));
  }

  countNeighbors(x: number, y: number): number {
    let count = 0;
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (dx === 0 && dy === 0) continue;
        const nx = (x + dx + this.width) % this.width;
        const ny = (y + dy + this.height) % this.height;
        if (this.get(nx, ny)) count++;
      }
    }
    return count;
  }

  step(into: BitGrid): void {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const n = this.countNeighbors(x, y);
        const alive = this.get(x, y);
        const next = alive ? n === 2 || n === 3 : n === 3;
        into.set(x, y, next);
      }
    }
  }

  clear(): void {
    this.buffer.fill(0);
  }

  randomize(density = 0.3): void {
    for (let i = 0; i < this.width * this.height; i++) {
      if (Math.random() < density) {
        this.buffer[i >>> 5] |= 1 << (i & 31);
      }
    }
  }
}
