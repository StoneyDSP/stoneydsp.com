import type { Lightning } from "@lightningjs/sdk";

export function bootstrapCanvas(app: Lightning.Application) {
  ///
  app.stage.getCanvas().id = "canvas";
  ///
  app.stage.getCanvas().innerHTML = `
  <h1>StoneyDSP</h1>

  <p>Interactive audio synthesis and visual experimentation with LightningJS, WebAudio, and JUCE.</p>

  <p>This site renders to a HTML canvas element. If you are seeing this text, your browser does not support canvas. Try the VST3/AU/CLAP plugin version instead!</p>

  <nav>
    <a href="https://github.com/nathanjhood">GitHub - personal</a>
    <a href="https://github.com/StoneyDSP">GitHub - Audio/Visual</a>
    <a href="https://stoneydsp.com">Home Page</a>
    <a href="https://www.linkedin.com/in/nathan-hood-ab219111b/">LinkedIn</a>
    <a href="https://www.instagram.com/stoneydsp.audio/">Instagram</a>
    <a href="https://x.com/Stoney_DSP/">X/Twitter</a>
    <a href="https://facebook.com/stoneydsp.audio">Facebook</a>
  </nav>
`;
  ///
  void document.body.appendChild(app.stage.getCanvas());
}
