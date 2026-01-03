import type { ControlEndpoint, ControlSpec } from "../../scenes/types";

export type EndpointFactories = {
  toggle: (spec: Extract<ControlSpec, { kind: "toggle" }>) => ControlEndpoint;
  slider: (spec: Extract<ControlSpec, { kind: "slider" }>) => ControlEndpoint;
  combo: (spec: Extract<ControlSpec, { kind: "combo" }>) => ControlEndpoint;
};

export type RegisterFn = (
  address: ControlSpec["address"],
  ep: ControlEndpoint
) => void;

/**
 * Iterate manifest controls and register a ControlEndpoint per control.
 * This is shared logic; vendor SM supplies factories for the engine.
 */
export function registerEndpointsFromControls(
  controls: readonly ControlSpec[] | undefined,
  register: RegisterFn,
  factories: EndpointFactories
): void {
  if (!controls?.length) return;

  for (const spec of controls) {
    if (spec.kind === "toggle") register(spec.address, factories.toggle(spec));
    else if (spec.kind === "slider")
      register(spec.address, factories.slider(spec));
    else if (spec.kind === "combo")
      register(spec.address, factories.combo(spec));
    else {
      // Exhaustiveness: if we later extend ControlSpec kinds,
      // TS should force us to update this switch.
      // @ts-expect-error unused
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const _never: never = spec;
    }
  }
}
