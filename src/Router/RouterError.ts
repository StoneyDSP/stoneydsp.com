import { TError } from "../lib/TError";

/**
 * ---
 *
 * The {@link RouterError} class.
 *
 * Can be used to throw new Errors carrying data specific to the
 * {@link PlaybackSM} class.
 *
 * ---
 *
 * @example
 * ```ts
 * class MyVendorPlaybackSM extends PlaybackSM {
 *
 *   public static async fetchPlaybackSource(source: SourceParams) {
 *     try {
 *       await PlaybackSM.load(`/playback/${source.url}`); // etc...
 *     } catch(e) {
 *       throw new RouterError("ERR_SOURCE_LOAD_FAILED", (e as Error).message);
 *     }
 *   }
 *
 * }
 * ```
 *
 * ---
 *
 * @class
 * @template {RouterError.Code} [Code=RouterError.Code]
 * @template {RouterError.Details} [Details=RouterError.Details]
 * @extends {TError<Code,Details>}
 * @implements {TError<Code,Details>}
 */
class RouterError<
  Code extends RouterError.Code = RouterError.Code,
  Details extends RouterError.Details = RouterError.Details,
>
  extends TError<Code, Details>
  implements TError<Code, Details>
{
  constructor(code: keyof Code, message: string, details?: Details) {
    super(code, message, details);
    this.code = code;
    this.details = details;
  }

  override readonly code: keyof Code;

  override readonly details?: Details;
}

namespace RouterError {
  /**
   * ---
   *
   * The {@link RouterError}.{@link Code} typing.
   *
   * Extend from this interface to provide custom error codes to your Playback
   * Service Manager, while maintaining the reference base implementation codes
   * common to all Playback Service Managers.
   *
   * ---
   *
   * @example
   * ```ts
   * namespace MyVendorRouterError {
   *
   *   // 'MyVendorPlaybackSM'-specific Error codes
   *   export interface Code extends RouterError.Code {
   *     ERR_VENDOR_NETWORK_FAILURE: "ERR_VENDOR_NETWORK_FAILURE";
   *     ERR_VENDOR_REJECTED_REQUEST: "ERR_VENDOR_REJECTED_REQUEST";
   *     ERR_VENDOR_TIMEOUT: "ERR_VENDOR_TIMEOUT";
   *     // etc...
   *   }
   *
   * }
   * ```
   */
  export interface Code extends TError.Code {
    /**
     *
     */
    readonly ERR_BOOT_HOOK: "ERR_BOOT_HOOK";
    /**
     *
     */
    readonly ERR_ROOT_HOOK: "ERR_ROOT_HOOK";
    /**
     *
     */
    readonly ERR_BEFORE_EACH_ROUTE_HOOK: "ERR_BEFORE_EACH_ROUTE_HOOK";
    /**
     *
     */
    readonly ERR_AFTER_EACH_ROUTE_HOOK: "ERR_AFTER_EACH_ROUTE_HOOK";
    /**
     *
     */
    readonly ERR_BEFORE_NAVIGATE_HOOK: "ERR_BEFORE_NAVIGATE_HOOK";
    /**
     *
     */
    readonly ERR_PROVIDER_HOOK: "ERR_PROVIDER_HOOK";
  }
  /**
   * ---
   *
   * The {@link RouterError}.{@link Details} typing.
   *
   * Extend from this interface to provide custom error details to your Playback
   * Service Manager, while maintaining the reference base implementation
   * details common to all Playback Service Managers.
   *
   * ---
   *
   * @example
   * ```ts
   * namespace MyVendorRouterError {
   *
   *   // 'MyVendorPlaybackSM'-specific Error details
   *   export interface Details extends RouterError.Details {
   *     attempts: number;
   *     responded: boolean;
   *     stack?: Record<string, unknown>;
   *     // etc...
   *   }
   *
   * }
   * ```
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface Details extends TError.Details {}
}

export { RouterError };
