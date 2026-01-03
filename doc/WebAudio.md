# WebAudio

For an introduction to the world of WebAudio, check out MDN's excellent documentation - with live, embedded examples - on the WebAudio API:

- [https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Using_Web_Audio_API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Using_Web_Audio_API)

In short;

WebAudio works with the concepts of an audio "graph" which describes connections between various audio "nodes".

A "node" is a processing block which may have some number of audio "inputs" and/or "outputs"; examples include waveform oscillators, equalizer filters, and simple gain controllers.

A "graph" therefore is something like a "context" in which the audio DSP "node" connections are described and performed within.

Further reading:

- see [our documentation on creating and loading your own WebAudio graphs](./graphs/WebAudio.md) as a "scene"!
- see [our documentation on connecting your JS code to your WebAudio graphs](./endpoints/WebAudio.md) using "endpoints"!
