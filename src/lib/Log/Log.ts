/* eslint-disable prefer-spread, prefer-rest-params, @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, @typescript-eslint/no-namespace */

import { __DEV__ } from "../../CONSTS";
import { BaseSMError } from "../../services";

/**
 * The {@link Log} class.
 *
 * Based on `Log` from `@lightningjs/sdk`.
 *
 * @see https://lightningjs.io/docs/#/lightning-sdk-reference/plugins/log
 */
class Log {
  protected _initialized = false;

  /// Private makes this class non-constructable, just exposes the static
  /// methods under a namespace...
  private constructor() {
    this._initialized = true;
  }

  /**
   * Provides styling and formatting of console log message args by type.
   *
   * @param type
   * @param args
   * @returns
   */
  private static _prepLog = (type: Log.Key, args: any) => {
    const colors = {
      info: "green",
      debug: "gray",
      warn: "orange",
      error: "red",
      assert: "purple",
      event: "blue",
    };

    // const input = Array.from(args);
    // eslint-disable-next-line no-var
    var input = [].slice.call(args); // ES5-safe

    return [
      `%c${
        input.length > 1 && typeof input[0] === "string" ? input.shift() : type
      }`,

      "background-color: " +
        colors[type] +
        "; color: white; padding: 2px 4px; border-radius: 2px",
      input,
    ];
  };

  private static _enabled() {
    return Log.isDev;
  }

  /**
   * Invokes a `console.log` when the global definition `__DEV__` equals `true`.
   *
   * The info method accepts any number of arguments.
   *
   * If the first argument is a `string`, it will be displayed as a custom label
   * instead of the default label ‘info’.
   *
   */
  public static info(..._data: any[]): void {
    if (this._enabled())
      console.log.apply(console, this._prepLog("info", arguments));
  }

  /**
   * Invokes a `console.debug` when the global definition `__DEV__` equals `true`.
   *
   * The debug method accepts any number of arguments.
   *
   * If the first argument is a `string`, it will be displayed as a custom label
   * instead of the default label 'debug'.
   *
   */
  public static debug(..._data: any[]): void {
    if (this._enabled())
      console.debug.apply(console, this._prepLog("debug", arguments));
  }

  /**
   * Invokes a `console.error` when the global definition `__DEV__` equals `true`.
   *
   * The error method accepts any number of arguments.
   *
   * If the *first* argument is a `string`, that argument will be displayed as a
   * custom label instead of the default label 'error'.
   *
   * If the *only* argument is an instance of (or inherited from) type `Error`,
   * that argument will automatically be parsed and pretty-logged in a uniform
   * manner.
   *
   */
  public static error(e: Error): void;
  public static error(...data: any[]): void;
  public static error(e?: Error, _data?: any[]): void {
    if (this._enabled()) {
      switch (true) {
        case e instanceof BaseSMError: {
          this._prettyPrintError(e);
          break;
        }
        case e instanceof Error: {
          this._prettyPrintError(e);
          break;
        }
        default: {
          console.error.apply(console, this._prepLog("error", arguments));
          break;
        }
      }
    }
  }

  /**
   * Invokes a `console.warn` when the global definition `__DEV__` equals `true`.
   *
   * The warn method accepts any number of arguments.
   *
   * If the first argument is a `string`, it will be displayed as a custom label
   * instead of the default label ‘warn’.
   *
   */
  public static warn(..._data: any[]): void {
    if (this._enabled())
      console.warn.apply(console, this._prepLog("warn", arguments));
  }

  /**
   * Invokes a `console.debug` when the global definition `__DEV__` equals `true`.
   *
   * `console.warn` may be used as an alternative, because it generates a
   * stacktrace, making it easy to understand the origin (and callstack) of the
   * reported event.
   *
   * The event method accepts any number of arguments.
   *
   * If the first argument is a `String`, it will be displayed as a custom label
   * instead of the default label ‘event’.
   *
   */
  public static event(..._data: any[]): void {
    if (this._enabled())
      console.debug.apply(console, this._prepLog("event", arguments));
  }

  /**
   * TODO: apply some nice formatting which will be applied to all Errors?
   *
   * @param e
   *
   * @example
   * ```ts
   * const e = new PlaybackSMError("ERR_UNKNOWN", "foo");
   * Log.error(e);
   * //
   * // PlaybackSMError: foo
   * // Stack trace:
   * // etc...
   * //
   * ```
   */
  protected static _prettyPrintError<E extends Error = Error>(e: E) {
    console.error.apply(console, this._prepLog("error", e)); // TODO...
  }
}

namespace Log {
  export const isDev: true | false = __DEV__ || false;
  export type Type = Pick<
    Console,
    "info" | "debug" | "warn" | "error" | "assert"
  >;
  export type Key = keyof Type | "event";
}

export { Log };

/* eslint-enable prefer-spread, prefer-rest-params, @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, @typescript-eslint/no-namespace */
