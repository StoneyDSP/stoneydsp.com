import { makeCreateComponent } from "@stoneydsp/ui-components-vitest-utils";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { PressableComponent as _PressableComponent } from "./PressableComponent";
// import {
//   afterEach,
//   beforeEach,
//   describe,
//   expect,
//   it,
// } from 'vitest'

describe.todo("PressableComponent", () => {
  const createComponent = makeCreateComponent(
    class PressableComponent extends _PressableComponent {}
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

  // it("should match template spec", () => {
  //   expectTypeOf(_PressableComponent._template()).toEqualTypeOf(_PressableComponent['TemplateSpec'])
  // })
});
