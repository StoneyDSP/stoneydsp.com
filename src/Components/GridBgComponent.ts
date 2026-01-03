import { Lightning } from "@lightningjs/sdk";

class GridBgComponent extends Lightning.Component {
  static override _template() {
    return {
      // No collision: never eats input
      collision: false,
      rect: true,
      // Transparent base; the grid is the texture
      color: 0x00000000,
      texture: {
        type: Lightning.textures.StaticCanvasTexture,
        // If your Lightning build expects "w/h" here, it’s ok to omit; we set in _redraw().
      },
    };
  }

  // --- Tweakables (you can also put these in `data.grid` later)
  private _spacing = 48; // px between minor lines
  private _majorEvery = 4; // every 4th line is major
  private _minorAlpha = 0.08; // subtle
  private _majorAlpha = 0.14; // slightly stronger

  private _lastW = 0;
  private _lastH = 0;

  override _active() {
    this._redraw();
    return super._active();
  }

  override _detach() {
    // Optional: free texture backing store
    this.texture = null;
    return super._detach();
  }

  // If you have a known hook when your stage resizes, call `tag("Grid")._redraw()`.
  // Otherwise, this cheap poll-on-update is fine:
  o_update() {
    if (this.w !== this._lastW || this.h !== this._lastH) this._redraw();
  }

  private _redraw() {
    const w = Math.max(1, Math.floor(this.w));
    const h = Math.max(1, Math.floor(this.h));
    if (w === this._lastW && h === this._lastH) return;
    this._lastW = w;
    this._lastH = h;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tex = (this as unknown as { texture: any }).texture;
    if (!tex || tex.type !== Lightning.textures.StaticCanvasTexture) return;

    // Lightning CanvasTexture exposes a canvas/context via `getCanvas()` in many builds.
    // Some builds use `ctx` directly. This pattern covers the common case.
    const canvas: HTMLCanvasElement =
      typeof tex.getCanvas === "function" ? tex.getCanvas() : tex.canvas;

    canvas.width = w;
    canvas.height = h;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, w, h);

    // Draw grid lines
    const spacing = Math.max(8, this._spacing | 0);
    const majorEvery = Math.max(2, this._majorEvery | 0);

    // Use 1px crisp lines
    ctx.lineWidth = 1;

    // Minor lines
    ctx.strokeStyle = `rgba(255,255,255,${this._minorAlpha})`;
    ctx.beginPath();
    for (let x = 0; x <= w; x += spacing) {
      if ((x / spacing) % majorEvery === 0) continue;
      ctx.moveTo(x + 0.5, 0);
      ctx.lineTo(x + 0.5, h);
    }
    for (let y = 0; y <= h; y += spacing) {
      if ((y / spacing) % majorEvery === 0) continue;
      ctx.moveTo(0, y + 0.5);
      ctx.lineTo(w, y + 0.5);
    }
    ctx.stroke();

    // Major lines
    ctx.strokeStyle = `rgba(255,255,255,${this._majorAlpha})`;
    ctx.beginPath();
    for (let x = 0; x <= w; x += spacing) {
      if ((x / spacing) % majorEvery !== 0) continue;
      ctx.moveTo(x + 0.5, 0);
      ctx.lineTo(x + 0.5, h);
    }
    for (let y = 0; y <= h; y += spacing) {
      if ((y / spacing) % majorEvery !== 0) continue;
      ctx.moveTo(0, y + 0.5);
      ctx.lineTo(w, y + 0.5);
    }
    ctx.stroke();

    // Some Lightning builds require explicit refresh after drawing:
    if (typeof tex.update === "function") tex.update();
  }
}

export { GridBgComponent };
