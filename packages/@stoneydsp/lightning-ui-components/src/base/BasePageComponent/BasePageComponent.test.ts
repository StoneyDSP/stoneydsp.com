import { makeCreateComponent } from "@nathanjhood/ui-components-vitest-utils";
import { BasePageComponent as _BasePageComponent } from "./BasePageComponent";
import { describe, beforeEach, afterEach, it, expect } from "vitest";
// import {
//   afterEach,
//   beforeEach,
//   describe,
//   expect,
//   it,
// } from 'vitest'

describe.todo("BasePageComponent", () => {
  const createComponent = makeCreateComponent(class BasePageComponent extends _BasePageComponent {});
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
  //   expectTypeOf(_BasePageComponent._template()).toEqualTypeOf(_BasePageComponent['TemplateSpec'])
  // })

})
