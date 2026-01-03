import { makeCreateComponent } from "@fx-audio-dev/ui-components-vitest-utils";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { BaseComponent as _BaseComponent } from "./BaseComponent";

describe("BaseComponent", () => {
  const createComponent = makeCreateComponent(
    class BaseComponent extends _BaseComponent {}
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let component: ReturnType<typeof createComponent>[0];
  let renderer: ReturnType<typeof createComponent>[1];

  beforeEach(() => {
    [component, renderer] = createComponent();
  });

  afterEach(() => {
    renderer.destroy();
  });

  it("should render correctly", () => {
    expect(renderer.toJSON()).toMatchSnapshot();
  });
});
