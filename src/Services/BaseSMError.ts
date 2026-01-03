/**
 * ---
 *
 * The {@link BaseSMError} interface.
 *
 * Can be inherited to throw new Errors carrying data specific to a class.
 *
 * ---
 *
 * @example
 * ```ts
 * class MyVendorSMError<
 *   Code extends MyVendorSMError.Code = MyVendorSMError.Code,
 *   Details extends MyVendorSMError.Details = MyVendorSMError.Details,
 * >
 *   extends BaseSMError<Code, Details>
 *   implements BaseSMError<Code, Details>
 * {
 *   override readonly code: keyof Code;
 *   override readonly message: string;
 *   override readonly details?: Details;
 *
 *   constructor(code: keyof Code, message: string, details?: Details) {
 *     super(code, message, details);
 *   }
 * }
 *
 * // pseudo-example using your custom Error type
 * const exampleThrow = () => {
 *   try {
 *     MyVendorSM.getAPIResponse();
 *   } catch(e) {
 *     throw new MyVendorSMError("ERR_VENDOR_NETWORK_FAILURE", (e as Error).message);
 *   }
 * }
 * ```
 *
 * ---
 *
 * @abstract
 * @class
 * @template {BaseSMError.Code} [Code=BaseSMError.Code]
 * @template {BaseSMError.Details} [Details=BaseSMError.Details]
 * @extends {globalThis.Error}
 * @implements {globalThis.Error}
 */
abstract class BaseSMError<
  Code extends BaseSMError.Code = BaseSMError.Code,
  Details extends BaseSMError.Details = BaseSMError.Details,
>
  extends globalThis.Error
  implements globalThis.Error
{
  constructor(code: keyof Code, message: string, details?: Details) {
    super(message);
    this.code = code;
    this.message = message;
    this.details = details;
    this.name = this.constructor.name;
    if (this.details && this.details.cause) this.cause = this.details.cause;
    if (this.details && this.details.stack) this.stack = this.details.stack;
  }

  override readonly cause!: unknown;

  /**
   * @readonly
   * @type {keyof Code}
   */
  readonly code: keyof Code;

  /**
   * @readonly
   * @type {string}
   */
  override readonly message: string;

  /**
   * @readonly
   * @type {Details}
   */
  readonly details?: Details;
}

namespace BaseSMError {
  /**
   * ---
   *
   * The {@link BaseSMError}.{@link Code} typing.
   *
   * Extend from this interface to provide custom error codes to your Service
   * Manager, while maintaining the reference base implementation codes common
   * to all Service Managers.
   *
   * ---
   *
   * @example
   * ```ts
   * namespace MyVendorSMError {
   *
   *   // 'MyVendorSM'-specific Error codes
   *   export interface Code extends BaseSMError.Code {
   *     ERR_VENDOR_NETWORK_FAILURE: "ERR_VENDOR_NETWORK_FAILURE";
   *     ERR_VENDOR_REJECTED_REQUEST: "ERR_VENDOR_REJECTED_REQUEST";
   *     ERR_VENDOR_TIMEOUT: "ERR_VENDOR_TIMEOUT";
   *     // etc...
   *   }
   *
   * }
   * ```
   */
  export interface Code {
    /**
     * Any unexpected internal error.
     */
    readonly ERR_UNKNOWN: "ERR_UNKNOWN";
  }
  /**
   * ---
   *
   * The {@link BaseSMError}.{@link Details} typing.
   *
   * Extend from this interface to provide custom error details to your Service
   * Manager, while maintaining the reference base implementation details common
   * to all Service Managers.
   *
   * ---
   *
   * @example
   * ```ts
   * namespace MyVendorSMError {
   *
   *   // 'MyVendorSM'-specific Error details
   *   export interface Details extends BaseSMError.Details {
   *     attempts: number;
   *     responded: boolean;
   *     stack?: Record<string, unknown>;
   *     // etc...
   *   }
   *
   * }
   * ```
   */
  export interface Details extends Record<string, unknown> {
    cause?: unknown | undefined;
    stack?: string | undefined;
  }
}

export { BaseSMError };
