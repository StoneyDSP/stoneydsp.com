import { makeCreateComponent } from "@fx-audio-dev/ui-components-vitest-utils";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { BaseApp as _BaseApp } from "./BaseApp";
// import {
//   afterEach,
//   beforeEach,
//   describe,
//   expect,
//   it,
// } from 'vitest'

describe.todo("BaseApp", () => {
  const createComponent = makeCreateComponent(
    class BaseApp extends _BaseApp {}
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
  //   expectTypeOf(_BaseApp._template()).toEqualTypeOf(_BaseApp['TemplateSpec'])
  // })
});
