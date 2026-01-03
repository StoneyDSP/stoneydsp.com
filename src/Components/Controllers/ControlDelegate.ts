import type { BaseComponent } from "fx-audio-dev";
import type { Control, ControlAddress, ControlValue } from "./types";

/**
 * ---
 * The {@link ControlDelegate} interface should be implemented and used as a
 * data member on a Component, in order to emit {@link Control} bus signals.
 *
 * ---
 */
declare interface ControlDelegate<
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  HostComponent extends ControlDelegate.HostComponent,
  Type extends Control,
> {
  canInteract(): boolean;
  begin(): void;
  change(nextValue: Type["state"]["value"]): void;
  commit(nextValue: Type["state"]["value"]): void;
}

declare namespace ControlDelegate {
  export interface SignalMapType extends BaseComponent.SignalMap {
    onControlBegin(payload: { address: ControlAddress; label: string }): void;
    onControlChange(payload: {
      address: ControlAddress;
      label: string;
      value: ControlValue;
    }): void;
    onControlCommit(payload: {
      address: ControlAddress;
      label: string;
      value: ControlValue;
    }): void;
  }
  export type HostComponent<
    Spec extends BaseComponent.TemplateSpec = BaseComponent.TemplateSpec,
    Config extends BaseComponent.TypeConfig = BaseComponent.TypeConfig,
    Data extends BaseComponent.Data & { control: Control; label: string } =
      BaseComponent.Data & { control: Control; label: string },
  > = BaseComponent<
    Spec,
    Config & {
      SignalMapType: ControlDelegate.SignalMapType;
    },
    Data
  >;
}

export type { ControlDelegate, ControlDelegate as default };
