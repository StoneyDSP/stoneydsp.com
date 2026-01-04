import { makeCreateComponent } from "@stoneydsp/ui-components-vitest-utils";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { DraggableComponent as _DraggableComponent } from "./DraggableComponent";
// import {
//   afterEach,
//   beforeEach,
//   describe,
//   expect,
//   it,
// } from 'vitest'

describe.todo("DraggableComponent", () => {
  const createComponent = makeCreateComponent(
    class DraggableComponent extends _DraggableComponent {}
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
  //   expectTypeOf(_DraggableComponent._template()).toEqualTypeOf(_DraggableComponent['TemplateSpec'])
  // })
});
