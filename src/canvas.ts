import type { Lightning } from "@lightningjs/sdk";

export function bootstrapCanvas(app: Lightning.Application) {
  ///
  app.stage.getCanvas().id = "canvas";
  ///
  const main = document.createElement("main");
  const h1 = document.createElement("h1");
  const h2 = document.createElement("h2");
  const p = [document.createElement("p"), document.createElement("p")];
  ///
  h1.innerText = "StoneyDSP";
  h2.innerText = "Systems, Web, Audio & Visual programming.";
  p[0]!.innerText =
    "We are making open-source audio plugins and a custom DSP library.";
  p[1]!.innerText = "Come try our browser-based synthesizer!";
  ///
  main.appendChild(h1);
  main.appendChild(h2);
  main.appendChild(p[0]!);
  main.appendChild(p[1]!);
  app.stage.getCanvas().appendChild(main);
  ///
  void document.body.appendChild(app.stage.getCanvas());
}
