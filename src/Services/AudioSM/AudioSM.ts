import { Log } from "@lightningjs/sdk";
import { controlAddressToName } from "../../lib/controlAddressToName";
import type { ControlSpec, SceneManifest } from "../../scenes/types";
import { BaseSM } from "../BaseSM";

const DEFAULTS = {
  params: {
    dbg: false,
  },
} as const;

/**
 * 1. app calls audio.loadManifest(nextManifest)
 * 2. base handles scene disposal + UI metadata
 * 3. vendor hook registers control endpoints
 *
 * The base class remains the source of truth for:
 *
 * - activeSceneId, activeSceneControls
 * - disposal semantics
 * - address canonicalisation
 *
 * The vendor class owns only: “How do toggles/sliders/combos talk to this engine?”
 */
abstract class AudioSM<Params extends AudioSM.Params = AudioSM.Params>
  extends BaseSM<Params>
  implements BaseSM<AudioSM.Params>
{
  static readonly Value = null as unknown as AudioSM.ControlValue;

  private _endpoints = new Map<AudioSM.AddressKey, AudioSM.ControlEndpoint>();

  private _subcriptions = new Map<
    AudioSM.AddressKey,
    Set<(v: AudioSM.ControlValue) => void>
  >();

  private _scene?: AudioSM.SceneInstance;

  constructor(params: Params) {
    super({ ...DEFAULTS.params, ...params });
  }

  /**
   * ---
   * Canonical address → string key (stable across JUCE/WebAudio)
   *
   * ---
   * @param address
   * @returns
   */
  protected keyOf(address: AudioSM.ControlAddress): AudioSM.AddressKey {
    return controlAddressToName(address);
  }

  /**
   * ---
   * Called by vendor subclasses once they’re ready to load the default scene.
   *
   * ---
   * @param scene
   * @returns {void}
   */
  protected loadDefaultScene(scene?: AudioSM.SceneFactory): void {
    if (!scene) return;

    // v1: no hot-switching, but we still keep disposal semantics correct
    this._scene?.dispose();

    this._scene = scene({
      keyOf: (a) => this.keyOf(a),
      register: (a, ep) => this.register(a, ep),
      emit: (a, v) => this.emit(a, v),
    });
  }

  /**
   * ---
   * Scene API: bind an address to a handler
   *
   * ---
   * @param address
   * @param endpoint
   */
  protected register(
    address: AudioSM.ControlAddress,
    endpoint: AudioSM.ControlEndpoint
  ): void {
    const key = this.keyOf(address);
    this._endpoints.set(key, endpoint);

    // If the endpoint can provide an initial value, emit it once.
    if (endpoint.get) {
      const v = endpoint.get();
      this.emit(address, v);
    }
  }

  /**
   * ---
   * Public API: UI → engine
   *
   * ---
   * @param {AudioSM.ControlAddress} address
   * @param {AudioSM.ControlValue} value
   * @returns {Promise<void>}
   */
  public async set(
    address: AudioSM.ControlAddress,
    value: AudioSM.ControlValue
  ): Promise<void> {
    Log.warn(this.constructor.name, "set", address, value, this);
    const key = this.keyOf(address);
    const ep = this._endpoints.get(key);
    if (!ep) return;

    await ep.set(value);

    // If scene doesn’t explicitly emit, we can optionally emit here.
    // recommended: scenes/endpoints call `emit` when they’ve applied the value.
  }

  /**
   * ---
   * Public API: engine → UI
   *
   * ---
   * @param {AudioSM.ControlAddress} address
   * @param {(v: AudioSM.ControlValue) => void} cb
   * @returns {() => void}
   */
  public subscribe(
    address: AudioSM.ControlAddress,
    cb: (v: AudioSM.ControlValue) => void
  ): () => void {
    ///
    const key = this.keyOf(address);
    ///
    if (!this._subcriptions.has(key)) this._subcriptions.set(key, new Set());
    ///
    this._subcriptions.get(key)!.add(cb);

    /// Immediate emit if endpoint can read current state
    const ep = this._endpoints.get(key);
    ///
    if (ep?.get) cb(ep.get());

    ///
    return () => {
      const set = this._subcriptions.get(key);
      if (!set) return;
      set.delete(cb);
      if (set.size === 0) this._subcriptions.delete(key);
    };
  }

  /**
   * ---
   * Scene API: publish value updates
   *
   * ---
   * @param address
   * @param value
   * @returns {void}
   */
  protected emit(
    address: AudioSM.ControlAddress,
    value: AudioSM.ControlValue
  ): void {
    const key = this.keyOf(address);
    const set = this._subcriptions.get(key);
    if (!set) return;
    for (const cb of set) cb(value);
  }

  /**
   * ---
   * Optional: explicit teardown (useful for tests)
   *
   * ---
   * @returns {void}
   */
  public dispose(): void {
    this._scene?.dispose();
    this._scene = undefined;

    for (const ep of this._endpoints.values()) ep.dispose?.();
    this._endpoints.clear();
    this._subcriptions.clear();
  }

  protected loadSceneFromManifest(
    manifest: SceneManifest,
    scene?: AudioSM.SceneFactory
  ): void {
    this._activeSceneId = manifest.id;
    this._activeSceneControls = manifest.controls ?? [];
    this.loadDefaultScene(scene);
  }

  /**
   * Vendor SM helper: load manifest metadata + scene factory (typed, protected).
   *
   * Stable public API: the app calls this to activate a manifest.
   */
  public loadManifest(
    manifest: SceneManifest,
    factory?: AudioSM.SceneFactory
  ): void {
    // 1) allow vendor SM to register generic endpoints for this manifest
    this.registerManifestControls(manifest);

    // 2) update UI-facing manifest metadata + load scene factory
    this.loadSceneFromManifest(manifest, factory);
  }

  /**
   * Vendor hook. Default does nothing (custom-only scenes, etc).
   * WebAudioSM/JUCEAudioSM override this.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected registerManifestControls(_manifest: SceneManifest): void {
    // no-op by default
  }

  /**
   * Loader for global ("master") controls, i.e., master volume, mute, etc.
   * @param {AudioSM.SceneFactory | undefined} [globals]
   * @returns
   */
  protected loadGlobals(globals?: AudioSM.SceneFactory): void {
    if (!globals) return;

    // globals are not "the scene", but can use the same ctx API
    globals({
      keyOf: (a) => this.keyOf(a),
      register: (a, ep) => this.register(a, ep),
      emit: (a, v) => this.emit(a, v),
    });
  }

  // ---------- Vendor helpers (avoid bracket-access hacks)

  /** Vendor SM helper: register an endpoint (typed, protected). */
  protected registerEndpoint(
    address: AudioSM.ControlAddress,
    endpoint: AudioSM.ControlEndpoint
  ): void {
    this.register(address, endpoint);
  }

  /** Vendor SM helper: emit a value update (typed, protected). */
  protected emitValue(
    address: AudioSM.ControlAddress,
    value: AudioSM.ControlValue
  ): void {
    this.emit(address, value);
  }

  /// -------------------------------------- TODO: UI SCENE HOT-SWAPPING SUPPORT

  private _activeSceneId?: string;
  private _activeSceneControls?: readonly ControlSpec[];

  public get activeSceneId(): string | undefined {
    return this._activeSceneId;
  }

  public get activeSceneControls(): readonly ControlSpec[] | undefined {
    return this._activeSceneControls;
  }
}

declare namespace AudioSM {
  export type Params = BaseSM.Params & {
    defaultScene?: AudioSM.SceneFactory;
    defaultSceneManifest: SceneManifest;
    defaultGlobals?: AudioSM.SceneFactory;
  };

  export type ControlValue =
    import("../../Components/Controllers/types").ControlValue;
  export type ControlAddress =
    import("../../Components/Controllers/types").ControlAddress;
  export type SceneFactory = import("../../scenes/types").SceneFactory;
  export type AddressKey = import("../../scenes/types").AddressKey;
  export type ControlEndpoint = import("../../scenes/types").ControlEndpoint;
  export type SceneInstance = import("../../scenes/types").SceneInstance;
}

export { AudioSM, AudioSM as default };
