declare type ThenFn = () => void;
declare type CatchFn = (e: unknown) => void;
declare type FinallyFn = () => void;

/**
 * ---
 *
 * @example
 * ```ts
 * // fires all internal functions in sequence, when called
 * function bootstrapApp() {
 *   return sequence([
 *     () => checkRegion(),
 *     () => checkDevice(),
 *     () => checkAuthStore(),
 *     () => checkIsUserLoggedIn(),
 *     () => startRouter(),
 *     () => launchApp()
 *   ])
 * }
 *
 * const app = boostrapApp();
 * ```
 *
 * ---
 *
 * @example
 * ```ts
 * // fires all internal functions in sequence, and uses a custom error handler
 * function setupPlayer() {
 *   let newDrmConfig
 *   return sequence(
 *     // try[3]
 *     [
 *       () => checkDRM().then((drmConfig) => { newDrmConfig = config; return config; }),
 *       () => checkManifest(drmConfig),
 *       () => loadPlayer(),
 *     ],
 *     // catch
 *     (e) => {
 *       Log.error("setupPlayer", e);
 *       Router.navigate("error");
 *     }
 *   )
 * }
 *
 * const player = setupPlayer();
 * ```
 *
 * ---
 *
 */
function sequence(
  /**
   * @param {Array<ThenFn>} tasks An array of functions to be executed in order
   */
  tasks: Array<ThenFn>,
  /**
   * @param {CatchFn | undefined} [Promise.reject] Optional callback to be executed on every `.catch()`
   */
  catchFn: CatchFn | undefined = Promise.reject,
  /**
   * @param {FinallyFn | undefined} [finallyFn=FinallyFn] Optional callback to be executed on every `.finally()`
   */
  finallyFn: FinallyFn | undefined = undefined
  //
): Promise<void> {
  // This line will wait for the last async function to finish.
  // The first iteration uses an already resolved Promise
  // so, it will immediately continue.
  return tasks.reduce<Promise<void>>(function (promise, thenFn) {
    return promise.then(thenFn).catch(catchFn).finally(finallyFn);
  }, Promise.resolve());
}

export { sequence };
