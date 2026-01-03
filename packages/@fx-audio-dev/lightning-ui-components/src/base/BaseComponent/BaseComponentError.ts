/**
 * ---
 *
 * The {@link BaseComponentError} interface.
 *
 * Can be inherited to throw new Errors carrying data specific to a class.
 *
 * ---
 *
 * @example
 * ```ts
 * class MyComponentError<
 *   Code extends MyComponentError.Code = MyComponentError.Code,
 *   Details extends MyComponentError.Details = MyComponentError.Details,
 * >
 *   extends BaseComponentError<Code, Details>
 *   implements BaseComponentError<Code, Details>
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
 *     MyComponent.getAPIResponse();
 *   } catch(e) {
 *     throw new MyComponentError("ERR_VENDOR_NETWORK_FAILURE", (e as Error).message);
 *   }
 * }
 * ```
 *
 * ---
 *
 * @abstract
 * @class
 * @template {BaseComponentError.Code} [Code=BaseComponentError.Code]
 * @template {BaseComponentError.Details} [Details=BaseComponentError.Details]
 * @extends {globalThis.Error}
 * @implements {globalThis.Error}
 */
abstract class BaseComponentError<
  Code extends BaseComponentError.Code = BaseComponentError.Code,
  Details extends BaseComponentError.Details = BaseComponentError.Details,
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

  readonly cause?: unknown;

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

declare namespace BaseComponentError {
  /**
   * ---
   *
   * The {@link BaseComponentError}.{@link Code} typing.
   *
   * Extend from this interface to provide custom error codes to your Service
   * Manager, while maintaining the reference base implementation codes common
   * to all Service Managers.
   *
   * ---
   *
   * @example
   * ```ts
   * namespace MyComponentError {
   *
   *   // 'MyComponent'-specific Error codes
   *   export interface Code extends BaseComponentError.Code {
   *     ERR_PARAMETER_VALIDATION: "ERR_PARAMETER_VALIDATION",
   *     ERR_ERR_UNKNOWN: "ERR_ERR_UNKNOWN"
   *     // etc...
   *   }
   *
   * }
   * ```
   */
  export interface Code {
    /**
     * An incorrect datum was passed as a method parameter.
     */
    readonly ERR_PARAMETER_VALIDATION: "ERR_PARAMETER_VALIDATION";
    /**
     * Any unexpected internal error.
     */
    readonly ERR_UNKNOWN: "ERR_UNKNOWN";
  }
  /**
   * ---
   *
   * The {@link BaseComponentError}.{@link Details} typing.
   *
   * Extend from this interface to provide custom error details to your Service
   * Manager, while maintaining the reference base implementation details common
   * to all Service Managers.
   *
   * ---
   *
   * @example
   * ```ts
   * namespace MyComponentError {
   *
   *   // 'MyComponent'-specific Error details
   *   export interface Details extends BaseComponentError.Details {
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

export { BaseComponentError };
