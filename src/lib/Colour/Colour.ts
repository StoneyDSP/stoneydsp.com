import { fetchJson } from "../fetchJson";
import { Log } from "../Log/Log";
import palette from "./palette.json";

/**
 *
 */
class Colour {
  public static palette: typeof import("./palette.json");

  static {
    this.palette = palette;
  }

  private constructor() {
  }

  static readonly SHADES: readonly Colour.Shade[] = [50,100,200,300,400,500,600,700,800,900,950] as const;

  /**
   *
   * @param page
   * @param params
   * @returns
   */
  static async fetchJson<T extends json>(
    url: string | URL
  ) {
    return fetchJson<T>(url)
      .catch(Log.error);
  }

  public static opaque(rgb: number): Colour.Hex {
    return ((0xff << 24) | (rgb & 0xffffff)) >>> 0 as Colour.Hex;
  }

  public static withAlpha(a: number, rgb: number): Colour.Hex {
    return (((a & 0xff) << 24) | (rgb & 0xffffff)) >>> 0 as Colour.Hex;
  }

  /**
   * "#RRGGBB" -> 0xRRGGBB
   */
  public static parseHexRGB(hex: Colour.HexRGB): number {
    // hex is guaranteed to start with '#', length 7
    return Number.parseInt(hex.slice(1), 16);
  }

  /**
   * "#RRGGBB" -> 0xFFRRGGBB
   */
  public static opaqueHex(hex: Colour.HexRGB): Colour.Hex {
    return this.opaque(this.parseHexRGB(hex));
  }

  /**
   * @param {Colour.Tuple8} argb - [a, r, g, b] (0–255)
   * @returns {number} `0xAARRGGBB`
   *
   * @example
   * ```ts
   * const argb = argbToInt([0xae, 0xee, 0xdd, 0xcc]); // 0xaeeeddcc
   * ```
   */
  public static argbToInt([a, r, g, b]: Colour.Tuple8): number {
    return (
      ((a & 0xff) << 24) |
      ((r & 0xff) << 16) |
      ((g & 0xff) << 8)  |
      (b & 0xff)
    /// >>> 0 forces an unsigned 32-bit integer, which is important in JS when the
    /// top bit is set (alpha ≥ 128).
    ) >>> 0;
  }

  /**
   * ---
   * @example
   * ```ts
   * const argb = intToArgb(0xaeeeddcc); // `0xAARRGGBB`
   * ```
   * ---
   * @param {number} color - `0xAARRGGBB`
   * @returns {Colour.Hex} `[174, 238, 221, 204]`
   */
  public static intToArgb(color: Colour.Hex): Colour.Tuple8 {
    return [
      (color >>> 24) & 0xff,
      (color >>> 16) & 0xff,
      (color >>> 8) & 0xff,
      color & 0xff,
    ];
  }

  /**
   * ---
   * Helper for animation values.
   *
   * ---
   * @example
   * ```ts
   * const argb = argb01ToInt([0.68, 0.93, 0.87, 0.8]); // 0xAARRGGBB
   * ```
   * ---
   * @param {Colour.Tuple} argb01 - [a, r, g, b] (0–1)
   * @returns {number} `0xAARRGGBB`
   */
  public static argb01ToInt([a, r, g, b]: Colour.Tuple01): number {
    return this.argbToInt([
      Math.round(a * 255),
      Math.round(r * 255),
      Math.round(g * 255),
      Math.round(b * 255),
    ]);
  }

  /**
   * @param {Colour.Hex} color
   * @returns {string} e.g. "0xaeeeddcc"
   */
  public static colorToHexStr(color: Colour.Hex): string {
    return `0x${color.toString(16).padStart(8, '0')}`;
  }

  /**
   * ---
   * @example
   * ```ts
   * const themeTokens = await Colour.fetchJson<Tokens>("/tokens/theme.json");
   * const palette = Colour.tokensToPalette(themeTokens;
   *
   * palette.orange[500]; // Colour.Hex ready for Lightning
   * ```
   *
   * ---
   * @param tokens
   * @returns
   */
  public static tokensToPalette(tokens: Colour.Tokens): Colour.Palette {
    const out: Record<string, Colour.Range> = {};

    for (const [family, scale] of Object.entries(tokens)) {
      if (!scale || typeof scale !== "object") continue;

      // Build a complete Range; throw if any required shade is missing
      const range = {} as Record<Colour.Shade, Colour.Hex>;

      for (const s of this.SHADES) {
        const key = String(s) as Colour.ShadeStr;
        const hex = scale[key];
        if (!hex) {
          throw new Error(`Missing shade ${family}.${key} in tokens`);
        }
        range[s] = Colour.opaqueHex(hex);
      }

      out[family] = range as Colour.Range;
    }

    return out as Colour.Palette;
  }

  /**
   * ---
   * Theme overriding.
   *
   * ---
   * @example
   * ```ts
   * const themeTokens = await Colour.fetchJson<Tokens>("/tokens/theme.json");
   * const brandTokens = await Colour.fetchJson<Tokens>("/tokens/brand.json");
   *
   * const merged = Colour.mergeTokens(themeTokens, brandTokens);
   * const palette = Colour.tokensToPalette(merged);
   *
   * palette.orange[500]; // Colour.Hex ready for Lightning
   * ```
   *
   * ---
   * @param base
   * @param overrides
   * @returns merged theme.
   */
  public static mergeTokens(base: Colour.Tokens, overrides: Colour.Tokens): Colour.Tokens {
    const out: Colour.Tokens = JSON.parse(JSON.stringify(base)); // simple deep clone

    for (const [family, overrideScale] of Object.entries(overrides)) {
      out[family] ??= {};
      const baseScale = out[family]!;
      for (const [shade, hex] of Object.entries(overrideScale ?? {})) {
        baseScale[shade as Colour.ShadeStr] = hex as `#${string}`;
      }
    }

    return out;
  }
}

declare namespace Colour {
  /** Branded 0xAARRGGBB number */
  export type Hex = number & { readonly __hexBrand: unique symbol };

  /** accepts strings like "#f97316" */
  export type HexRGB = `#${string}`;

  /** [a,r,g,b] each intended 0–255 */
  export type Tuple8 = [a: number, r: number, g: number, b: number];

  /** [a,r,g,b] each intended 0–1 */
  export type Tuple01 = [a: number, r: number, g: number, b: number];
  export type ShadeStr =
  | "50" | "100" | "200" | "300" | "400"
  | "500" | "600" | "700" | "800" | "900" | "950";
  export type Tokens = Record<string, Partial<Record<ShadeStr, `#${string}`>>>;
  export type Shade = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950
  export type Range = Record<Shade, Hex>;
  export type PaletteKey =
    | "slate"
    | "gray"
    | "zinc"
    | "neutral"
    | "stone"
    | "red"
    | "orange"
    | "amber"
    | "yellow"
    | "lime"
    | "green"
    | "emerald"
    | "teal"
    | "cyan"
    | "sky"
    | "blue"
    | "indigo"
    | "violet"
    | "purple"
    | "fuchsia"
    | "pink"
    | "rose";

  export type Palette = Record<string, Range>;
}

export { Colour };
