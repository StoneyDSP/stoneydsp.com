import { makeCreateComponent } from "@stoneydsp/ui-components-vitest-utils";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { ButtonComponent as _ButtonComponent } from "./ButtonComponent";
// import {
//   afterEach,
//   beforeEach,
//   describe,
//   expect,
//   it,
// } from 'vitest'

describe("ButtonComponent", () => {
  const createComponent = makeCreateComponent(
    class ButtonComponent extends _ButtonComponent {}
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
  //   expectTypeOf(_ButtonComponent._template()).toEqualTypeOf(_ButtonComponent['TemplateSpec'])
  // })
});
