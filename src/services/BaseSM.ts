import { Log } from "../lib/Log";

const DEFAULTS = {
  params: {
    dbg: false,
  } satisfies BaseSM.Params,
} as const;

abstract class BaseSM<Params extends BaseSM.Params = BaseSM.Params> {
  constructor(params?: Partial<Params | undefined>) {
    this.#params = { ...DEFAULTS.params, ...params } as Params;
    if (this.#params.dbg)
      Log.debug(`${this.constructor.name}`, `constructor()`, {
        params,
        defaults: DEFAULTS,
        this: this,
      });
  }

  /**
   * ---
   * @type {Params}
   */
  #params: Params;

  /**
   * ---
   * @type {Readonly<Params>}
   */
  public get params(): Readonly<Params> {
    return this.#params;
  }
}

namespace BaseSM {
  /**
   *
   */
  export interface Params extends Record<string | symbol, unknown> {
    dbg: boolean;
  }
}

export { BaseSM };
