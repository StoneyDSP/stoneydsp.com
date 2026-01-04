import { makeCreateComponent } from "@stoneydsp/ui-components-vitest-utils";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { BaseWidgetComponent as _BaseWidgetComponent } from "./BaseWidgetComponent";
// import {
//   afterEach,
//   beforeEach,
//   describe,
//   expect,
//   it,
// } from 'vitest'

describe.todo("BaseWidgetComponent", () => {
  const createComponent = makeCreateComponent(
    class BaseWidgetComponent extends _BaseWidgetComponent {}
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
  //   expectTypeOf(_BaseWidgetComponent._template()).toEqualTypeOf(_BaseWidgetComponent['TemplateSpec'])
  // })
});
