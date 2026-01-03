import type { ControlDelegate } from "./ControlDelegate";
import type { Control } from "./types";

/***
 * ---
 *
 */
class DefaultControlDelegate<
  HostComponent extends ControlDelegate.HostComponent,
  Type extends Control,
> implements ControlDelegate<HostComponent, Type> {
  constructor(private readonly host: HostComponent) {}

  private get control(): Type {
    return (this.host as HostComponent).data["control"] as Type;
  }

  canInteract(): boolean {
    const { enabled, readOnly } = this.control.flags;
    return enabled && !readOnly;
  }

  begin() {
    if (!this.host.data?.control)
      throw new Error("ControlDelegate: host.data.control missing");

    (this.host as HostComponent).signal("onControlBegin", {
      address: this.control.address,
      label: this.control.label ?? (this.host as HostComponent).data.label,
    });
  }

  change(value: Control["state"]["value"]) {
    if (!this.host.data?.control)
      throw new Error("ControlDelegate: host.data.control missing");

    // Log.warn(this.constructor.name, "change", value, this);

    (this.host as HostComponent).signal("onControlChange", {
      address: this.control.address,
      label: this.control.label ?? (this.host as HostComponent).data.label,
      value,
    });
  }

  commit(value: Control["state"]["value"]) {
    if (!this.host.data?.control)
      throw new Error("ControlDelegate: host.data.control missing");

    (this.host as HostComponent).signal("onControlCommit", {
      address: this.control.address,
      label: this.control.label ?? (this.host as HostComponent).data.label,
      value,
    });
  }
}

export { DefaultControlDelegate as default, DefaultControlDelegate };
