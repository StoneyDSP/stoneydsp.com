abstract class BaseSM<T extends BaseSM.Params = BaseSM.Params> {
  protected params: T;

  constructor(params: T) {
    this.params = params;
  }
}
// eslint-disable-next-line @typescript-eslint/no-namespace
namespace BaseSM {
  /**
   *
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface Services extends Record<string | symbol, BaseSM> {}
  /**
   *
   */
  export type Params = Record<string, unknown>;
}

export { BaseSM };
