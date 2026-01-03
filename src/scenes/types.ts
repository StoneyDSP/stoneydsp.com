import type {
  ControlAddress,
  ControlValue,
} from "../Components/Controllers/types";

/// ---------------------------------------------------------------------- SPEC

export declare type AddressKey = string;

export declare type ControlSpecBase = {
  /** Stable ID for this control within the scene (useful for UI keys) */
  id: string;

  /** Address used by AudioSM.set/subscribe */
  address: ControlAddress;

  /** Human label for UI */
  label: string;

  /** Optional help text */
  description?: string;
};

export declare type ToggleSpec = ControlSpecBase & {
  kind: "toggle";
  default?: boolean;
};

export declare type SliderSpec = ControlSpecBase & {
  kind: "slider";
  default?: number; // normalised 0..1
  step?: number; // optional UI step
};

export declare type ComboSpec = ControlSpecBase & {
  kind: "combo";
  default?: number; // index for `choices[]`
  choices: Array<{ id: string; label: string }>;
};

export declare type ControlSpec = ToggleSpec | SliderSpec | ComboSpec;

export declare type ControlEndpoint = {
  /** Set from UI → engine */
  set(value: ControlValue): void | Promise<void>;
  /** Optional read for immediate emit */
  get?(): ControlValue;
  /** Optional cleanup per endpoint */
  dispose?(): void;
};

/// --------------------------------------------------------------------- SCENE

export declare type SceneContext = {
  /** Convert address to canonical string key */
  keyOf(address: ControlAddress): AddressKey;

  /** Register a handler for an address */
  register(address: ControlAddress, endpoint: ControlEndpoint): void;

  /** Publish state updates to subscribers */
  emit(address: ControlAddress, value: ControlValue): void;
};

export declare type SceneInstance = {
  dispose(): void;
};

export declare type SceneFactory = (ctx: SceneContext) => SceneInstance;

export declare type SceneViewKind = "genericControls" | "custom";

/**
 * SceneManifest is the stable “descriptor” that the UI can use to render a
 * scene.
 * The SceneFactory is still what installs endpoints.
 */
export type SceneManifest =
  | ({
      viewKind: "genericControls";
      /**
       * If `viewKind` is `"genericControls"`, these drive the inspector/panel
       */
      controls: ControlSpec[];
    } & SceneManifestBase)
  | ({
      viewKind: "custom";
      controls?: never;
    } & SceneManifestBase);

type SceneManifestBase = {
  id: string; // e.g. "debugTone"
  title: string; // e.g. "Debug Tone"
  description?: string;
  /// Factories for each engine. If we only have one engine in a build, we can
  /// omit the other.
  createWeb?: SceneFactory;
  createJuce?: SceneFactory;
};

/** Convenience: a typed list of manifests */
export declare type SceneCatalog = readonly SceneManifest[];
