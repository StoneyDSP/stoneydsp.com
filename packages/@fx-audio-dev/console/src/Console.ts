/*
  eslint-disable
  prefer-const,
  prefer-spread,
  prefer-rest-params,
  @typescript-eslint/no-unused-vars,
  @typescript-eslint/no-explicit-any
*/

let sink = console;

type Sink = typeof sink;

let enabled: true | false = true;

/**
 * ---
 * The {@link Console} class.
 *
 *
 * ---
 *
 * @remarks
 *
 * Based on `Log` from `@lightningjs/sdk`.
 *
 * ---
 *
 * @see https://lightningjs.io/docs/#/lightning-sdk-reference/plugins/log
 *
 * ---
 *
 * @class {@link Console}
 */
class Console {
  protected _initialized = false;

  /// Private makes this class non-constructable, just exposes the static
  /// methods under a namespace...
  private constructor() {
    this._initialized = true;
  }

  public static get enabled(): Readonly<true | false> {
    return enabled;
  }

  public static enable(): void {
    enabled = true;
  }
  public static disable(): void {
    enabled = false;
  }
  public static setEnabled(v: true | false): void {
    enabled = v;
  }

  private static _enabled(): true | false {
    return enabled;
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
  public static info(...data: any[]): void {
    if (this._enabled())
      sink.log.apply(sink, this._prepConsole("info", arguments));
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
  public static debug(...data: any[]): void {
    if (this._enabled())
      sink.debug.apply(sink, this._prepConsole("debug", arguments));
  }

  /**
   * Invokes a `console.error` when the global definition `__DEV__` equals `true`.
   *
   * The `error` method accepts any number of arguments.
   *
   * If the *first* argument is a `string`, that argument will be displayed as a
   * custom label instead of the default label 'error'.
   *
   * If *any* argument is an instance of (or inherited from) type `Error`,
   * that argument will automatically be parsed and pretty-logged in a uniform
   * manner.
   *
   */
  public static error(e: Error): void;
  public static error(...data: any[]): void;
  public static error(...data: unknown[]): void {
    if (this._enabled()) {
      const args = [...arguments];
      const error = args.find((arg) => arg instanceof Error);
      const params = args.filter((arg) => arg !== error);
      if (typeof error === "undefined") {
        sink.error.apply(sink, this._prepConsole("error", arguments));
      } else {
        sink.error.apply(sink, [error, ...params]);
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
  public static warn(...data: any[]): void {
    if (this._enabled())
      sink.warn.apply(sink, this._prepConsole("warn", arguments));
  }

  /**
   * Invokes a `console.debug` when the global definition `__DEV__` equals `true`.
   *
   * `console.warn` may be used as an alternative, because it generates a
   * stack trace, making it easy to understand the origin (and callstack) of the
   * reported event.
   *
   * The event method accepts any number of arguments.
   *
   * If the first argument is a `String`, it will be displayed as a custom label
   * instead of the default label ‘event’.
   *
   */
  public static event(...data: any[]): void {
    if (this._enabled())
      console.debug.apply(console, this._prepConsole("event", arguments));
  }

  /**
   * Provides styling and formatting of console log message args by type.
   *
   * @param key
   * @param args
   * @returns
   */
  private static _prepConsole = <Key extends Console.Key>(
    key: Key,
    args: IArguments
  ) => {
    const input = [].slice.call(args); // ES5-safe

    return [
      `%c${
        input.length > 1 && typeof input[0] === "string" ? input.shift() : key
      }`,

      "background-color: " +
        this._colors[key] +
        "; color: white; padding: 2px 4px; border-radius: 2px",
      input,
    ];
  };

  protected static _colors: Console.Colors = {
    info: "green",
    debug: "gray",
    warn: "orange",
    error: "red",
    assert: "purple",
    event: "blue",
  };
}

/**
 * The {@link Console} namespace additionally carries some utility typings.
 *
 * ---
 *
 * @namespace {@link Console}
 */
namespace Console {
  export type Type = Pick<Sink, "info" | "debug" | "warn" | "error" | "assert">;
  export type Key = keyof Type | "event";
  export type Colors = {
    info: "green";
    debug: "gray";
    warn: "orange";
    error: "red";
    assert: "purple";
    event: "blue";
  };
}

export { Console };

/*
  eslint-enable
  prefer-const,
  prefer-spread,
  prefer-rest-params,
  @typescript-eslint/no-unused-vars,
  @typescript-eslint/no-explicit-any
*/
