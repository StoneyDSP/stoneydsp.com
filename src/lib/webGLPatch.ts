export function patchWebGLPreserveDrawingBuffer() {
  const orig = HTMLCanvasElement.prototype.getContext;

  // @ts-expect-error ts-2322
  HTMLCanvasElement.prototype.getContext = function (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    type: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    attributes?: any
  ) {
    if (type === "webgl") {
      attributes = Object.assign({}, attributes, {
        preserveDrawingBuffer: true,
      });
    }
    return orig.call(this, type, attributes);
  };
}
