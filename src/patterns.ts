/**
 * RLE (Run Length Encoded) parser for Game of Life patterns.
 * Compatible with Golly / LifeWiki RLE format.
 */
import { BitGrid } from "./grid.js";

export const PRESETS = {
  glider: `x = 3, y = 3
bo$2bo$3o!`,
  pulsar: `x = 13, y = 13
2b3o3b3o2b$12b$o4bobo4bo$o4bobo4bo$o4bobo4bo$2b3o3b3o2b$12b$2b3o3b3o2b$o4bobo4bo$o4bobo4bo$o4bobo4bo$12b$2b3o3b3o2b!`,
  gosperGun: `x = 36, y = 9
24bo$22bobo$12b2o6b2o12b2o$11bo3bo4b2o12b2o$2o8bo5bo3b2o$2o8bo3bob2o4bobo$10bo5bo7bo$11bo3bo$12b2o!`,
};

export function paste(grid: BitGrid, rle: string, dx = 0, dy = 0): void {
  const lines = rle.split("\n");
  const dims = lines[0].match(/x\s*=\s*(\d+),\s*y\s*=\s*(\d+)/);
  if (!dims) throw new Error("invalid RLE header");

  const data = lines.slice(1).join("");
  let x = 0;
  let y = 0;
  let runCount = 0;

  for (const char of data) {
    if (char === "!") break;
    if (char >= "0" && char <= "9") {
      runCount = runCount * 10 + Number(char);
      continue;
    }
    const count = runCount || 1;
    if (char === "b") {
      x += count;
    } else if (char === "o") {
      for (let i = 0; i < count; i++) grid.set(dx + x + i, dy + y, true);
      x += count;
    } else if (char === "$") {
      y += count;
      x = 0;
    }
    runCount = 0;
  }
}
