# Panels

Panels for your custom audio DSP are created using LightningJS, on a per-scene basis.

You create your panel as a Typescript file containing a LightningJS component, which specifies the entire panel you wish to render within the "canvas" (note that the header, footer, and sidebar widgets are global elements and thus are not intended to be overlaid by your DSP's panel elements).

*TBD: The application will load and render your panel when it loads your scene. This will _likely_ be achieved by simply passing your Panel class as a required prop on your `SceneManifest` object(s). Some work is still required on validating the audio graphs and controller endpoints before this work is achieved; for the time being, you may simply hardwire your Panel into the Home page's render template for a quick solution.
