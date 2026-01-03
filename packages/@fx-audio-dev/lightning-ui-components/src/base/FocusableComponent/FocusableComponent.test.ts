import { makeCreateComponent } from "@fx-audio-dev/ui-components-vitest-utils";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { FocusableComponent as _FocusableComponent } from "./FocusableComponent";
// import {
//   afterEach,
//   beforeEach,
//   describe,
//   expect,
//   it,
// } from 'vitest'

describe.todo("FocusableComponent", () => {
  const createComponent = makeCreateComponent(
    class FocusableComponent extends _FocusableComponent {}
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
  //   expectTypeOf(_FocusableComponent._template()).toEqualTypeOf(_FocusableComponent['TemplateSpec'])
  // })
});
